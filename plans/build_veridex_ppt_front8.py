# -*- coding: utf-8 -*-
"""
Veridex（維學）前 8 頁 PPT 生成器
從 slides/veridex-pitch/index.tsx（OpenSlide）逐頁轉換而來，
目的是徹底擺脫 OpenSlide。版式沿用 build_veridex_ppt_v2.py 的體系。

配色：墨藍 × 琥珀　WCAG AA 已實測
字體：Microsoft JhengHei（繁體正黑）／Segoe UI Semibold（數字）
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "Veridex_前8頁.pptx")

# ---------- 配色 ----------
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
DIM       = RGBColor(0x6B, 0x76, 0x85)   # 更淺的次級，用於佔位說明

FONT = "Microsoft JhengHei"
NUMF = "Segoe UI Semibold"

W, H = 13.333, 7.5
ML, MR = 0.83, 0.83
CW = W - ML - MR
FOOT_Y = 6.93
NPAGES = 8

HS, HJ = "黃浩然", "黃羿捷"
BOTH = "黃浩然 & 黃羿捷"


# ---------- 工具 ----------
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


def slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def rect(sl, l, t, w, h, fill=None, line=None, lw=1.0,
         shape=MSO_SHAPE.RECTANGLE, r=None):
    s = sl.shapes.add_shape(shape, Inches(l), Inches(t), Inches(w), Inches(h))
    s.shadow.inherit = False
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        try:
            s.adjustments[0] = min(0.5, (r or 0.08) / max(0.01, min(w, h)))
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
    return s


def card(sl, l, t, w, h, fill=CANVAS, line=None, r=0.08):
    return rect(sl, l, t, w, h, fill=fill, line=line,
                shape=MSO_SHAPE.ROUNDED_RECTANGLE, r=r)


def tbox(sl, l, t, w, h):
    b = sl.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = b.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return tf


def para(tf, text, size=18, bold=False, color=INK, align=PP_ALIGN.LEFT,
         ls=1.45, before=0, after=0, first=False, latin=None):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.alignment = align
    p.line_spacing = ls
    p.space_before = Pt(before)
    p.space_after = Pt(after)
    r = p.add_run()
    r.text = text
    set_font(r, size, bold, color, latin=latin)
    return p


def ruler(sl, idx):
    x, w = 0.30, 0.045
    y0, y1 = 0.52, 6.93
    rect(sl, x, y0, w, y1 - y0, fill=RULE_D)
    step = (y1 - y0) / (NPAGES - 1)
    for i in range(NPAGES):
        y = y0 + i * step
        cur = (i + 1 == idx)
        rect(sl, x + w, y - 0.012, 0.40 if cur else 0.05, 0.024,
             fill=ACCENT if cur else RULE_S)


def head(sl, sec, title, sub=None):
    if sec:
        tf = tbox(sl, ML, 0.40, CW, 0.26)
        para(tf, sec, 10, True, ACCENT, ls=1.2, first=True)
    tf = tbox(sl, ML, 0.64, CW, 0.74)
    para(tf, title, 28, True, INK, ls=1.20, first=True)
    rect(sl, ML, 1.42, 0.9, 0.05, fill=ACCENT)
    if sub:
        tf2 = tbox(sl, ML, 1.58, CW, 0.36)
        para(tf2, sub, 13.5, False, MUTED, ls=1.35, first=True)


def foot(sl, source=None, who=HS):
    if source:
        tf = tbox(sl, ML, FOOT_Y, CW - 2.7, 0.42)
        para(tf, source, 9.5, False, MUTED, ls=1.25, first=True)
    tf2 = tbox(sl, W - MR - 2.6, FOOT_Y, 2.6, 0.34)
    para(tf2, "講者：" + who, 10, False, MUTED, align=PP_ALIGN.RIGHT,
         ls=1.2, first=True)


# ---------- 內容用的小組件 ----------
def colhead(sl, l, t, w, text, sub=None, color=INK):
    rect(sl, l, t + 0.16, w, 0.028, fill=color)
    tf = tbox(sl, l, t, w, 0.24)
    para(tf, text, 12, True, color, ls=1.2, first=True)
    if sub:
        tf2 = tbox(sl, l, t + 0.26, w, 0.24)
        para(tf2, sub, 10.5, False, MUTED, ls=1.2, first=True)


def stepnum(sl, l, t, n, size=0.30, fill=ACCENT, color=WHITE, fs=13):
    rect(sl, l, t, size, size, fill=fill,
         shape=MSO_SHAPE.OVAL)
    tf = tbox(sl, l, t + 0.045, size, size)
    para(tf, n, fs, True, color, align=PP_ALIGN.CENTER, ls=1.0, first=True)


def talkline(sl, l, t, w, text, bar=ACCENT):
    rect(sl, l, t + 0.05, 0.05, 0.34, fill=bar)
    tf = tbox(sl, l + 0.22, t, w - 0.22, 0.46)
    para(tf, text, 17, False, INK, ls=1.45, first=True)


def hbar(sl, l, t, w, label, pct, value, bar=ACCENT, lw=2.6):
    """橫向條形：標籤 + 條 + 數值"""
    rect(sl, l, t + 0.115, 2.05, 0.02, fill=RULE_D)   # 標籤底線
    tf = tbox(sl, l, t, 2.0, 0.28)
    para(tf, label, 11.5, False, INK, ls=1.2, first=True)
    bx = l + 2.15
    bw = w - 2.15 - 0.72
    rect(sl, bx, t + 0.055, bw, 0.155, fill=RULE_D)
    if pct > 0:
        rect(sl, bx, t + 0.055, max(0.03, bw * pct / 100.0), 0.155, fill=bar)
    tf2 = tbox(sl, bx + bw + 0.10, t, 0.62, 0.28)
    para(tf2, value, 11, True, bar if pct > 0 else AMBER_TXT,
         align=PP_ALIGN.RIGHT, ls=1.2, first=True, latin=NUMF)


def downarrow(sl, cx, t, h=0.30):
    rect(sl, cx - 0.015, t, 0.03, h * 0.66, fill=RULE_S)
    for i, wd in enumerate((0.20, 0.12, 0.05)):
        rect(sl, cx - wd / 2, t + h * 0.66 + i * (h * 0.12), wd, 0.035,
             fill=RULE_S)


# ==========================================================
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(W), Inches(H)
idx = 0


def nxt():
    global idx
    idx += 1
    return slide(prs), idx


# ---------------- P1 封面 ----------------
s, i = nxt(); ruler(s, i)
rect(s, 0, 0, W, 0.14, fill=ACCENT)
tf = tbox(s, ML, 0.52, CW, 0.26)
para(tf, "黃浩然 · 黃羿捷", 11, False, MUTED, ls=1.2, first=True)

tf = tbox(s, ML, 2.05, CW, 1.30)
para(tf, "Veridex：AI 時代的有效自學方案", 40, True, INK, ls=1.10,
     first=True, latin=NUMF)

tf = tbox(s, ML, 3.52, CW, 0.80)
para(tf, "按你的資料生成，按你的程度驗收", 24, False, MUTED, ls=1.35, first=True)

rect(s, ML, 5.32, CW, 0.02, fill=RULE_D)
tf = tbox(s, ML, 5.56, 9.0, 1.1)
para(tf, "呈　青年創業基金委員會", 14, False, INK, ls=1.5, first=True)
para(tf, "講者　黃浩然、黃羿捷　｜　2026 · 10 · 16", 12.5, False, MUTED,
     ls=1.5, before=4)
foot(s, None, BOTH)

# ---------------- P2 傳統課堂給不了定制 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題一 · 定制化課程", "傳統課堂給不了定制",
     "老師的注意力是稀缺資源 —— 一份講義、一條進度，都只能按一個人來做")

COLW = (CW - 0.50) / 2
LEFT = [
    ("講義是發給所有人的，不是給你的", "老師不可能為每個人改一份講義"),
    ("一條進度，快的被拖、慢的掉隊", "同一個班，pace 只有一個"),
    ("老師不知道你想學什麼", "開口問，等於打斷全班"),
]
RIGHT = [
    ("課照著你的資料長出來", "上傳什麼，就教什麼"),
    ("進度跟著你的水平", "快的跳過，慢的加時"),
    ("你說什麼，第一課就是什麼", "開口不用打斷任何人"),
]
for col, (items, x) in enumerate([(LEFT, ML), (RIGHT, ML + COLW + 0.50)]):
    isleft = (col == 0)
    colhead(s, x, 2.10, COLW, "傳統課堂" if isleft else "AI native 課堂",
            color=MUTED if isleft else ACCENT)
    y = 2.52
    for main, sub in items:
        card(s, x, y, COLW, 1.18, fill=WHITE if not isleft else CANVAS,
             line=RULE_D if isleft else ACCENT)
        tf = tbox(s, x + 0.28, y + 0.20, COLW - 0.56, 0.80)
        para(tf, main, 15, True, INK, ls=1.35, first=True)
        para(tf, sub, 11.5, False, MUTED, ls=1.35, before=3)
        y += 1.34
foot(s, None, HS)

# ---------------- P3 我們怎麼造這門課 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題一 · 定制化課程", "我們怎麼造這門課")

LW2 = 5.05
steps = [
    ("①", "上傳資料，說清需求", "講義、考卷、筆記 —— 你的都在這裡", False),
    ("②", "了解現狀，摸清程度", "問幾個問題就知道你卡在哪", True),
    ("③", "生成課程，帶有檢驗", "章節、知識點、語音講解、板書同步", False),
]
y = 2.16
for n, t1, t2, hi in steps:
    h = 1.28
    card(s, ML, y, LW2, h, fill=AMBER_PALE if hi else WHITE,
         line=ACCENT if hi else RULE_D)
    stepnum(s, ML + 0.30, y + 0.24, n, fill=ACCENT)
    tf = tbox(s, ML + 0.78, y + 0.22, LW2 - 1.10, 0.85)
    para(tf, t1, 15.5, True, INK, ls=1.3, first=True)
    para(tf, t2, 11, False, MUTED if not hi else AMBER_TXT, ls=1.3, before=3)
    if hi:
        tf2 = tbox(s, ML + 0.78, y + h - 0.02, LW2 - 1.10, 0.24)
        para(tf2, "傳統課堂永遠不會做這一步", 10, True, AMBER_TXT, ls=1.2,
             first=True)
    y += 1.42

RX = ML + LW2 + 0.42
card(s, RX, 2.16, CW - LW2 - 0.42, 4.02, fill=CANVAS, line=RULE_D)
tf = tbox(s, RX + 0.34, 3.10, CW - LW2 - 1.10, 2.2)
para(tf, "Veridex 課程頁", 15, True, MUTED, ls=1.3, first=True)
para(tf, "章節、知識點、語音講解、板書同步", 12, False, DIM, ls=1.45, before=8)
para(tf, "［待放入課程頁截圖］", 11, True, ACCENT, ls=1.4, before=14)
rect(s, RX + 0.34, 2.50, 0.9, 0.04, fill=ACCENT)
foot(s, None, HJ)

# ---------------- P4 上課時 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題一 · 定制化課程", "上課時",
     "一節課 = 10–15 分鐘。課照著你的資料長出來，講解的時候再按你的反應調整")

y = 2.42
for t in ("AI 講解，白板板書同步推上去",
          "你隨時可以打斷、追問、要求換一種講法",
          "進度按你的反應走——跟不上就停下來重講"):
    card(s, ML, y, CW, 1.02, fill=WHITE, line=RULE_D)
    talkline(s, ML + 0.34, y + 0.30, CW - 0.68, t)
    y += 1.18

rect(s, ML, y + 0.16, CW, 0.62, fill=AMBER_PALE)
tf = tbox(s, ML + 0.34, y + 0.32, CW - 0.68, 0.34)
para(tf, "課內追問不另外收費 —— 問到飽為止", 13.5, True, AMBER_TXT,
     ls=1.3, first=True)
foot(s, None, HJ)

# ---------------- P5 學會一件事，要走完四步 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題二 · 有效的檢驗", "學會一件事，要走完四步")

FOUR = [
    ("①", "喚起先備", "你：把已經會的調出來", False),
    ("②", "示範", "AI：講給你聽", False),
    ("③", "應用", "你：要自己做一遍", True),
    ("④", "整合", "你：換個情境再用一次", True),
]
bw = (CW - 3 * 0.28) / 4
y = 2.10
for k, (n, t1, t2, down) in enumerate(FOUR):
    x = ML + k * (bw + 0.28)
    h = 1.62 + (0.22 if down else 0)
    card(s, x, y, bw, h, fill=WHITE, line=ACCENT if down else RULE_D)
    stepnum(s, x + 0.26, y + 0.22, n, fill=ACCENT if down else MUTED)
    tf = tbox(s, x + 0.26, y + 0.66, bw - 0.52, 0.85)
    para(tf, t1, 15, True, INK, ls=1.3, first=True)
    para(tf, t2, 11, False, MUTED, ls=1.3, before=4)
    if down:
        rect(s, x + 0.26, y + 1.40, bw - 0.52, 0.024, fill=ACCENT)

y2 = 4.10
rect(s, ML, y2, CW, 0.028, fill=RULE_D)
tf = tbox(s, ML, y2 + 0.14, CW / 2 - 0.2, 0.30)
para(tf, "前兩步是聽，是輸入", 12, False, MUTED, ls=1.25, first=True)
tf = tbox(s, ML + CW / 2, y2 + 0.14, CW / 2, 0.30)
para(tf, "後兩步必須動手", 12, True, ACCENT, align=PP_ALIGN.RIGHT, ls=1.25,
     first=True)

rect(s, ML, y2 + 0.72, CW, 0.92, fill=AMBER_PALE)
tf = tbox(s, ML + 0.34, y2 + 0.94, CW - 0.68, 0.52)
para(tf, "動手之前，沒有人知道你到底會了多少。", 14.5, True, INK,
     ls=1.3, first=True)
para(tf, "→ 沒有檢驗，這四步走不完", 12, True, AMBER_TXT, ls=1.3, before=3)
foot(s, "Merrill, M. D. (2002). First principles of instruction. "
        "Educational Technology Research and Development 50(3):43–59. "
        "doi:10.1007/bf02505024", HS)

# ---------------- P6 靠學生自己，兩條路都堵死 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題二 · 有效的檢驗", "靠學生自己，兩條路都堵死")

BARS = [("解釋概念", 58, "58%"), ("總結材料", 47, "47%"),
        ("研究思路", 40, "40%"), ("組織思路", 39, "39%"),
        ("搜索", 25, "25%"), ("生成", 25, "25%"),
        ("直接放進作業", 11, "11%")]
BW = 6.30
colhead(s, ML, 2.06, BW, "出路一", sub="自己做檢驗", color=MUTED)
tf = tbox(s, ML, 2.52, BW, 0.28)
para(tf, "1,054 名英國全日制本科生，用 AI 做的事（可複選）", 10.5, False,
     DIM, ls=1.2, first=True)
y = 2.86
for lab, p, v in BARS:
    hbar(s, ML, y, BW, lab, p, v, bar=MUTED)
    y += 0.295
# 未列此項：虛線長度為零，用琥珀空值
rect(s, ML, y + 0.115, 2.0, 0.02, fill=RULE_D)
tf = tbox(s, ML, y, 2.0, 0.28)
para(tf, "檢驗我到底學會沒有", 11.5, False, AMBER_TXT, ls=1.2, first=True)
rect(s, ML + 2.15, y + 0.055, BW - 2.15 - 0.72, 0.155, fill=AMBER_PALE)
tf = tbox(s, ML + 2.15 + (BW - 2.15 - 0.72) + 0.10, y, 0.62, 0.28)
para(tf, "未列", 9.5, True, AMBER_TXT, align=PP_ALIGN.RIGHT, ls=1.2,
     first=True)

downarrow(s, ML + BW / 2, 5.28, 0.28)

RX2 = ML + BW + 0.55
colhead(s, RX2, 2.06, CW - BW - 0.55, "出路二",
        sub="那就檢驗一下", color=ACCENT)
tf = tbox(s, RX2, 2.52, CW - BW - 0.55, 0.28)
para(tf, "自己判：估準 18.5%　高估 35.5%　低估 46.0%", 12, False, INK,
     ls=1.25, first=True)

card(s, RX2, 3.00, CW - BW - 0.55, 1.30, fill=WHITE, line=ACCENT)
tf = tbox(s, RX2 + 0.28, 3.22, CW - BW - 1.11, 0.90)
para(tf, "元認知錯覺", 14, True, INK, ls=1.25, first=True)
para(tf, "你對自己掌握程度的判斷，和真實水平不一致", 11, False, MUTED,
     ls=1.3, before=4)

rect(s, RX2, 4.52, CW - BW - 0.55, 1.10, fill=AMBER_PALE)
tf = tbox(s, RX2 + 0.28, 4.72, CW - BW - 1.11, 0.72)
para(tf, "不做，看不到結果", 12.5, True, INK, ls=1.3, first=True)
para(tf, "做了，拿到的是自己的錯覺。", 12.5, True, AMBER_TXT, ls=1.3, before=3)
foot(s, "HEPI (2026). Student Generative AI Survey, Report 199, n=1,054，英國全日制本科生　｜　"
        "Knof, Berndt, Shiozawa et al. (2024). BMC Medical Education 24:1210. "
        "doi:10.1186/s12909-024-06121-7", HS)

# ---------------- P7 一題做錯了，四個問題 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題二 · 有效的檢驗", "一題做錯了，四個問題")

QS = ["它掛在哪個知識點上？", "為什麼錯？", "要補哪一塊？", "多久之後再問我一次？"]
y = 2.12
for q in QS:
    tf = tbox(s, ML + 0.30, y, CW - 0.60, 0.52)
    para(tf, q, 25, False, INK, ls=1.25, first=True)
    rect(s, ML, y + 0.62, 0.05, 0.05, fill=ACCENT)
    y += 0.86

rect(s, ML, 5.72, CW, 0.02, fill=RULE_D)
tf = tbox(s, ML, 5.92, CW, 0.34)
para(tf, "現在的產品大多只回答第一個。", 15, False, MUTED, ls=1.25, first=True)
tf = tbox(s, ML, 6.30, CW, 0.44)
para(tf, "我們回答四個。", 20, True, ACCENT, ls=1.25, first=True)
foot(s, None, HJ)

# ---------------- P8 我們的檢驗，細在哪四個地方 ----------------
s, i = nxt(); ruler(s, i)
head(s, "問題二 · 有效的檢驗", "我們的檢驗，細在哪四個地方")

FOUR2 = [
    ("測什麼", "講出來 / 練一遍 / 做出來", "不止選擇題"),
    ("追溯", "追溯錯誤本因，追到你真正不會的知識點", "不只追到這道題"),
    ("給什麼", "給正確思路，不給答案", "不給你抄"),
    ("測多久", "間隔由 AI 推薦，你確認", "不是拍腦袋定一個日期"),
]
y = 2.14
for k, (t1, t2, coarse) in enumerate(FOUR2):
    card(s, ML, y, CW, 1.02, fill=WHITE, line=RULE_D)
    tf = tbox(s, ML + 0.34, y + 0.20, 2.10, 0.60)
    para(tf, t1, 16, True, INK, ls=1.25, first=True)
    rect(s, ML + 2.55, y + 0.24, 0.02, 0.54, fill=RULE_D)
    tf = tbox(s, ML + 2.78, y + 0.22, 5.20, 0.62)
    para(tf, t2, 13, False, INK, ls=1.3, first=True)
    tf = tbox(s, ML + 8.30, y + 0.26, CW - 8.64, 0.56)
    para(tf, "對比的粗話：" + coarse, 11, False, MUTED, ls=1.25, first=True)
    y += 1.14

rect(s, ML, 6.12, CW, 0.02, fill=RULE_D)
tf = tbox(s, ML, 6.30, CW, 0.40)
para(tf, "「多久之後再問我一次」不是拍腦袋：最優間隔 ≈ 你要保留時長的 20–40%",
     11.5, False, MUTED, ls=1.3, first=True)
foot(s, "Cepeda, Vul, Rohrer, Wixted & Pashler (2008). Psychological Science "
        "19(11):1095–1102. doi:10.1111/j.1467-9280.2008.02209.x", HS)

prs.save(OUT)
print(f"SAVED: {OUT}")
print(f"slides: {len(prs.slides._sldIdLst)}")
