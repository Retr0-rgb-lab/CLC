# -*- coding: utf-8 -*-
"""
Veridex（維學）前 8 頁 PPT 生成器 v2
=====================================
v1 的文案不動，只重做視覺系統：

  * 單一間距階梯（七級，0.06 起、公比約 1.4）
  * 五級字級（kicker / title / sub / body / foot），每級間距明顯
  * 五條全篇基線（kicker・title・rule・sub・內容帶），八頁完全一致
  * 內容帶固定 2.12 → 6.56（高 4.44 in），所有卡片都排進這個帶裡
  * 底部安全區：頁腳細線 6.78、頁腳文字 6.86，最低元素距底邊 ≥ 0.10

配色與字體沿用 v1（WCAG AA 實測值），不更動。
唯一的配色微調：v1 的 DIM #6B7685 （約 4.6:1）併入 MUTED #5B6675（5.83:1）。

自檢：執行末尾的 verify() 會跑邊界檢查、文字溢出估算、底邊餘量、對齊一致性。
"""
import os
import math

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree


# ==========================================================
# 輸出
# ==========================================================
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "Veridex_前8頁_v2.pptx")


# ==========================================================
# 配色（定案，不更動）
# ==========================================================
INK       = RGBColor(0x17, 0x23, 0x3B)   # 主色 15.67:1
ACCENT    = RGBColor(0xB4, 0x53, 0x1A)   # 強調 5.01:1（僅白底／canvas 作文字或線）
MUTED     = RGBColor(0x5B, 0x66, 0x75)   # 次級 5.83:1
RULE_S    = RGBColor(0x8A, 0x94, 0xA2)   # 承載指示功能 3.07:1
RULE_D    = RGBColor(0xC9, 0xD0, 0xD9)   # 純裝飾
CANVAS    = RGBColor(0xF1, 0xF4, 0xF8)
TINT      = RGBColor(0xE8, 0xEE, 0xF7)
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
AMBER_PALE = RGBColor(0xFA, 0xF0, 0xE8)
AMBER_TXT  = RGBColor(0x8F, 0x56, 0x06)

FONT = "Microsoft JhengHei"    # 繁體正黑
NUMF = "Segoe UI Semibold"     # 拉丁數字，1 與 0 可辨


# ==========================================================
# 版面格線 —— 全部常數集中於此，八頁共用
# ==========================================================
W, H = 13.333, 7.5
ML = MR = 0.83
CW = W - ML - MR                      # 11.673

# 五條基線
Y_KICKER = 0.40
Y_TITLE  = 0.66
Y_RULE   = 1.32
Y_SUB    = 1.46
Y_TOP    = 2.12                       # 內容帶頂（八頁一律）
Y_BOT    = 6.56                       # 內容帶底（八頁一律）
BAND     = Y_BOT - Y_TOP              # 4.44

# 底部安全區
Y_FRULE  = 6.78                       # 頁腳細線
Y_FOOT   = 6.86                       # 頁腳文字
BOT_MARGIN_MIN = 0.10

# 左側進度條
RAIL_X, RAIL_W = 0.30, 0.045
RAIL_Y0, RAIL_Y1 = 0.52, Y_BOT

NPAGES = 8
RAD = 0.06                            # 統一圓角

# 間距階梯（in）：0.06 起、公比約 1.4
SP1, SP2, SP3 = 0.06, 0.12, 0.20
SP4, SP5, SP6, SP7 = 0.30, 0.44, 0.62, 0.88

# ── 字級階梯（pt）─────────────────────────────────────────
# 十級，每級一個明確職責，級差 1.10～1.30 倍。
# 紀律：頁面內不允許出現階梯以外的字級；新增文字必須歸入某一級。
T_HERO  = 40     # 封面主標（僅 P1）
T_TITLE = 30     # 頁標題；P7 收束金句也用這級（唯一要記住的一句）
T_LEAD  = 24     # 封面副標；純文字頁的四個問句
T_LINE  = 17     # 單句陳述（P4 三條）
T_BODY  = 15     # 卡片主文、卡片落點條
T_SUB2  = 14     # 頁副標；小標
T_SMALL = 13     # 卡片次文、欄標題、條形數值
T_CAP   = 11.5   # 註解（卡內說明、粗話對比）
T_NOTE  = 10.5   # 頁眉小標、欄副標、邊註
T_FOOT  = 9.5    # 出處、講者
T_STEP  = 13     # 步驟序號（圓點內）

HS, HJ = "黃浩然", "黃羿捷"
BOTH = "黃浩然 & 黃羿捷"


# ==========================================================
# 量測基礎設施（供結尾 verify() 使用）
# ==========================================================
_GEOM = []      # (page, tag, l, t, w, h)
_BOXES = []     # Box 物件
_PAGE = [0]

# PowerPoint 單行行高約為字級的 1.2 倍，line_spacing 再乘上去
LINE_FACTOR = 1.2


def em_width(s):
    """以 em 為單位估字串寬度。中文／全形 1.0，拉丁 0.52，大寫 0.62，窄字 0.30。"""
    w = 0.0
    for ch in s:
        o = ord(ch)
        if o < 0x2E80:
            if ch in " .,:;!|'’·()[]/":
                w += 0.30
            elif ch.isupper():
                w += 0.62
            else:
                w += 0.52
        else:
            w += 1.0
    return w


def wrap_lines(text, size, w_in):
    """估算換行後的行數。"""
    per_line = max(1.0, w_in / (size / 72.0))
    n = 0
    for seg in text.split("\n"):
        n += max(1, int(math.ceil(em_width(seg) / per_line - 1e-9)))
    return n


class Box(object):
    """文字框。同時記錄所需高度，供溢出估算。"""

    __slots__ = ("page", "l", "t", "w", "h", "tf", "need", "tag", "n")

    def __init__(self, sl, l, t, w, h, tag=""):
        shape = sl.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = 0
        tf.margin_top = tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.TOP
        self.page, self.l, self.t, self.w, self.h = _PAGE[0], l, t, w, h
        self.tf, self.need, self.tag, self.n = tf, 0.0, tag, 0
        _GEOM.append((_PAGE[0], "text:" + tag, l, t, w, h))
        _BOXES.append(self)


def set_font(run, size, bold=False, color=INK, name=FONT, latin=None):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = latin or name
    rPr = run._r.get_or_add_rPr()
    lt = rPr.find(qn('a:latin'))
    for tag in ('a:cs', 'a:ea'):
        old = rPr.find(qn(tag))
        if old is not None:
            rPr.remove(old)
        e = etree.Element(qn(tag))
        e.set('typeface', name)
        if lt is not None:
            lt.addnext(e)
        else:
            rPr.append(e)


def box(sl, l, t, w, h, tag=""):
    return Box(sl, l, t, w, h, tag)


def para(b, text, size=T_BODY, bold=False, color=INK,
         align=PP_ALIGN.LEFT, ls=1.30, before=0, after=0,
         first=False, latin=None):
    p = b.tf.paragraphs[0] if first else b.tf.add_paragraph()
    p.alignment = align
    p.line_spacing = ls
    p.space_before = Pt(before)
    p.space_after = Pt(after)
    r = p.add_run()
    r.text = text
    set_font(r, size, bold, color, latin=latin)
    n = wrap_lines(text, size, b.w)
    b.n += 1
    b.need += (before / 72.0) + n * (size / 72.0) * LINE_FACTOR * ls + (after / 72.0)
    return p


# ==========================================================
# 圖形
# ==========================================================
def slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def rect(sl, l, t, w, h, fill=None, line=None, lw=1.0,
         shape=MSO_SHAPE.RECTANGLE, r=None, tag="rect"):
    if w <= 0 or h <= 0:
        raise ValueError("非正尺寸：w=%.4f h=%.4f @ (%.3f, %.3f)" % (w, h, l, t))
    s = sl.shapes.add_shape(shape, Inches(l), Inches(t), Inches(w), Inches(h))
    s.shadow.inherit = False
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        try:
            s.adjustments[0] = min(0.5, (r or RAD) / max(0.01, min(w, h)))
        except Exception:
            pass
    if fill is None:
        s.fill.background()
    else:
        s.fill.solid()
        s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(lw)
    s.text_frame.text = ""
    _GEOM.append((_PAGE[0], tag, l, t, w, h))
    return s


def card(sl, l, t, w, h, fill=CANVAS, line=None, r=RAD, tag="card"):
    return rect(sl, l, t, w, h, fill=fill, line=line,
                shape=MSO_SHAPE.ROUNDED_RECTANGLE, r=r, tag=tag)


def vrule(sl, l, t, h, w=0.014, color=RULE_D, tag="vrule"):
    return rect(sl, l, t, w, h, fill=color, tag=tag)


def hrule(sl, l, t, w, color=RULE_D, th=0.014, tag="hrule"):
    return rect(sl, l, t, w, th, fill=color, tag=tag)


def varrow(sl, cx, t, h=0.28, color=RULE_S):
    """垂直箭頭：細桿 + 三段收縮箭羽。純矩形，不旋轉。"""
    shaft = h * 0.58
    rect(sl, cx - 0.015, t, 0.03, shaft, fill=color, tag="arrow")
    step = h * 0.14
    for i, wd in enumerate((0.20, 0.125, 0.05)):
        rect(sl, cx - wd / 2, t + shaft + i * step, wd, step, fill=color, tag="arrow")


def rarrow(sl, cx, cy, w=0.30, h=0.20, color=RULE_S):
    """水平箭頭（出路一 → 出路二）。"""
    rect(sl, cx - w / 2, cy - h / 2, w, h, fill=color,
         shape=MSO_SHAPE.RIGHT_ARROW, tag="arrow")


# ==========================================================
# 頁面骨架
# ==========================================================
def ruler(sl, idx):
    """左側進度條。跨頁位置由頁序決定，與內容基線無關。"""
    x, w = RAIL_X, RAIL_W
    rect(sl, x, RAIL_Y0, w, RAIL_Y1 - RAIL_Y0, fill=RULE_D, tag="rail")
    step = (RAIL_Y1 - RAIL_Y0) / (NPAGES - 1)
    for i in range(NPAGES):
        y = RAIL_Y0 + i * step
        cur = (i + 1 == idx)
        rect(sl, x + w, y - 0.012, 0.40 if cur else 0.05, 0.024,
             fill=ACCENT if cur else RULE_S, tag="rail")


def head(sl, sec, title, sub=None):
    b = box(sl, ML, Y_KICKER, CW, 0.24, "kicker")
    para(b, sec, T_NOTE, True, ACCENT, ls=1.15, first=True)

    b = box(sl, ML, Y_TITLE, CW, 0.60, "title")
    para(b, title, T_TITLE, True, INK, ls=1.15, first=True, latin=NUMF)

    rect(sl, ML, Y_RULE, 0.62, 0.045, fill=ACCENT, tag="titlerule")

    if sub:
        b = box(sl, ML, Y_SUB, CW, 0.34, "sub")
        para(b, sub, T_SUB2, False, MUTED, ls=1.30, first=True)


def foot(sl, source=None, who=HS):
    hrule(sl, ML, Y_FRULE, CW, RULE_D, 0.012, tag="footrule")
    if source:
        b = box(sl, ML, Y_FOOT, CW - 2.80, 0.42, "source")
        para(b, source, T_FOOT, False, MUTED, ls=1.25, first=True)
    b = box(sl, W - MR - 2.70, Y_FOOT, 2.70, 0.26, "who")
    para(b, "講者：" + who, T_FOOT, False, MUTED,
         align=PP_ALIGN.RIGHT, ls=1.20, first=True)


# ==========================================================
# 內容組件
# ==========================================================
COLHEAD_H = 0.56


def colhead(sl, l, t, w, text, sub=None, color=INK):
    """欄標題：粗體標籤 + 同寬色條 + 灰副標。總高固定 0.56。"""
    b = box(sl, l, t, w, 0.26, "colhead")
    para(b, text, T_SMALL, True, color, ls=1.15, first=True)
    rect(sl, l, t + 0.28, w, 0.028, fill=color, tag="colrule")
    if sub:
        b = box(sl, l, t + 0.35, w, 0.21, "colsub")
        para(b, sub, T_NOTE, False, MUTED, ls=1.15, first=True)
    return t + COLHEAD_H


def stepnum(sl, l, t, n, d=0.32, fill=ACCENT, color=WHITE, fs=T_STEP):
    rect(sl, l, t, d, d, fill=fill, shape=MSO_SHAPE.OVAL, tag="stepnum")
    b = box(sl, l, t + 0.055, d, 0.22, "stepnum")
    para(b, n, fs, True, color, align=PP_ALIGN.CENTER, ls=1.00,
         first=True, latin=NUMF)


def hbar(sl, l, t, w, label, pct, value, bar=MUTED, track=RULE_D,
         valcolor=None, lw_label=2.00, lw_value=0.66):
    """橫條：標籤（自帶底線）｜ 條 ｜ 數值（右對齊）。列高由呼叫端節奏決定。"""
    rect(sl, l, t + 0.155, lw_label, 0.018, fill=track, tag="hbarlabel")
    b = box(sl, l, t, lw_label, 0.24, "hbarlabel")
    para(b, label, T_CAP, False, INK, ls=1.15, first=True)

    bx = l + lw_label + 0.15
    bw = w - lw_label - 0.15 - lw_value - 0.10
    rect(sl, bx, t + 0.055, bw, 0.155, fill=track, tag="htrack")
    if pct > 0:
        rect(sl, bx, t + 0.055, max(0.03, bw * pct / 100.0), 0.155,
             fill=bar, tag="hbar")
    b = box(sl, bx + bw + 0.10, t, lw_value, 0.26, "hbarvalue")
    para(b, value, T_SMALL, True,
         valcolor or (bar if pct > 0 else AMBER_TXT),
         align=PP_ALIGN.RIGHT, ls=1.15, first=True, latin=NUMF)


# ==========================================================
# 建置
# ==========================================================
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(W), Inches(H)
_idx = [0]


def nxt():
    _idx[0] += 1
    _PAGE[0] = _idx[0]
    return slide(prs), _idx[0]


# ==========================================================
# P1 · 封面
# ==========================================================
s, i = nxt()
ruler(s, i)
rect(s, 0, 0, W, 0.12, fill=ACCENT, tag="topbar")

b = box(s, ML, Y_KICKER, CW, 0.24, "cover-byline")
para(b, "黃浩然 · 黃羿捷", T_NOTE, False, MUTED, ls=1.15, first=True)

b = box(s, ML, 2.30, CW, 0.80, "cover-title")
para(b, "Veridex：AI 時代的有效自學方案", T_HERO, True, INK, ls=1.10,
     first=True, latin=NUMF)

b = box(s, ML, 3.50, CW, 0.56, "cover-sub")
para(b, "按你的資料生成，按你的程度驗收", T_LEAD, False, MUTED, ls=1.30,
     first=True)

hrule(s, ML, 4.90, CW, RULE_D, 0.014, tag="cover-rule")

b = box(s, ML, 5.16, 9.0, 0.80, "cover-addr")
para(b, "呈　青年創業基金委員會", T_SUB2, False, INK, ls=1.40, first=True)
para(b, "講者　黃浩然、黃羿捷　｜　2026 · 10 · 16", T_SMALL, False, MUTED,
     ls=1.40, before=4)

foot(s, None, BOTH)


# ==========================================================
# P2 · 傳統課堂給不了定制
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題一 · 定制化課程", "傳統課堂給不了定制",
     "老師的注意力是稀缺資源 —— 一份講義、一條進度，都只能按一個人來做")

COLW = (CW - 0.50) / 2
X2L, X2R = ML, ML + COLW + 0.50

P2_LEFT = [
    ("講義是發給所有人的，不是給你的", "老師不可能為每個人改一份講義"),
    ("一條進度，快的被拖、慢的掉隊", "同一個班，pace 只有一個"),
    ("老師不知道你想學什麼", "開口問，等於打斷全班"),
]
P2_RIGHT = [
    ("課照著你的資料長出來", "上傳什麼，就教什麼"),
    ("進度跟著你的水平", "快的跳過，慢的加時"),
    ("你說什麼，第一課就是什麼", "開口不用打斷任何人"),
]

CARD_H, CARD_G = 1.06, 0.23
for col, (items, x) in enumerate([(P2_LEFT, X2L), (P2_RIGHT, X2R)]):
    isleft = (col == 0)
    y = colhead(s, x, Y_TOP, COLW, "傳統課堂" if isleft else "AI native 課堂",
                color=MUTED if isleft else ACCENT) + 0.24
    for main, sub in items:
        card(s, x, y, COLW, CARD_H,
             fill=CANVAS if isleft else WHITE,
             line=RULE_D if isleft else ACCENT, tag="p2card")
        b = box(s, x + 0.28, y + 0.20, COLW - 0.56, 0.68, "p2main")
        para(b, main, T_BODY, True, INK, ls=1.30, first=True)
        para(b, sub, T_CAP, False, MUTED, ls=1.30, before=3)
        y += CARD_H + CARD_G

foot(s, None, HS)


# ==========================================================
# P3 · 我們怎麼造這門課
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題一 · 定制化課程", "我們怎麼造這門課")

LW = 6.10
GX = 0.48
RX = ML + LW + GX
RW = CW - LW - GX

STEP_H, STEP_G = 1.30, 0.27
P3_STEPS = [
    ("①", "上傳資料，說清需求", "講義、考卷、筆記 —— 你的都在這裡", False),
    ("②", "了解現狀，摸清程度", "問幾個問題就知道你卡在哪", True),
    ("③", "生成課程，帶有檢驗", "章節、知識點、語音講解、板書同步", False),
]
y = Y_TOP
for n, t1, t2, hi in P3_STEPS:
    card(s, ML, y, LW, STEP_H,
         fill=AMBER_PALE if hi else WHITE,
         line=ACCENT if hi else RULE_D, tag="p3step")
    stepnum(s, ML + 0.30, y + 0.24, n, fill=ACCENT)
    b = box(s, ML + 0.80, y + 0.22, LW - 1.10, 0.66, "p3t")
    para(b, t1, T_BODY, True, INK, ls=1.25, first=True)
    para(b, t2, T_CAP, False, AMBER_TXT if hi else MUTED, ls=1.25, before=3)
    if hi:
        hrule(s, ML + 0.30, y + 1.06, 0.30, ACCENT, 0.026, tag="p3hl")
        b = box(s, ML + 0.80, y + 0.96, LW - 1.10, 0.24, "p3note")
        para(b, "傳統課堂永遠不會做這一步", T_NOTE, True, AMBER_TXT, ls=1.15,
             first=True)
    y += STEP_H + STEP_G

# 右欄：佔滿整個內容帶（v1 兩欄不等高）
card(s, RX, Y_TOP, RW, BAND, fill=CANVAS, line=RULE_D, tag="p3shot")
rect(s, RX + 0.34, Y_TOP + 0.34, 0.62, 0.045, fill=ACCENT, tag="p3shotrule")
b = box(s, RX + 0.34, Y_TOP + 0.50, RW - 0.68, 0.34, "p3shotlabel")
para(b, "Veridex 課程頁", T_BODY, True, MUTED, ls=1.20, first=True)
b = box(s, RX + 0.34, Y_TOP + 0.88, RW - 0.68, 0.32, "p3shotsub")
para(b, "章節、知識點、語音講解、板書同步", T_SMALL, False, MUTED, ls=1.25,
     first=True)

FRAME_T = Y_TOP + 1.30
FRAME_H = Y_BOT - 0.42 - FRAME_T
rect(s, RX + 0.34, FRAME_T, RW - 0.68, FRAME_H, fill=WHITE, line=RULE_D,
     tag="p3frame")
b = box(s, RX + 0.34, FRAME_T + FRAME_H / 2 - 0.12, RW - 0.68, 0.24,
        "p3placeholder")
para(b, "［待放入課程頁截圖］", T_NOTE, True, ACCENT, align=PP_ALIGN.CENTER,
     ls=1.20, first=True)

foot(s, None, HJ)


# ==========================================================
# P4 · 上課時
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題一 · 定制化課程", "上課時",
     "一節課 = 10–15 分鐘。課照著你的資料長出來，講解的時候再按你的反應調整")

C4_H, C4_G = 1.04, 0.20
BAND4_H, BAND4_G = 0.64, 0.28
y = Y_TOP
for t in ("AI 講解，白板板書同步推上去",
          "你隨時可以打斷、追問、要求換一種講法",
          "進度按你的反應走——跟不上就停下來重講"):
    card(s, ML, y, CW, C4_H, fill=WHITE, line=RULE_D, tag="p4card")
    rect(s, ML + 0.34, y + 0.35, 0.05, 0.34, fill=ACCENT, tag="talkbar")
    b = box(s, ML + 0.56, y + 0.31, CW - 0.90, 0.42, "p4talk")
    para(b, t, T_LINE, False, INK, ls=1.40, first=True)
    y += C4_H + C4_G

# 三張卡片走完後 y 多含一個未畫出的間距，扣回來再排收束條
y -= C4_G
assert abs((y + BAND4_G + BAND4_H) - Y_BOT) < 1e-9, "P4 收束條未貼齊內容帶底"
y += BAND4_G
rect(s, ML, y, CW, BAND4_H, fill=AMBER_PALE, tag="p4band")
b = box(s, ML + 0.34, y + 0.16, CW - 0.68, 0.32, "p4bandtext")
para(b, "課內追問不另外收費 —— 問到飽為止", T_BODY, True, AMBER_TXT, ls=1.25,
     first=True)

foot(s, None, HJ)


# ==========================================================
# P5 · 學會一件事，要走完四步
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題二 · 有效的檢驗", "學會一件事，要走完四步")

P5_FOUR = [
    ("①", "喚起先備", "你：把已經會的調出來", False),
    ("②", "示範", "AI：講給你聽", False),
    ("③", "應用", "你：要自己做一遍", True),
    ("④", "整合", "你：換個情境再用一次", True),
]
P5_G = 0.30
P5_BW = (CW - 3 * P5_G) / 4
P5_H = 2.16

for k, (n, t1, t2, act) in enumerate(P5_FOUR):
    x = ML + k * (P5_BW + P5_G)
    card(s, x, Y_TOP, P5_BW, P5_H, fill=WHITE,
         line=ACCENT if act else RULE_D, tag="p5card")
    stepnum(s, x + 0.28, Y_TOP + 0.30, n, fill=ACCENT if act else MUTED)
    b = box(s, x + 0.28, Y_TOP + 0.88, P5_BW - 0.56, 0.38, "p5t1")
    para(b, t1, T_BODY, True, INK, ls=1.25, first=True)
    b = box(s, x + 0.28, Y_TOP + 1.30, P5_BW - 0.56, 0.32, "p5t2")
    para(b, t2, T_CAP, False, MUTED, ls=1.30, first=True)
    hrule(s, x + 0.28, Y_TOP + 1.74, P5_BW - 0.56,
          ACCENT if act else RULE_D, 0.028, tag="p5rule")

P5_RULE = Y_TOP + P5_H + 0.46
hrule(s, ML, P5_RULE, CW, RULE_D, 0.028, tag="p5div")

b = box(s, ML, P5_RULE + 0.14, CW / 2, 0.30, "p5labL")
para(b, "前兩步是聽，是輸入", T_SMALL, False, MUTED, ls=1.20, first=True)
b = box(s, ML + CW / 2, P5_RULE + 0.14, CW / 2, 0.30, "p5labR")
para(b, "後兩步必須動手", T_SMALL, True, ACCENT, align=PP_ALIGN.RIGHT, ls=1.20,
     first=True)

P5_BAND_T = P5_RULE + 0.76
P5_BAND_H = Y_BOT - P5_BAND_T
rect(s, ML, P5_BAND_T, CW, P5_BAND_H, fill=AMBER_PALE, tag="p5band")
b = box(s, ML + 0.34, P5_BAND_T + 0.22, CW - 0.68, 0.66, "p5bandtext")
para(b, "動手之前，沒有人知道你到底會了多少。", T_BODY, True, INK, ls=1.25,
     first=True)
para(b, "→ 沒有檢驗，這四步走不完", T_SMALL, True, AMBER_TXT, ls=1.25, before=3)

foot(s, "Merrill, M. D. (2002). First principles of instruction. "
        "Educational Technology Research and Development 50(3):43–59. "
        "doi:10.1007/bf02505024", HS)


# ==========================================================
# P6 · 靠學生自己，兩條路都堵死
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題二 · 有效的檢驗", "靠學生自己，兩條路都堵死")

L6 = 6.05
G6 = 0.62
X6L = ML
X6R = ML + L6 + G6
W6R = CW - L6 - G6
ROW_A = 3.28

# ── 出路一 ──────────────────────────────────────────────
colhead(s, X6L, Y_TOP, L6, "出路一", sub="自己做檢驗", color=MUTED)
b = box(s, X6L, Y_TOP + 0.60, L6, 0.22, "p6denom")
para(b, "1,054 名英國全日制本科生，用 AI 做的事（可複選）", T_NOTE, False,
     MUTED, ls=1.20, first=True)

P6_BARS = [("解釋概念", 58, "58%"), ("總結材料", 47, "47%"),
           ("研究思路", 40, "40%"), ("組織思路", 39, "39%"),
           ("搜索", 25, "25%"), ("生成", 25, "25%"),
           ("直接放進作業", 11, "11%")]
P6_PITCH = 0.295
y = Y_TOP + 0.90
for lab, p, v in P6_BARS:
    hbar(s, X6L, y, L6, lab, p, v, bar=MUTED)
    y += P6_PITCH

# 調查未列此項：零長，用琥珀空值呈現
rect(s, X6L, y + 0.155, 2.00, 0.018, fill=RULE_D, tag="hbarlabel")
b = box(s, X6L, y, 2.00, 0.24, "hbarlabel")
para(b, "檢驗我到底學會沒有", T_CAP, False, AMBER_TXT, ls=1.15, first=True)
_bx = X6L + 2.15
_bw = L6 - 2.15 - 0.66 - 0.10
rect(s, _bx, y + 0.055, _bw, 0.155, fill=AMBER_PALE, tag="htrack")
b = box(s, _bx + _bw + 0.10, y, 0.66, 0.24, "hbarvalue")
para(b, "未列", T_NOTE, True, AMBER_TXT, align=PP_ALIGN.RIGHT, ls=1.15,
     first=True)

# ── 出路二 ──────────────────────────────────────────────
colhead(s, X6R, Y_TOP, W6R, "出路二", sub="那就檢驗一下", color=ACCENT)
b = box(s, X6R, Y_TOP + 0.60, W6R, 0.24, "p6self")
para(b, "自己判：", T_NOTE, True, INK, ls=1.20, first=True)

P6_SELF = [("估準", 18.5, "18.5%"), ("高估", 35.5, "35.5%"), ("低估", 46.0, "46.0%")]
P6_SPITCH = 0.42
y2 = Y_TOP + 0.90
for lab, p, v in P6_SELF:
    amber = (lab != "估準")
    hbar(s, X6R, y2, W6R, lab, p, v,
         bar=(ACCENT if amber else RULE_S),
         track=(AMBER_PALE if amber else RULE_D),
         valcolor=(AMBER_TXT if amber else MUTED),
         lw_label=0.85, lw_value=0.72)
    y2 += P6_SPITCH

P6_CARD_T = Y_TOP + 2.10
P6_CARD_H = Y_TOP + ROW_A - P6_CARD_T
card(s, X6R, P6_CARD_T, W6R, P6_CARD_H, fill=WHITE, line=ACCENT, tag="p6card")
b = box(s, X6R + 0.28, P6_CARD_T + 0.28, W6R - 0.56, 0.60, "p6meta")
para(b, "元認知錯覺", T_SUB2, True, INK, ls=1.20, first=True)
para(b, "你對自己掌握程度的判斷，和真實水平不一致", T_CAP, False, MUTED,
     ls=1.30, before=4)

# ── 出路一 → 出路二 ─────────────────────────────────────
rarrow(s, ML + L6 + G6 / 2, Y_TOP + ROW_A / 2)

# ── 收束條 ──────────────────────────────────────────────
varrow(s, W / 2, Y_TOP + ROW_A + 0.10, 0.28)

P6_BAND_T = Y_TOP + ROW_A + 0.46
P6_BAND_H = Y_BOT - P6_BAND_T
rect(s, ML, P6_BAND_T, CW, P6_BAND_H, fill=AMBER_PALE, tag="p6band")
b = box(s, ML + 0.34, P6_BAND_T + 0.04, CW - 0.68, 0.62, "p6bandtext")
para(b, "不做，看不到結果", T_SMALL, True, INK, ls=1.30, first=True)
para(b, "做了，拿到的是自己的錯覺。", T_SMALL, True, AMBER_TXT, ls=1.30,
     before=3)

foot(s, "HEPI (2026). Student Generative AI Survey, Report 199, n=1,054，英國全日制本科生　｜　"
        "Knof, Berndt, Shiozawa et al. (2024). BMC Medical Education 24:1210. "
        "doi:10.1186/s12909-024-06121-7", HS)


# ==========================================================
# P7 · 一題做錯了，四個問題
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題二 · 有效的檢驗", "一題做錯了，四個問題")

P7_Q = ["它掛在哪個知識點上？", "為什麼錯？", "要補哪一塊？", "多久之後再問我一次？"]
P7_PITCH = 0.72
y = Y_TOP
for q in P7_Q:
    rect(s, ML, y + 0.17, 0.11, 0.11, fill=ACCENT, tag="p7mark")
    b = box(s, ML + 0.42, y, CW - 0.42, 0.56, "p7q")
    para(b, q, T_LEAD, False, INK, ls=1.22, first=True)
    y += P7_PITCH

P7_L1_H, P7_L2_H = 0.36, 0.62      # 0.62 = 30pt × 1.2 × 1.22 的行高
P7_L2_T = Y_BOT - P7_L2_H            # 結論金句貼齊內容帶底
P7_L1_T = P7_L2_T - 0.40 - P7_L1_H   # 兩行結論之間固定 0.40
P7_RULE = P7_L1_T - 0.16 - 0.028
assert P7_RULE > Y_TOP + 3 * P7_PITCH + 0.56, "P7 問句區與結論區重疊"

hrule(s, ML, P7_RULE, CW, RULE_D, 0.028, tag="p7div")
b = box(s, ML, P7_L1_T, CW, P7_L1_H, "p7l1")
para(b, "現在的產品大多只回答第一個。", T_BODY, False, MUTED, ls=1.25,
     first=True)
b = box(s, ML, P7_L2_T, CW, P7_L2_H, "p7l2")
para(b, "我們回答四個。", T_TITLE, True, ACCENT, ls=1.22, first=True)

foot(s, None, HJ)


# ==========================================================
# P8 · 我們的檢驗，細在哪四個地方
# ==========================================================
s, i = nxt()
ruler(s, i)
head(s, "問題二 · 有效的檢驗", "我們的檢驗，細在哪四個地方")

P8_ROWS = [
    ("測什麼", "講出來 / 練一遍 / 做出來", "不止選擇題"),
    ("追溯", "追溯錯誤本因，追到你真正不會的知識點", "不只追到這道題"),
    ("給什麼", "給正確思路，不給答案", "不給你抄"),
    ("測多久", "間隔由 AI 推薦，你確認", "不是拍腦袋定一個日期"),
]
R8_H, R8_G = 0.82, 0.16
y = Y_TOP
for t1, t2, coarse in P8_ROWS:
    card(s, ML, y, CW, R8_H, fill=WHITE, line=RULE_D, tag="p8row")
    b = box(s, ML + 0.34, y + 0.24, 2.00, 0.34, "p8lab")
    para(b, t1, T_BODY, True, INK, ls=1.20, first=True)
    vrule(s, ML + 2.52, y + 0.20, 0.42)
    b = box(s, ML + 2.78, y + 0.26, 5.10, 0.32, "p8body")
    para(b, t2, T_SMALL, False, INK, ls=1.25, first=True)
    b = box(s, ML + 8.20, y + 0.28, CW - 8.54, 0.30, "p8coarse")
    para(b, "對比的粗話：" + coarse, T_CAP, False, MUTED, ls=1.25, first=True)
    y += R8_H + R8_G

P8_RULE = Y_TOP + 4 * R8_H + 3 * R8_G + 0.18
assert abs((P8_RULE + 0.18 + 0.32) - Y_BOT) < 1e-9, "P8 註腳行未貼齊內容帶底"
hrule(s, ML, P8_RULE, CW, RULE_D, 0.014, tag="p8div")
b = box(s, ML, P8_RULE + 0.18, CW, 0.32, "p8note")
para(b, "「多久之後再問我一次」不是拍腦袋：最優間隔 ≈ 你要保留時長的 20–40%",
     T_CAP, False, MUTED, ls=1.30, first=True)

foot(s, "Cepeda, Vul, Rohrer, Wixted & Pashler (2008). Psychological Science "
        "19(11):1095–1102. doi:10.1111/j.1467-9280.2008.02209.x", HS)


prs.save(OUT)


# ==========================================================
# 自我驗證
# ==========================================================
# 版面骨架元素：不算「頁面內容」，不參與內容帶／對齊檢查
CHROME = {
    "rail", "topbar", "titlerule", "footrule",
    "text:kicker", "text:title", "text:sub", "text:source", "text:who",
    "text:cover-byline",
}
# 封面是獨立版式，內容帶另計
COVER_BAND = (2.30, 5.96)


def verify():
    print("SAVED: %s" % OUT)
    print("slides: %d" % len(prs.slides._sldIdLst))
    print()
    print("=" * 74)
    print("a) 元素邊界檢查　畫布 %.3f × %.3f in" % (W, H))
    print("=" * 74)
    oob = [g for g in _GEOM
           if g[2] < -1e-6 or g[3] < -1e-6
           or g[2] + g[4] > W + 1e-6 or g[3] + g[5] > H + 1e-6]
    print("   形狀總數：%d　（文字框 %d）" %
          (len(_GEOM), sum(1 for g in _GEOM if g[1].startswith("text:"))))
    if oob:
        for p, tag, l, t, w, h in oob:
            print("   ✗ P%d %-14s l=%.3f t=%.3f r=%.3f b=%.3f"
                  % (p, tag, l, t, l + w, t + h))
    else:
        print("   ✓ 全部元素在畫布內（0 容忍）")

    print()
    print("=" * 74)
    print("b) 文字溢出估算　（行高 = 字級/72 × 1.2 × line_spacing）")
    print("=" * 74)
    over = [x for x in _BOXES if x.need > x.h + 1e-6]
    worst = sorted(_BOXES, key=lambda x: x.need - x.h, reverse=True)[:6]
    print("   文字框總數：%d" % len(_BOXES))
    if over:
        for x in over:
            print("   ✗ P%d %-14s 需 %.3f / 框 %.3f  (超 %.3f)　「%s」"
                  % (x.page, x.tag, x.need, x.h, x.need - x.h,
                     x.tf.text.replace("\n", " ")[:28]))
    else:
        print("   ✓ 無溢出")
    print("   最接近上限的 6 個框：")
    for x in worst:
        pct = 100.0 * x.need / x.h if x.h else 0
        print("      P%d %-12s %5.1f%%  需 %.3f / 框 %.3f 　%s"
              % (x.page, x.tag, pct, x.need, x.h,
                 x.tf.text.replace("\n", " ")[:22]))

    print()
    print("=" * 74)
    print("c) 底邊餘量與內容帶")
    print("=" * 74)
    lowest = max(_GEOM, key=lambda g: g[3] + g[5])
    margin = H - (lowest[3] + lowest[5])
    print("   最低元素：P%d %s　底邊 y = %.3f" %
          (lowest[0], lowest[1], lowest[3] + lowest[5]))
    print("   距底邊餘量：%.3f in　（下限 %.2f）　%s"
          % (margin, BOT_MARGIN_MIN, "✓" if margin >= BOT_MARGIN_MIN else "✗"))

    print()
    print("   %-4s %-9s %-9s %-9s %-9s %-8s %-8s" %
          ("頁", "帶頂", "帶底", "實際最高", "實際最低", "貼齊頂", "貼齊底"))
    print("   " + "-" * 68)
    band_ok = True
    for p in range(1, NPAGES + 1):
        gs = [g for g in _GEOM if g[0] == p and g[1] not in CHROME]
        if not gs:
            continue
        top = min(g[3] for g in gs)
        bot = max(g[3] + g[5] for g in gs)
        ref_t, ref_b = COVER_BAND if p == 1 else (Y_TOP, Y_BOT)
        ok_t = abs(top - ref_t) < 1e-6
        ok_b = abs(bot - ref_b) < 1e-6
        band_ok = band_ok and ok_t and ok_b
        print("   P%-3d %-9.3f %-9.3f %-9.3f %-9.3f %-8s %-8s" %
              (p, ref_t, ref_b, top, bot, "✓" if ok_t else "✗",
               "✓" if ok_b else "✗"))
    print("   八頁內容帶是否同一格線（P1 封面另計）：%s"
          % ("✓ 是" if band_ok else "✗ 否"))

    print()
    print("=" * 74)
    print("d) 對齊一致性　（每頁至少一件貼齊 ML、一件貼齊 ML+CW）")
    print("=" * 74)
    align_ok = True
    for p in range(1, NPAGES + 1):
        gs = [g for g in _GEOM if g[0] == p and g[1] not in CHROME]
        hit_l = any(abs(g[2] - ML) < 1e-6 for g in gs)
        hit_r = any(abs(g[2] + g[4] - (ML + CW)) < 1e-6 for g in gs)
        align_ok = align_ok and hit_l and hit_r
        print("   P%d  左緣貼齊 %.2f：%s　　右緣貼齊 %.2f：%s"
              % (p, ML, "✓" if hit_l else "✗",
                 ML + CW, "✓" if hit_r else "✗"))
    print("   對齊一致性：%s" % ("✓ 全部貼齊主欄線" if align_ok else "✗ 有頁未貼齊"))

    print()
    print("   各頁內容帶內的左緣分佈（排除頁眉／頁腳／進度條）：")
    for p in range(1, NPAGES + 1):
        gs = [g for g in _GEOM if g[0] == p and g[1] not in CHROME
              and g[1] not in ("arrow",)]
        lefts = sorted(set(round(g[2], 3) for g in gs))
        print("      P%d  %s" % (p, "  ".join("%.2f" % v for v in lefts)))
    print()
    print("   卡片幾何：P2 列高 %.2f／間距 %.2f　P3 步驟 %.2f／%.2f　"
          "P4 卡片 %.2f／%.2f　P8 列高 %.2f／%.2f"
          % (CARD_H, CARD_G, STEP_H, STEP_G, C4_H, C4_G, R8_H, R8_G))
    print("   P3 兩欄等高：左欄 %.2f–%.2f　右欄 %.2f–%.2f"
          % (Y_TOP, Y_TOP + 3 * STEP_H + 2 * STEP_G, Y_TOP, Y_TOP + BAND))

    print()
    print("=" * 74)
    ok_all = (not oob and not over and margin >= BOT_MARGIN_MIN
              and band_ok and align_ok)
    print("結果：%s" % ("全部通過" if ok_all else "有未通過項目"))


verify()
