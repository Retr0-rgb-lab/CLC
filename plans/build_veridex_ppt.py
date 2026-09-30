# -*- coding: utf-8 -*-
"""
Veridex（維學）CLC 3242P 單元二 計劃書口頭報告 PPT 生成器
20 頁正片 + 1 頁附錄（參考文獻，留作答問背景板）
繁體中文 / 微軟正黑體 / 白底 + 單一藍色強調
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree

OUT = r"E:\College_Projects\CLC\plans\Veridex_口頭報告_v1.pptx"

# ---------- 設計系統 ----------
INK    = RGBColor(0x1D, 0x20, 0x20)
ACCENT = RGBColor(0x0A, 0x84, 0xFF)
MUTED  = RGBColor(0x6B, 0x72, 0x80)
RULE   = RGBColor(0xE5, 0xE7, 0xEB)
SOFT   = RGBColor(0xEA, 0xF3, 0xFF)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
DEEP   = RGBColor(0x03, 0x1F, 0x2A)
FONT   = "Microsoft JhengHei"

W, H    = 13.333, 7.5
ML, MR  = 0.83, 0.83
CW      = W - ML - MR          # 11.67
BODY_T  = 1.72                 # 內文起始
FOOT_Y  = 6.93

HS, HJ = "黃浩然", "黃羿捷"
BOTH   = "黃浩然 & 黃羿捷"


# ---------- 工具 ----------
def set_font(run, size, bold=False, color=INK, name=FONT):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = name
    rPr = run._r.get_or_add_rPr()
    latin = rPr.find(qn('a:latin'))
    for tag in ('a:cs', 'a:ea'):
        old = rPr.find(qn(tag))
        if old is not None:
            rPr.remove(old)
        e = etree.Element(qn(tag))
        e.set('typeface', name)
        if latin is not None:
            latin.addnext(e)
        else:
            rPr.append(e)


def slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def rect(sl, l, t, w, h, fill=None, line=None, lw=1.0, shape=MSO_SHAPE.RECTANGLE):
    s = sl.shapes.add_shape(shape, Inches(l), Inches(t), Inches(w), Inches(h))
    s.shadow.inherit = False
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


def tbox(sl, l, t, w, h):
    b = sl.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = b.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return tf


def para(tf, text, size=18, bold=False, color=INK, align=PP_ALIGN.LEFT,
         ls=1.4, before=0, after=0, first=False):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.alignment = align
    p.line_spacing = ls
    p.space_before = Pt(before)
    p.space_after = Pt(after)
    r = p.add_run()
    r.text = text
    set_font(r, size, bold, color)
    return p


def head(sl, title, sub=None):
    """頁標題 + 細規則線 + 可選副標"""
    tf = tbox(sl, ML, 0.52, CW, 0.82)
    para(tf, title, 30, True, INK, ls=1.22, first=True)
    rect(sl, ML, 1.46, 1.15, 0.045, fill=ACCENT)
    if sub:
        tf2 = tbox(sl, ML, 1.62, CW, 0.4)
        para(tf2, sub, 14, False, MUTED, ls=1.35, first=True)


def foot(sl, source=None, who=HS):
    if source:
        tf = tbox(sl, ML, FOOT_Y, CW - 2.6, 0.32)
        para(tf, source, 9, False, MUTED, ls=1.2, first=True)
    tf2 = tbox(sl, W - MR - 2.5, FOOT_Y, 2.5, 0.32)
    para(tf2, "講者：" + who, 9.5, False, MUTED, align=PP_ALIGN.RIGHT,
         ls=1.2, first=True)


def card(sl, l, t, w, h, fill=SOFT, line=None):
    return rect(sl, l, t, w, h, fill=fill, line=line)


def clean_table(tbl):
    tblPr = tbl._tbl.tblPr
    tblPr.set('firstRow', '0')
    tblPr.set('bandRow', '0')
    for e in tblPr.findall(qn('a:tableStyleId')):
        tblPr.remove(e)
    sid = etree.SubElement(tblPr, qn('a:tableStyleId'))
    sid.text = '{2D5ABB26-0587-4C30-8999-92F81FD0307C}'


def cell(c, text, size=12, bold=False, color=INK, fill=WHITE,
         align=PP_ALIGN.LEFT, ls=1.35):
    c.margin_left = c.margin_right = Inches(0.11)
    c.margin_top = c.margin_bottom = Inches(0.05)
    c.vertical_anchor = MSO_ANCHOR.MIDDLE
    c.fill.solid()
    c.fill.fore_color.rgb = fill
    tf = c.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = ls
    r = p.add_run()
    r.text = text
    set_font(r, size, bold, color)


def mktable(sl, l, t, w, h, nrows, ncols, widths=None, rowh=None):
    gf = sl.shapes.add_table(nrows, ncols, Inches(l), Inches(t), Inches(w), Inches(h))
    tbl = gf.table
    clean_table(tbl)
    if widths:
        for i, cw_ in enumerate(widths):
            tbl.columns[i].width = Inches(cw_)
    if rowh:
        for i, rh in enumerate(rowh):
            tbl.rows[i].height = Inches(rh)
    return tbl


# ==========================================================
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(W), Inches(H)

# ---------------- P1 封面 ----------------
s = slide(prs)
rect(s, 0, 0, W, 0.16, fill=ACCENT)
tf = tbox(s, ML, 2.18, CW, 1.5)
para(tf, "Veridex 維學", 58, True, INK, ls=1.05, first=True)
rect(s, ML, 3.62, 1.15, 0.045, fill=ACCENT)
tf = tbox(s, ML, 3.95, CW, 0.7)
para(tf, "你的第一個 AI 個人課堂", 26, False, INK, ls=1.3, first=True)
tf = tbox(s, ML, 5.32, CW, 1.1)
para(tf, "呈：青年創業基金委員會", 17, False, INK, ls=1.5, first=True)
para(tf, "講者：黃浩然、黃羿捷　｜　2026 年 10 月 16 日", 15, False, MUTED, ls=1.5)
foot(s, None, HS)

# ---------------- P2 初心（雙講） ----------------
s = slide(prs)
head(s, "AI 讓學習變快了，還是變難了？")
rect(s, ML, 2.05, CW, 1.72, fill=SOFT)
tf = tbox(s, ML + 0.45, 2.34, CW - 0.9, 1.05)
para(tf, "「我想回答一個問題 —— 在 AI 時代，怎麼學得會。」", 23, True, INK,
     ls=1.3, first=True)
para(tf, "「不是更快地看完，是終於學會。」", 23, True, INK, ls=1.3, before=10)
tf = tbox(s, ML + 0.45, 3.42, CW - 0.9, 0.3)
para(tf, "黃浩然　／　黃羿捷", 11.5, False, MUTED, align=PP_ALIGN.RIGHT,
     ls=1.2, first=True)

tf = tbox(s, ML, 4.2, CW, 1.5)
para(tf, "我們不敢說我們能解決這個問題。", 20, False, INK, ls=1.45, first=True)
para(tf, "但我們可以把「有沒有學會」這件事，從感覺變成數字。", 20, True, ACCENT,
     ls=1.45, before=6)
tf = tbox(s, ML, 5.62, CW, 0.6)
para(tf, "這就是 Veridex 存在的理由。", 16, False, MUTED, ls=1.4, first=True)
foot(s, None, BOTH)

# ---------------- P3 同一份調查裡的兩種學生 ----------------
s = slide(prs)
head(s, "同一份調查裡的兩種學生")
cw2 = (CW - 0.4) / 2
for i, (q, src) in enumerate([
    ("「AI 讓我快速總結冗長的文獻、生成大綱，"
     "省下時間好專注於批判性思考。」", "一位英國本科學生"),
    ("「我根本沒有用自己的腦子。」", "另一位英國本科學生"),
]):
    x = ML + i * (cw2 + 0.4)
    card(s, x, 1.95, cw2, 2.05, fill=SOFT)
    tf = tbox(s, x + 0.38, 2.24, cw2 - 0.76, 1.5)
    para(tf, q, 19, True, INK, ls=1.42, first=True)
    tf = tbox(s, x + 0.38, 3.58, cw2 - 0.76, 0.3)
    para(tf, "—— " + src, 12, False, MUTED, ls=1.2, first=True)

rect(s, ML, 4.42, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.68, CW, 1.5)
para(tf, "同一份工具，同一年，為什麼兩個人走向相反？", 21, True, INK,
     ls=1.35, first=True)
para(tf, "依賴 AI 而無人監督的醫學生，考試表現最差，信心卻最高 —— "
         "研究者形容為「發了跑車，卻沒學過開車」。", 15, False, MUTED, ls=1.45, before=12)
foot(s, "來源：HEPI Student Generative AI Survey 2026 (Report 199)；"
        "Queen Mary University of London 研究", BOTH)

# ---------------- P4 學習的四個環節 ----------------
s = slide(prs)
head(s, "我們用四個環節，來定義「學會了」",
     "學習不主要在輸入與處理，而在提取與遷移。")
steps = [
    ("①", "輸入", "資料進來了嗎", "感覺記憶 → 工作記憶"),
    ("②", "處理", "理解到什麼程度", "工作記憶容量約 4±1 組塊"),
    ("③", "提取", "能從記憶裡取出來嗎", "Karpicke & Blunt 2011"),
    ("④", "遷移", "能用到沒見過的題嗎", "Pan & Rickard 2018"),
]
cw4 = (CW - 3 * 0.22) / 4
for i, (n, name, q, src) in enumerate(steps):
    x = ML + i * (cw4 + 0.22)
    hot = i >= 2
    card(s, x, 2.28, cw4, 1.72, fill=SOFT if hot else WHITE, line=None if hot else RULE)
    tf = tbox(s, x + 0.2, 2.46, cw4 - 0.4, 1.4)
    para(tf, n, 15, True, ACCENT, ls=1.1, first=True)
    para(tf, name, 20, True, INK, ls=1.2, before=4)
    para(tf, q, 12.5, False, INK, ls=1.35, before=7)
    para(tf, src, 9.5, False, MUTED, ls=1.25, before=4)

rect(s, ML, 4.26, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.48, 5.3, 1.9)
para(tf, "越舒服的方法，短期越有效，長期越無效 —— 而且你自己看不出來。",
     16, True, INK, ls=1.4, first=True)
para(tf, "重讀組在 5 分鐘內贏，一週後落後 21 個百分點；"
         "而且重讀組的信心是三組裡最高的。", 12.5, False, MUTED, ls=1.45, before=9)

tbl = mktable(s, 6.55, 4.48, 5.95, 1.62, 4, 3, widths=[1.55, 2.2, 2.2], rowh=[0.36, 0.42, 0.42, 0.42])
hdr = ["延遲", "重讀", "提取練習"]
for j, t in enumerate(hdr):
    cell(tbl.cell(0, j), t, 11.5, True, WHITE, ACCENT, PP_ALIGN.CENTER)
rows = [("5 分鐘", "81%", "75%"), ("2 天", "54%", "68%"), ("1 週", "40%", "61%")]
for i, r in enumerate(rows, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    for j, t in enumerate(r):
        bold = (j == 2 and i == 3) or (j == 1 and i == 1)
        col = ACCENT if (j == 2 and i == 3) else INK
        cell(tbl.cell(i, j), t, 12, bold, col, bg, PP_ALIGN.CENTER)
foot(s, "來源：Roediger & Karpicke (2006), Psychological Science 17(3): 249–255；"
        "Cowan (2001), BBS 24(1)", HJ)

# ---------------- P5 規模證據 ----------------
s = slide(prs)
head(s, "AI 已經近乎普及，但沒有人測量「學會了」")
stats = [("95%", "英國本科生以某種方式使用 AI"),
         ("12%", "直接把 AI 生成文字交作業"),
         ("38%", "拿到學校提供的 AI 工具"),
         ("48%", "覺得老師有在教他們用 AI")]
cw4 = (CW - 3 * 0.22) / 4
for i, (n, d) in enumerate(stats):
    x = ML + i * (cw4 + 0.22)
    card(s, x, 2.15, cw4, 2.15, fill=SOFT)
    tf = tbox(s, x + 0.24, 2.48, cw4 - 0.48, 1.6)
    para(tf, n, 46, True, ACCENT, ls=1.05, first=True)
    para(tf, d, 13, False, INK, ls=1.4, before=12)

rect(s, ML, 4.72, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.95, CW, 1.3)
para(tf, "12% 這個數字，三年前是 3%。", 19, True, INK, ls=1.35, first=True)
para(tf, "工具的問題已經解決，執行的問題沒有。", 19, True, ACCENT, ls=1.35, before=8)
foot(s, "來源：HEPI Student Generative AI Survey 2026 (Report 199)，2026 年 3 月發布，"
        "2025 年 12 月訪問 1,054 名英國全日制本科生", HJ)

# ---------------- P6 我們是誰 ----------------
s = slide(prs)
head(s, "兩位剛畢業的計算機學生，想解決自己踩過的那個坑")
people = [("黃浩然", "產品與用戶研究", "痛點定義、試點招募、課程內容設計、講者"),
          ("黃羿捷", "技術與模型", "課程生成、語音與板書、驗收引擎、講者")]
cw2 = (CW - 0.4) / 2
for i, (nm, role, duty) in enumerate(people):
    x = ML + i * (cw2 + 0.4)
    card(s, x, 2.0, cw2, 1.95, fill=SOFT)
    tf = tbox(s, x + 0.34, 2.26, cw2 - 0.68, 1.5)
    para(tf, nm, 24, True, INK, ls=1.2, first=True)
    para(tf, role, 14, True, ACCENT, ls=1.3, before=4)
    para(tf, duty, 12.5, False, MUTED, ls=1.4, before=8)

tf = tbox(s, ML, 4.3, CW, 1.0)
para(tf, "「把任何一份資料，變成一個只為你而設、並且確認你學會了的課堂。」",
     21, True, INK, ls=1.35, first=True)
tf = tbox(s, ML, 5.42, CW, 0.8)
para(tf, "不足與補救：缺學習科學與商業經驗 → 已洽詢教育／心理學顧問，並以校園試點補足。",
     13.5, False, MUTED, ls=1.45, first=True)
foot(s, None, HS)

# ---------------- P7 五代演進 ----------------
s = slide(prs)
head(s, "五代 AI 學習工具，五種「學會了」的定義")
tbl = mktable(s, ML, 1.9, CW, 3.75, 6, 5,
              widths=[1.75, 2.35, 2.25, 2.55, 2.77],
              rowh=[0.44, 0.62, 0.62, 0.62, 0.62, 0.72])
hdr = ["世代", "代表", "它問的問題", "它認為「學會了」＝", "留下的洞"]
for j, t in enumerate(hdr):
    cell(tbl.cell(0, j), t, 12.5, True, WHITE, ACCENT)
rows = [
    ("一代　課程庫", "DeepLearning.AI、Coursera", "學完第幾章了？", "拿到證書", "證書不等於能力"),
    ("二代　萬能問答", "ChatGPT", "你想問什麼？", "當下答得出", "沒有跨週狀態"),
    ("三代　模擬課堂", "OpenMAIC", "這堂課講完了嗎？", "課講完了", "課堂是集體教學的遺產"),
    ("四代　主動代理", "Hyperknow", "你什麼時候要交？", "進度條走完", "練習 → 掌握缺位"),
]
for i, r in enumerate(rows, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    for j, t in enumerate(r):
        cell(tbl.cell(i, j), t, 12, j == 0, INK, bg)
last = ("五代　個人課堂", "Veridex", "你哪裡還不懂？", "能說、能做、30 天後還記得", "—")
for j, t in enumerate(last):
    cell(tbl.cell(5, j), t, 12, True, ACCENT if j >= 2 else INK, SOFT)

tf = tbox(s, ML, 5.88, CW, 0.8)
para(tf, "五代都在回答「AI 怎麼讓我學得更快」。沒有一代回答過「AI 怎麼讓我學得會」。",
     18, True, INK, ls=1.35, first=True)
foot(s, "完成率作為指標會誤導：HarvardX／MITx 17 門課 841,687 人註冊，5% 拿到證書，"
        "35% 從未看過任何課程內容（Chuang & Ho 2014, 工作論文）", HJ)

# ---------------- P8 四個步驟 ----------------
s = slide(prs)
head(s, "四個步驟，把一份資料變成你的課堂")
flow = [("01", "上傳資料", "PDF、講義、筆記"),
        ("02", "生成專屬課程", "語音講解＋同步板書"),
        ("03", "隨時發問", "課堂內直接提問"),
        ("04", "練習與驗收", "過了才往下走")]
cw4 = (CW - 3 * 0.24) / 4
for i, (n, t, d) in enumerate(flow):
    x = ML + i * (cw4 + 0.24)
    card(s, x, 2.05, cw4, 1.75, fill=SOFT if i == 3 else WHITE,
         line=None if i == 3 else RULE)
    tf = tbox(s, x + 0.24, 2.32, cw4 - 0.48, 1.35)
    para(tf, n, 22, True, ACCENT, ls=1.1, first=True)
    para(tf, t, 16, True, INK, ls=1.25, before=4)
    para(tf, d, 12, False, MUTED, ls=1.35, before=6)
    if i < 3:
        a = rect(s, x + cw4 + 0.045, 2.86, 0.15, 0.15, fill=RULE,
                 shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
        a.rotation = 90

rect(s, ML, 4.15, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.4, CW, 1.9)
para(tf, "差異不在功能，在流程。", 20, True, ACCENT, ls=1.35, first=True)
para(tf, "生成、語音、動畫，任何一家都可以在兩個月內抄走。", 15, False, INK, ls=1.45, before=10)
para(tf, "但「以驗收為前提才能往下走」這個流程設計，抄不走，而且會隨產品成熟變得更難追。",
     15, False, INK, ls=1.45, before=4)
para(tf, "我們的產品現在還在 v0。今天想請各位投資的，是我們已驗證的 X 與即將驗證的 Y。",
     12.5, False, MUTED, ls=1.45, before=10)
foot(s, None, HS)

# ---------------- P9 門檻式驗收 ----------------
s = slide(prs)
head(s, "每個知識點都有門檻，過不了不進入下一階段")
loop = ["出題", "作答", "判斷", "帶解釋的反饋", "未過則補教"]
cw5 = (CW - 4 * 0.18) / 5
for i, t in enumerate(loop):
    x = ML + i * (cw5 + 0.18)
    last_ = i == 4
    card(s, x, 1.95, cw5, 0.78, fill=ACCENT if last_ else SOFT)
    tf = tbox(s, x, 2.14, cw5, 0.4)
    para(tf, t, 14, True, WHITE if last_ else INK, PP_ALIGN.CENTER, ls=1.2, first=True)
a = rect(s, ML + CW - 0.28, 2.28, 0.2, 0.2, fill=MUTED, shape=MSO_SHAPE.LEFT_ARROW)
rect(s, ML, 3.05, CW, 0.02, fill=RULE)

rules = [("間隔不是拍腦袋定的",
          "Cepeda et al. (2006) 元分析：最優復習間隔 ≈ 目標保持期的 10–20%。"
          "目標保持 30 天 → 間隔 3–6 天。"),
         ("判對錯不給解釋，效果會砍掉一半",
          "Rowland (2014)：有反饋 g = 0.73 ／ 無反饋 g = 0.39。"
          "Bisra et al. (2018)：自我解釋 g = 0.55，N = 5,917。")]
for i, (t, d) in enumerate(rules):
    y = 3.32 + i * 1.28
    rect(s, ML, y, 0.05, 1.06, fill=ACCENT)
    tf = tbox(s, ML + 0.28, y, CW - 0.28, 1.1)
    para(tf, t, 16, True, INK, ls=1.3, first=True)
    para(tf, d, 12.5, False, MUTED, ls=1.45, before=7)
foot(s, "來源：Cepeda, Pashler, Vul, Wixted & Rohrer (2006), Psychological Bulletin 132(3)；"
        "Rowland (2014), Psychological Bulletin 140(6)；Bisra et al. (2018), EPR 30(3)", HJ)

# ---------------- P10 三層證據 ----------------
s = slide(prs)
head(s, "我們不宣稱有效，我們證明有效")
ev = [("行為", "14 天任務完成率", "≥ 50%", "覆蓋了多少知識點、有沒有真的做完"),
      ("成果", "前測後測差異", "≥ 20%", "學之前與學之後，差多少"),
      ("延遲", "30 天後回訪正確率", "≥ 70%", "一個月後還記得多少")]
cw3 = (CW - 2 * 0.28) / 3
for i, (t, k, v, d) in enumerate(ev):
    x = ML + i * (cw3 + 0.28)
    card(s, x, 1.95, cw3, 2.85, fill=SOFT)
    tf = tbox(s, x + 0.3, 2.22, cw3 - 0.6, 2.4)
    para(tf, t, 22, True, INK, ls=1.15, first=True)
    para(tf, v, 40, True, ACCENT, ls=1.1, before=8)
    para(tf, k, 13.5, True, INK, ls=1.3, before=6)
    para(tf, d, 12, False, MUTED, ls=1.4, before=8)

rect(s, ML, 5.08, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 5.32, CW, 1.3)
para(tf, "為什麼一定要量到 30 天？", 16, True, INK, ls=1.35, first=True)
para(tf, "距考試 1–6 天的測驗效應 g = +0.82，少於 1 天的 g = +0.56 —— "
         "間隔越短，效應越小。（Adesope et al. 2017, Review of Educational Research 87(3)）",
     13, False, MUTED, ls=1.45, before=7)
foot(s, None, HS)

# ---------------- P11 保護機制 ----------------
s = slide(prs)
head(s, "註冊商標、版權登記、數據不出境",
     "計劃書不但要告訴投資者強項，還要告訴投資者如何保護強項。")
tbl = mktable(s, ML, 2.18, CW, 4.1, 7, 2, widths=[3.0, 8.67], rowh=[0.44, 0.6, 0.6, 0.6, 0.68, 0.6, 0.6])
cell(tbl.cell(0, 0), "保護項目", 12.5, True, WHITE, ACCENT)
cell(tbl.cell(0, 1), "我們的做法", 12.5, True, WHITE, ACCENT)
prot = [
    ("商標", "「Veridex／維學」提交香港區商標註冊，開源後亦不變更"),
    ("課程模板著作權", "原創課程生成模板與驗收 rubric 以版權登記保護，不開放授權"),
    ("源碼歸屬", "兩位創辦人簽署知識產權協議，公司為唯一權利人"),
    ("開源合規", "全面評估依賴庫授權；不採用帶傳染性授權的代碼。"
                 "我們評估過 OpenMAIC 的授權歷史 —— AGPL-3.0 → MIT 兩度變更"),
    ("數據合規", "依《個人資料（私隱）條例》：最小權限、用途限定、可刪除、資料不出境"),
    ("安全", "課程數據分戶隔離、令牌有時效與速率限制、每次匯出留審計記錄"),
]
for i, (a, b) in enumerate(prot, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    cell(tbl.cell(i, 0), a, 12.5, True, INK, bg)
    cell(tbl.cell(i, 1), b, 12, False, INK, bg)
foot(s, None, HJ)

# ---------------- P12 實測對比 ----------------
s = slide(prs)
head(s, "我們把市面上的同類真的用過了")
tbl = mktable(s, ML, 1.9, CW, 3.95, 7, 4, widths=[2.75, 3.1, 3.3, 2.52],
              rowh=[0.44, 0.56, 0.72, 0.56, 0.56, 0.56, 0.55])
for j, t in enumerate(["", "Hyperknow", "OpenMAIC", "Veridex"]):
    cell(tbl.cell(0, j), t, 12.5, True, WHITE, ACCENT, PP_ALIGN.CENTER if j else PP_ALIGN.LEFT)
cmp_rows = [
    ("繁體中文語音講解", "未見中文語音支援說明", "中文 TTS 整段靜默且不報錯　#1698", "產品化支援"),
    ("學生提問時，教師是否理解整堂課", "—", "只看見當前一頁，摘要截斷至 60 字　#1533", "完整脈絡注入"),
    ("開始使用的門檻", "註冊即用", "需邀請碼，每日 10 次免費額度", "上傳即開始"),
    ("成果能否取回", "無重新生成／匯出／分享", "互動頁可生成半成品　#1697", "課程可匯出"),
    ("安全與資料合規", "無獨立隱私政策頁", "2026 年 9 月單月 11 項安全公告", "數據隔離＋令牌時效"),
]
for i, r in enumerate(cmp_rows, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    cell(tbl.cell(i, 0), r[0], 11.5, True, INK, bg)
    cell(tbl.cell(i, 1), r[1], 11, False, MUTED, bg)
    cell(tbl.cell(i, 2), r[2], 11, False, MUTED, bg)
    cell(tbl.cell(i, 3), r[3], 11, True, ACCENT, SOFT)
cell(tbl.cell(6, 0), "學習效果證據", 12, True, INK, SOFT)
cell(tbl.cell(6, 1), "無", 11.5, False, MUTED, SOFT)
cell(tbl.cell(6, 2), "無", 11.5, False, MUTED, SOFT)
cell(tbl.cell(6, 3), "三層證據", 12.5, True, ACCENT, SOFT)

tf = tbox(s, ML, 6.08, CW, 0.7)
para(tf, "每一項断言都可查證。括號內為 OpenMAIC 的 GitHub issue 編號，"
         "各位可以自行前往核對。", 12, False, MUTED, ls=1.4, first=True)
foot(s, "查核：github.com/THU-MAIC/OpenMAIC　issues #1698 / #1533 / #1697；"
        "hyperknow.io（/privacy 回傳 404）", BOTH)

# ---------------- P13 OpenMAIC ----------------
s = slide(prs)
head(s, "OpenMAIC 把 AI 做成了「一間教室」。但學習不是上課。")
lw = (CW - 0.45) / 2
card(s, ML, 1.92, lw, 3.2, fill=RGBColor(0xF9, 0xFA, 0xFB))
tf = tbox(s, ML + 0.32, 2.16, lw - 0.64, 2.8)
para(tf, "課堂隱喻的四個假設", 17, True, INK, ls=1.2, first=True)
for t in ["所有人同時學一樣的東西",
          "進度由課程決定，不由學習者決定",
          "講完 ＝ 教會",
          "一天一節課，一次一塊內容"]:
    para(tf, "・ " + t, 13.5, False, MUTED, ls=1.4, before=9)

x2 = ML + lw + 0.45
card(s, x2, 1.92, lw, 3.2, fill=SOFT)
tf = tbox(s, x2 + 0.32, 2.16, lw - 0.64, 2.8)
para(tf, "一對一教學的四件事", 17, True, INK, ls=1.2, first=True)
for t in ["先診斷你哪裡已經會了、哪裡不會",
          "追問你為什麼這樣想，再補教",
          "只補缺口，不重講全課",
          "確認補教到底有沒有生效"]:
    para(tf, "・ " + t, 13.5, False, INK, ls=1.4, before=9)

rect(s, ML, 5.35, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 5.58, CW, 1.0)
para(tf, "OpenMAIC 有的是「講課」，缺的是「補教」。", 18, True, INK, ls=1.35, first=True)
para(tf, "多數學生真正缺的，從來不是有人講，是有人知道他哪裡沒聽懂。",
     15, False, MUTED, ls=1.45, before=6)
foot(s, "OpenMAIC 為清華大學開源項目，v0.2.2 起已支援 zh-TW 共 12 種語系；"
        "其技術實力我們尊重，差距在設計理念而非功能數量", HJ)

# ---------------- P14 Hyperknow ----------------
s = slide(prs)
head(s, "Hyperknow 是很出色的學習項目經理，但它不是導師。")
tbl = mktable(s, ML, 1.88, CW, 3.9, 5, 2, widths=[6.9, 4.77],
              rowh=[0.44, 0.85, 0.9, 0.85, 0.88])
cell(tbl.cell(0, 0), "我們的觀察", 12.5, True, WHITE, ACCENT)
cell(tbl.cell(0, 1), "一手證據", 12.5, True, WHITE, ACCENT)
obs = [
    ("它排的是死線，不是你的卡點。",
     "官網原話：From course files to LMS deadlines"),
    ("它自己說：影片提供理解，練習才提供掌握。",
     "hyperknow.io/blogs 原句 The video provides the initial comprehension. "
     "The practice provides the mastery."),
    ("Pro 檔賣的是額度和一個記憶開關，不是「你學會了」。",
     "Pro US$18/月、Max US$50/月；權益含 usage limits、Memory"),
    ("它的收入建立在考試季上，產品卻想當 24/7 的習慣。",
     "日本 203 校／28,723 人調查：僅 7.2% 學生自費訂閱生成式 AI"),
]
for i, (a, b) in enumerate(obs, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    cell(tbl.cell(i, 0), a, 13, True, INK, bg)
    cell(tbl.cell(i, 1), b, 11, False, MUTED, bg)
tf = tbox(s, ML, 6.0, CW, 0.7)
para(tf, "我們不批評它 —— 它做得很認真。但它自己寫下了那句話："
         "那麼把「練習 → 掌握」做成閉環的系統，在哪裡？", 15, True, INK, ls=1.4, first=True)
foot(s, "課堂開始前建議備妥官網截圖，以備查詢", HS)

# ---------------- P15 商業模式 ----------------
s = slide(prs)
head(s, "免費進門，按學習量付費的積分制")
card(s, ML, 1.9, CW, 1.0, fill=SOFT)
tf = tbox(s, ML + 0.32, 2.1, CW - 0.64, 0.7)
para(tf, "服務對象：中文母語大學生、研究生、職業自學者　｜　首年目標 100–300 名付費用戶",
     15, True, INK, ls=1.3, first=True)
para(tf, "暫不開放中小學市場。", 12, False, MUTED, ls=1.3, before=4)

tbl = mktable(s, ML, 3.15, CW, 2.2, 5, 4, widths=[2.3, 3.1, 3.13, 3.14],
              rowh=[0.46, 0.42, 0.42, 0.42, 0.48])
for j, t in enumerate(["", "Free", "Pro　HK$78／月", "Max　HK$148／月"]):
    cell(tbl.cell(0, j), t, 12.5, True, WHITE, ACCENT, PP_ALIGN.CENTER if j else PP_ALIGN.LEFT)
plan = [("積分／月", "100", "600", "1,500"),
        ("連接器", "—", "✓", "✓"),
        ("跨裝置同步", "—", "✓", "✓"),
        ("前沿模型", "—", "—", "✓")]
for i, r in enumerate(plan, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    for j, t in enumerate(r):
        cell(tbl.cell(i, j), t, 12.5, j == 0, INK if j == 0 else ACCENT,
             bg, PP_ALIGN.CENTER if j else PP_ALIGN.LEFT)
tf = tbox(s, ML, 5.6, CW, 1.1)
para(tf, "78 港元大約是兩頓平價午餐。", 15, True, INK, ls=1.35, first=True)
para(tf, "積分制是成本護欄：每檔設上限，不做無限量方案 —— "
         "否則模型調用成本會失控，收入越多虧得越多。", 12.5, False, MUTED, ls=1.45, before=7)
foot(s, None, HJ)

# ---------------- P16 18 萬 + 財務 ----------------
s = slide(prs)
head(s, "申請 18 萬港元，覆蓋首 6 個月的驗證期")
card(s, ML, 1.92, 3.5, 2.5, fill=SOFT)
tf = tbox(s, ML + 0.3, 2.3, 2.9, 1.9)
para(tf, "HK$", 20, True, ACCENT, ls=1.1, first=True)
para(tf, "180,000", 46, True, ACCENT, ls=1.1, before=2)
para(tf, "首 6 個月，不含創辦人津貼", 12, False, INK, ls=1.35, before=12)

tbl = mktable(s, 4.7, 1.92, 7.8, 2.5, 7, 3, widths=[3.6, 2.2, 2.0],
              rowh=[0.4, 0.34, 0.34, 0.34, 0.34, 0.34, 0.4])
for j, t in enumerate(["項目", "金額 (HKD)", "佔比"]):
    cell(tbl.cell(0, j), t, 12, True, WHITE, ACCENT, PP_ALIGN.CENTER if j else PP_ALIGN.LEFT)
bud = [("產品開發與測試", "72,000", "40%"),
       ("AI 與雲端服務", "27,000", "15%"),
       ("市場推廣與校園試點", "36,000", "20%"),
       ("法律、會計與行政", "18,000", "10%"),
       ("預備金", "27,000", "15%")]
for i, r in enumerate(bud, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    for j, t in enumerate(r):
        cell(tbl.cell(i, j), t, 11.5, False, INK, bg, PP_ALIGN.CENTER if j else PP_ALIGN.LEFT)
cell(tbl.cell(6, 0), "合計", 12, True, INK, SOFT)
cell(tbl.cell(6, 1), "180,000", 12, True, INK, SOFT, PP_ALIGN.CENTER)
cell(tbl.cell(6, 2), "100%", 12, True, INK, SOFT, PP_ALIGN.CENTER)

rect(s, ML, 4.72, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.95, CW, 1.6)
para(tf, "創辦人本期不支薪 —— 這是 18 萬夠用的原因。", 17, True, INK, ls=1.35, first=True)
para(tf, "第 7 個月起以訂閱收入自持。18 個月承諾的是「驗證兩項關鍵假設」，"
         "不是「養活團隊十八個月」。", 13.5, False, MUTED, ls=1.45, before=8)
para(tf, "對照：數碼港 CCMF 為 10 萬／6 個月，科技園 Ideation 為 10 萬／1 年，均屬原型階段資助。",
     11, False, MUTED, ls=1.4, before=8)
foot(s, None, BOTH)

# ---------------- P17 里程碑 ----------------
s = slide(prs)
head(s, "18 個月，我們只驗證兩件事")
tf = tbox(s, ML, 1.82, CW, 0.4)
para(tf, "核心驗收點：完成率　｜　付費意願", 14, True, ACCENT, ls=1.3, first=True)
ms = [("第 3 月", "可用原型", "30–50 次深訪、100 人等候名單"),
      ("第 6 月", "封閉測試 100–200 人", "★ 核心驗收點：激活率與四周留存"),
      ("第 12 月", "首批付費用戶與收入", "★ 核心驗收點：付費意願"),
      ("第 18 月", "30 天延遲回訪數據齊備", "決定是否自持")]
y0 = 2.5
rect(s, ML + 0.3, y0 + 0.42, CW - 0.9, 0.02, fill=RULE)
cw4 = (CW - 3 * 0.2) / 4
for i, (when, what, chk) in enumerate(ms):
    x = ML + i * (cw4 + 0.2)
    hot = "★" in chk
    card(s, x, y0, cw4, 2.35, fill=SOFT if hot else WHITE, line=None if hot else RULE)
    rect(s, x + cw4 / 2 - 0.07, y0 + 0.34, 0.14, 0.14,
         fill=ACCENT if hot else RULE, shape=MSO_SHAPE.OVAL)
    tf = tbox(s, x + 0.22, y0 + 0.66, cw4 - 0.44, 1.5)
    para(tf, when, 15, True, ACCENT if hot else INK, ls=1.2, first=True)
    para(tf, what, 14, True, INK, ls=1.3, before=5)
    para(tf, chk, 11.5, False, MUTED, ls=1.4, before=6)

tf = tbox(s, ML, 5.42, CW, 1.1)
para(tf, "kill criteria：第 6 月激活率低於 25%，我們重做定位；"
         "第 12 月付費轉化低於 3%，我們轉向學校／機構採購。", 15, True, INK,
     ls=1.35, first=True)
para(tf, "我們寧可把失敗條件寫在前面，也不想事後解釋。", 12.5, False, MUTED,
     ls=1.4, before=7)
foot(s, None, HJ)

# ---------------- P18 風險與應變 ----------------
s = slide(prs)
head(s, "三個我們最可能失敗的地方，和已經準備好的對策",
     "格式：風險 → 觸發條件 → 替代方案")
tbl = mktable(s, ML, 2.12, CW, 4.05, 6, 3, widths=[3.5, 3.4, 4.77],
              rowh=[0.42, 0.72, 0.72, 0.72, 0.78, 0.78])
for j, t in enumerate(["風險", "觸發條件", "我們已經準備好的對策"]):
    cell(tbl.cell(0, j), t, 12.5, True, WHITE, ACCENT)
risk = [
    ("用戶生成課程但不完成", "第 6 月四周留存低於 25%",
     "收窄到單一場景（考試複習），砍掉其他課程模板"),
    ("AI 生成內容不夠準", "抽檢來源可溯率低於 90%",
     "改為只引用用戶上傳資料，不檢索外部 —— 寧可少而準"),
    ("學生不願付費", "第 12 月付費轉化低於 3%",
     "轉向學校／機構採購，商業模式改為 B2B2C"),
    ("提取練���不適合零基礎", "起始答對率低於 50%",
     "驗收難度分級：零基礎先做覆蓋確認，不直接上難題"),
    ("我們可能判斷錯了整個方向", "第 6 月留存與付費遠低於預期",
     "縮回單一場景並公開驗證數據；若仍不成立，就承認這個方向不成立"),
]
for i, r in enumerate(risk, start=1):
    bg = WHITE if i % 2 else RGBColor(0xF9, 0xFA, 0xFB)
    cell(tbl.cell(i, 0), r[0], 12, True, INK, bg)
    cell(tbl.cell(i, 1), r[1], 11.5, False, MUTED, bg)
    cell(tbl.cell(i, 2), r[2], 11.5, False, INK, bg)
foot(s, "依據：Rowland (2014) 報告 18% 的效應量為負；"
        "Yang et al. (2021) 顯示對照組同做精加工時效應降至 g = 0.095", HS)

# ---------------- P19 檢核點 ----------------
s = slide(prs)
head(s, "請各位評委幫我們選一個")
tf = tbox(s, ML, 2.05, CW, 0.9)
para(tf, "如果你只能盯住我們一項指標，你會選哪一個？", 24, True, INK, ls=1.3, first=True)
opts = [("課程完成率", "用戶有沒有真的學完", "行為"),
        ("30 天延遲回訪", "一個月後還記得多少", "成效"),
        ("安全與合規", "資料會不會出事", "信任")]
cw3 = (CW - 2 * 0.32) / 3
for i, (t, d, tag) in enumerate(opts):
    x = ML + i * (cw3 + 0.32)
    card(s, x, 3.15, cw3, 2.0, fill=SOFT)
    tf = tbox(s, x + 0.3, 3.42, cw3 - 0.6, 1.5)
    para(tf, tag, 11, True, ACCENT, ls=1.2, first=True)
    para(tf, t, 21, True, INK, ls=1.25, before=5)
    para(tf, d, 12.5, False, MUTED, ls=1.35, before=8)
tf = tbox(s, ML, 5.6, CW, 0.7)
para(tf, "各位的選擇會決定我們接下來六個月，把資源放在哪裡。", 14, False, MUTED,
     ls=1.4, first=True)
foot(s, None, BOTH)

# ---------------- P20 結語 ----------------
s = slide(prs)
head(s, "課程是起點，驗收才是終點")
tf = tbox(s, ML, 2.1, CW, 2.2)
para(tf, "我們今天沒有講完一個功能。", 19, False, INK, ls=1.45, first=True)
para(tf, "我們講的是一個問題 —— 在 AI 時代，學習該怎麼被重新定義。", 19, True, INK,
     ls=1.45, before=8)
para(tf, "Veridex 是我們的答案。", 19, True, ACCENT, ls=1.45, before=8)
rect(s, ML, 4.62, CW, 0.02, fill=RULE)
tf = tbox(s, ML, 4.95, CW, 1.2)
para(tf, "Veridex 維學科技", 17, True, INK, ls=1.4, first=True)
para(tf, "黃浩然、黃羿捷　｜　2026 年 10 月 16 日", 14, False, MUTED, ls=1.4, before=4)
foot(s, None, HS)

# ---------------- P21 附錄：參考文獻 ----------------
s = slide(prs)
head(s, "附錄：參考文獻與資料來源")
refs_l = [
    "HEPI (2026). Student Generative AI Survey 2026, Report 199.",
    "Chuang & Ho (2014). HarvardX / MITx completion study（工作論文）.",
    "Freeman et al. (2014). PNAS 111(23): 8410–8415.",
    "Roediger & Karpicke (2006). Psychological Science 17(3): 249–255.",
    "Karpicke & Blunt (2011). Science 331(6018): 772–775.",
    "Adesope, Trevisan & Sundararajan (2017). RER 87(3): 659–701.",
]
refs_r = [
    "Rowland (2014). Psychological Bulletin 140(6): 1434–1454.",
    "Bisra et al. (2018). Educational Psychology Review 30(3): 703–725.",
    "Pan & Rickard (2018). Psychological Bulletin 144(7): 710–756.",
    "Cepeda et al. (2006). Psychological Bulletin 132(3): 354–380.",
    "Cowan (2001). Behavioral and Brain Sciences 24(1): 79–95.",
    "Yang et al. (2021). Psychological Bulletin 147(4): 399–435.",
    "Yang et al. (2023). Educational Psychology Review 35(3), 87.",
    "hyperknow.io 官網 / blog；github.com/THU-MAIC/OpenMAIC issues",
]
for idx, col in enumerate([refs_l, refs_r]):
    x = ML + idx * (CW / 2 + 0.2)
    w = CW / 2 - 0.2
    tf = tbox(s, x, 1.9, w, 4.8)
    for i, r in enumerate(col):
        para(tf, r, 11, False, INK, ls=1.45, before=0 if i == 0 else 8, first=(i == 0))
tf = tbox(s, ML, 6.28, CW, 0.5)
para(tf, "本頁與下一頁為答問背景板，不列入 20 頁正片之計時。", 11, False, MUTED,
     ls=1.3, first=True)
foot(s, None, "—")

# ---------------- P22 附錄：答問備答要點 ----------------
s = slide(prs)
head(s, "附錄：答問備答要點",
     "「口語表現須清楚回應提問」與「交流與互動」合計佔 50 分，建議逐題練過。")
qa = [
    ("Q　兩個剛畢業的學生，做得成嗎？",
     "兩人皆 CS 背景、中文母語，能在理大直接做試點。缺的是學習科學與商業經驗 —— "
     "我們用顧問合作與校園試點補，而不是用假話補。"),
    ("Q　Hyperknow 已經做得很好了，你們憑什麼？",
     "一句話反問：它排的是 LMS 的死線，我們排的是你卡在哪一步。"
     "然後指向第 12 頁對比表 —— 差異在流程，不在功能。"),
    ("Q　18 萬夠不夠？",
     "創辦人本期不支薪，6 個月是驗證期不是養人期。"
     "對照數碼港 CCMF 10 萬／6 個月，我們的額度在同一區間之上。"),
    ("Q　你們怎麼證明真的有效果？",
     "三層證據：行為（完成率）、成果（前後測）、延遲（30 天回訪）。"
     "第三層是別家都不做的，也是我們唯一會向各位匯報的。"),
    ("Q　學生的資料會不會出事？",
     "指向第 11 頁：商標、版權登記、數據不出境、令牌有時效、"
     "課程數據分戶隔離、每次匯出留審計記錄。"),
    ("Q　如果我給你錢，6 個月後你要給我什麼？",
     "兩個數字：第 6 月的激活率與四周留存，第 12 月的付費意願。"
     "第 6 月若低於 25%，我們重做定位 —— 這條我們寫在第 17 頁。"),
]
for i, (q, a) in enumerate(qa):
    y = 2.22 + i * 0.78
    rect(s, ML, y, 0.045, 0.62, fill=ACCENT)
    tf = tbox(s, ML + 0.24, y, CW - 0.24, 0.68)
    para(tf, q, 13, True, INK, ls=1.3, first=True)
    para(tf, a, 11, False, MUTED, ls=1.35, before=3)
foot(s, None, BOTH)

# ---------- 儲存 ----------
os.makedirs(os.path.dirname(OUT), exist_ok=True)
prs.save(OUT)
print("SAVED:", OUT)
print("slides:", len(prs.slides.__iter__.__self__._sldIdLst))
