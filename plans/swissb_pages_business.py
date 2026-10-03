# -*- coding: utf-8 -*-
"""Veridex 青年创业基金简报 — 商业段 P13–P20（瑞士国际主义 Style B · IKB）。

受众是「青年创业基金委员会」，不是终端用户。本段所有页面采评审语域：
陈述式判断句 + 可核查数字 + 假设标注，不用第二人称、不用促销语气。

## 数字纪律（本段的三条铁律）
1. 只用三类数字：①我们自己定的三个价格 ②官方统计 [A] ③外部公开基准 [B]
2. 任何由上述三类推导出来的数字，一律标「这是推算」
3. 下列数字**不上片**（要嘛算错、要嘛是内部未拍板决策、要嘛无帐单实测）：
   每积分成本、TTS 单价、毛利率、CPA／获客成本预测、续订率、LTV、CAC payback、
   完整 18 个月逐月预测、资金用途五项分配、补习市场规模、积分数字、分钟／小时数

## 为什么不用饼图
本 skill 的 CSS 没有任何 pie／donut／conic-gradient／polygon 元件（实测零命中）。
因此：①三档用户占比 95.0／3.7／1.3 用 `.h-bar-chart` 横条——三片细缝的饼图不可读；
②收入 53／47 两段拆分手绘 SVG 环图，SVG 内不放任何文字（validator 禁止 <text>），
所有标签一律用 HTML 叠加。版式登记为 S17（锁定表里唯一容许 SVG 几何的正文版式）。
"""

TOTAL = 20


def chrome(section, page, who):
    return (
        f'<div class="chrome-min"><div class="l">{section}</div>'
        f'<div class="r">{page:02d} / {TOTAL} · {who}</div></div>'
    )


PAGES = []

# ── P13 · S04 Six Cells ────────────────────────────────────────────────────
# 谁来用 + 市场窗口。上方六格讲客群，下方三个官方统计讲市场基本盘。
# 「从哪开始」是使用者的定位决定，spec 未拍板 → 留醒目占位，不自行填。
PAGES.append(f'''
<section class="slide" data-layout="S04" data-animate="grid-reveal" data-slide-id="p13">
  <div class="canvas-card">
    {chrome("商业模式 · 目标客群与市场窗口", 13, "HS")}
    <div style="flex:1;display:grid;grid-template-rows:auto auto auto;margin-top:4.4vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
        <div class="t-cat accent">BUSINESS · 01 · WHO</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.4vw,7.6vh);line-height:1.04;letter-spacing:-.03em">同一套机制，四类使用者；<br/>换的只是上传的档案</h2>
      </div>

      <div class="sub-grid-3-2" data-anim="cells" style="margin-top:2.6vh;flex:0 1 auto;min-height:0">
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">01</span><div class="ttl">小学生</div><div class="desc">语文、数学</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">02</span><div class="ttl">中学生</div><div class="desc">DSE 公开考试</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">03</span><div class="ttl">大学生</div><div class="desc">论文题目、课堂复习</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">04</span><div class="ttl">在职进修</div><div class="desc">转行要用的技术</div></div>
        <div class="sub-card accent" style="border-radius:0"><span class="nb-corner">05</span><div class="ttl">分寸感</div><div class="desc">学习之内不插手；学习之外（找课、备题、排程）全部包办</div></div>
        <div class="sub-card" style="border-radius:0;background:transparent;border:1px dashed var(--grey-2)"><span class="nb-corner">06</span><div class="ttl">从哪开始</div><div class="desc">［待拍板：起始客群与切入科目］</div></div>
      </div>

      <div data-anim="market" style="border-top:2px solid var(--ink);padding-top:2vh;margin-top:2.4vh">
        <div class="t-cat" style="color:var(--text-helper);margin-bottom:1.4vh">市场窗口 · 香港教育人口 [A] 教育局／考评局</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2.4vw">
          <div>
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.8vw,4.8vh);line-height:1;letter-spacing:-.03em;font-feature-settings:'tnum'">347,820</div>
            <div class="t-body-sm" style="color:var(--text-secondary);margin-top:.8vh">中学生（2025-09），较 2022 谷底 +8.30%，连升三年</div>
          </div>
          <div>
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.8vw,4.8vh);line-height:1;letter-spacing:-.03em;font-feature-settings:'tnum'">55,781</div>
            <div class="t-body-sm" style="color:var(--text-secondary);margin-top:.8vh">DSE 2025 考生，2026 年近 57,000。评核标准统一、日期明确</div>
          </div>
          <div>
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.8vw,4.8vh);line-height:1;letter-spacing:-.03em;color:var(--text-secondary);font-feature-settings:'tnum'">317,233</div>
            <div class="t-body-sm" style="color:var(--text-secondary);margin-top:.8vh">小学生，连续下跌。<strong style="font-weight:500;color:var(--text-primary)">窗口是 3–5 年，不是无限</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P14 · S21 Tech Spec Sheet ─────────────────────────────────────────────
# 竞争位置。四家 × 六维度对照 + 三个结构性差异 + 两个必须先讲的坦白。
_COMPARE_COLS = [
    ("月费", "US$18 / 50", "US$59", "US$25", "HK$148 / 388"),
    ("计价单位", "积分（窗口期重置）", "无限订阅", "无限订阅", "语音合成量"),
    ("语音对话", "网页版可用", "支援 17 种语言<br/>中文不在内", "公开说明未见", "繁中・普通话"),
    ("手机 App", "没有", "语音不支援 App", "有", "有"),
    ("课内追问", "扣额度", "预设情境内有限", "无即时", "课内 0"),
    ("额度作废", "窗口期重置", "单课 180 天", "无", "7 天结转"),
]


def _cmp_row(label, *vals):
    tds = []
    for j, v in enumerate(vals):
        is_us = (j == 3)
        tds.append(
            f'<div style="padding:1.05vh 1vw;border-left:1px solid var(--border-subtle);'
            f'font-family:var(--sans),var(--sans-zh);font-size:max(13px,.8vw);line-height:1.4;'
            f'font-weight:{"500" if is_us else "400"};color:{"var(--accent)" if is_us else "var(--text-secondary)"}">{v}</div>'
        )
    return (
        f'<div style="display:grid;grid-template-columns:9.5vw repeat(4,1fr);align-items:stretch">'
        f'<div class="t-meta" style="padding:1.05vh 1vw 1.05vh 0;color:var(--text-helper)">{label}</div>'
        f'{"".join(tds)}</div>'
    )


PAGES.append(f'''
<section class="slide" data-layout="S21" data-animate="tech-spec" data-slide-id="p14">
  <div class="canvas-card">
    {chrome("商业模式 · 竞争位置", 14, "HJ")}
    <div style="flex:1;display:grid;grid-template-columns:5fr 7fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">BUSINESS · 02 · POSITION</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(3.8vw,6.4vh);line-height:1.04;letter-spacing:-.03em">先承认对手的强项，<br/>再讲结构性差异</h2>
        </div>
        <div data-anim="up" style="display:flex;flex-direction:column;margin-top:2.6vh">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:1.4vw;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.4vw,4.2vh);line-height:1;color:var(--accent)">01</div>
            <p class="t-body-sm" style="color:var(--text-secondary)">它们卖的是<b style="font-weight:500;color:var(--text-primary)">已经做好的课程库</b>。我们卖的是<b style="font-weight:500;color:var(--text-primary)">每天真的有人陪你学</b>。</p>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:1.4vw;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.4vw,4.2vh);line-height:1;color:var(--accent)">02</div>
            <p class="t-body-sm" style="color:var(--text-secondary)">它们靠<b style="font-weight:500;color:var(--text-primary)">课程数量</b>竞争。我们靠<b style="font-weight:500;color:var(--text-primary)">一道题错了之后怎么办</b>竞争。</p>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:1.4vw;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(2.4vw,4.2vh);line-height:1;color:var(--accent)">03</div>
            <p class="t-body-sm" style="color:var(--text-secondary)">通用模型的答案停在<b style="font-weight:500;color:var(--text-primary)">使用者资料之前</b>。我们的课在<b style="font-weight:500;color:var(--text-primary)">使用者资料里面</b>长出来。</p>
          </div>
        </div>
        <div data-anim="confess" class="card-ink" style="margin-top:auto;padding:1.8vh 1.4vw">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">两个必须先讲的事</div>
          <p class="t-body-sm" style="color:rgba(255,255,255,.86);margin-top:.8vh;font-size:max(13px,.78vw)">Coursera 已投资 <b>US$1 亿</b>于 LearnVector，官方描述目标是 one-to-one learning experiences。Hyperknow 有 <b>US$1M</b> 种子轮（真格领投）、Forbes 30 Under 30。</p>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;min-width:0">
        <div class="t-cat" style="color:var(--text-helper)">四家 · 六个维度</div>
        <div data-anim="matrix" style="margin-top:1.4vh">
          <div style="display:grid;grid-template-columns:9.5vw repeat(4,1fr)">
            <div class="t-meta" style="padding-bottom:1vh;color:var(--text-helper)">↓ 六维度</div>
            <div class="t-meta" style="padding:0 1vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-primary)">Hyperknow</div>
            <div class="t-meta" style="padding:0 1vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-primary)">Coursera</div>
            <div class="t-meta" style="padding:0 1vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-primary)">DeepLearning.AI</div>
            <div class="t-meta" style="padding:0 1vw 1vh;border-left:1px solid var(--border-subtle);color:var(--accent)">Veridex</div>
          </div>
          {''.join(_cmp_row(*row) for row in _COMPARE_COLS)}
        </div>
        <div class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.2vh;margin-top:1.6vh;color:var(--text-helper)">
          价格取各官网公开页面，2026-10-02 撷取。DeepLearning.AI 以筛选器实际列出的 131 门为准，不采用其官方宣传口径的课程数。Hyperknow 内部额度数字仅来自登入后介面，非官网公开资讯。
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P15 · S20 Stacked KPI Ledger ──────────────────────────────────────────
# 付费方案。本段核心页：三个价格就是全部的商业模型核心，其余皆为衍生计算。
PAGES.append(f'''
<section class="slide" data-layout="S20" data-animate="stacked-ledger" data-slide-id="p15">
  <div class="canvas-card">
    {chrome("商业模式 · 付费方案", 15, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:7fr 5fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">BUSINESS · 03 · PRICING</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,6.8vh);line-height:1.04;letter-spacing:-.03em">三档定价，<br/>这是全部的核心</h2>
        </div>

        <div data-anim="ledger" style="margin-top:2.8vh">
          <div class="ledger-row" style="display:grid;grid-template-columns:5vw 12vw 1fr;gap:1.6vw;align-items:end;padding:1.9vh 0 1.3vh;border-top:2px solid var(--ink)">
            <div class="t-meta">T 01</div>
            <div class="t-meta" style="color:var(--text-helper)">免费</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.3vw);line-height:1.35;color:var(--text-secondary)">每天 <b style="font-weight:500;color:var(--text-primary)">2 节</b>短讲解 · 每月 24 节完整课等值</div>
          </div>
          <div class="ledger-row" style="display:grid;grid-template-columns:5vw 12vw 1fr;gap:1.6vw;align-items:end;padding:1.9vh 0 1.3vh;border-top:1px solid var(--border-subtle)">
            <div class="t-meta" style="color:var(--accent)">T 02</div>
            <div class="ledger-num" style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(3.2vw,5.4vh);line-height:1;letter-spacing:-.03em;color:var(--accent)">HK$148</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.3vw);line-height:1.35;color:var(--text-secondary)">Pro · 每天 <b style="font-weight:500;color:var(--text-primary)">5 节</b>完整课 · 每月 150 节</div>
          </div>
          <div class="ledger-row" style="display:grid;grid-template-columns:5vw 12vw 1fr;gap:1.6vw;align-items:end;padding:1.9vh 0 1.3vh;border-top:1px solid var(--border-subtle)">
            <div class="t-meta">T 03</div>
            <div class="ledger-num" style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(3.2vw,5.4vh);line-height:1;letter-spacing:-.03em">HK$388</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.3vw);line-height:1.35;color:var(--text-secondary)">Max · 每天 <b style="font-weight:500;color:var(--text-primary)">10 节</b>完整课 · 每月 300 节</div>
          </div>
          <div class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.4vh;color:var(--text-helper)">额度每日发放、累积七天，不设窗口期，不月底清零。</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div class="t-cat" style="color:var(--text-helper)">计价逻辑</div>
        <div style="margin-top:1.8vh;display:flex;flex-direction:column;gap:0">
          <div style="padding:1.5vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(16px,1.15vw);line-height:1.35">购买单位：一天能上几节课</div>
            <p class="t-body-sm" style="color:var(--text-secondary);margin-top:.6vh">使用者感知得到的单位，也就是我们卖的东西本身。</p>
          </div>
          <div style="padding:1.5vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(16px,1.15vw);line-height:1.35">计价单位：AI 真的生成了多少语音</div>
            <p class="t-body-sm" style="color:var(--text-secondary);margin-top:.6vh">同一个「一节课」内容量可差 50 倍，所以「一节课」不能是固定价格。</p>
          </div>
          <div style="padding:1.5vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(16px,1.15vw);line-height:1.35">课内追问不计费</div>
            <p class="t-body-sm" style="color:var(--text-secondary);margin-top:.6vh">收费只对应「创造新东西」那一刻：生成、回看以外的新语音。</p>
          </div>
        </div>

        <div data-anim="punch" style="margin-top:auto;padding-top:1.8vh;border-top:2px solid var(--accent)">
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:max(17px,1.35vw);line-height:1.35">同价位对照：Hyperknow Pro US$18 ≈ HK$140，额度用不完即作废、不累积。</div>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P16 · S07 Horizontal Bar ──────────────────────────────────────────────
# 付费转化假设的锚点。三个数字口径完全不同，必须逐条标明。
PAGES.append(f'''
<section class="slide" data-layout="S07" data-animate="bar-grow" data-slide-id="p16">
  <div class="canvas-card">
    {chrome("商业模式 · 关键假设与锚点", 16, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:8fr 4fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">BUSINESS · 04 · THE ASSUMPTION</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,6.8vh);line-height:1.04;letter-spacing:-.03em">整份模型最脆弱的一环：<br/>付费转化率</h2>
        </div>
        <div class="h-bar-chart" data-anim="bars" style="margin-top:2.6vh">
          <div class="row-lbl">全球 freemium 中位数</div><div class="row-track"><div class="row-fill grey" style="width:21.8%"></div></div><div class="row-val">2.18<span class="unit">%</span></div>
          <div class="row-lbl">本计划采用值</div><div class="row-track"><div class="row-fill accent" style="width:50.0%"></div></div><div class="row-val" style="color:var(--accent)">5.0<span class="unit">%</span></div>
          <div class="row-lbl">Duolingo 付费占 MAU</div><div class="row-track"><div class="row-fill" style="width:90.0%"></div></div><div class="row-val">9.0<span class="unit">%</span></div>
        </div>
        <div class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.4vh;margin-top:2vh;color:var(--text-helper)">
          三个数字口径不同，不能视为同类指标的区间：2.18% 是跨品类全球中位数 [B]；9% 是单一公司付费订户占活跃用户 [A]；5% 是我们的采用值 [C]。
        </div>
      </div>

      <div style="display:flex;flex-direction:column;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div class="t-cat" style="color:var(--text-helper)">另外两个假设</div>
        <div style="margin-top:1.8vh">
          <div style="font-family:var(--sans);font-weight:200;font-size:min(2.6vw,4.4vh);line-height:1;letter-spacing:-.025em;font-feature-settings:'tnum'">40<span style="font-size:.36em;font-weight:300;opacity:.6;margin-left:.1em">%</span></div>
          <p class="t-body-sm" style="color:var(--text-secondary);margin-top:.7vh">免费额度利用率。<strong style="font-weight:500;color:var(--text-primary)">完全无外部锚点</strong>，是第一个月实测就会知道的第一个数字。</p>
        </div>
        <div style="margin-top:2.4vh;padding-top:1.8vh;border-top:1px solid var(--border-subtle)">
          <div style="font-family:var(--sans);font-weight:200;font-size:min(2.6vw,4.4vh);line-height:1;letter-spacing:-.025em;color:var(--text-secondary)">用户增长</div>
          <p class="t-body-sm" style="color:var(--text-secondary);margin-top:.7vh">同样无锚点。三个假设的共同点是：<strong style="font-weight:500;color:var(--text-primary)">都会在前几个月的真实数据里被逐项校准</strong>。</p>
        </div>
        <div data-anim="honest" class="card-ink" style="margin-top:auto;padding:1.6vh 1.3vw">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">措辞纪律</div>
          <p class="t-body-sm" style="color:rgba(255,255,255,.86);margin-top:.6vh;font-size:max(13px,.78vw)">这一页与后续所有财务页都标「这是推算」。这是承诺边界，不是资料缺口——三个假设都会被上线后的实测逐项替换。</p>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P17 · S17 System Diagram ──────────────────────────────────────────────
# 收入结构。右半手绘 SVG 环图（53 / 47），左半用户结构横条。
# SVG 内不得出现 <text>（validator 硬规则），所有标签走 HTML 叠加。
_R = 78
_CX, _CY = 100, 100
_C = 2 * 3.14159265 * _R


def _arc(frac, r, w=26, color="var(--accent)", opacity=1.0):
    """以 SVG path 画一段圆环。frac 为占整圈比例。"""
    import math
    ang = frac * 360 - 90
    x2 = _CX + r * math.cos(math.radians(ang))
    y2 = _CY + r * math.sin(math.radians(ang))
    large = 1 if frac > 0.5 else 0
    return (f'<path d="M {_CX} {_CY-r} A {r} {r} 0 {large} 1 {x2:.2f} {y2:.2f}" '
            f'fill="none" stroke="{color}" stroke-width="{w}" opacity="{opacity}"/>')


PAGES.append(f'''
<section class="slide" data-layout="S17" data-animate="system-diagram" data-slide-id="p17">
  <div class="canvas-card">
    {chrome("商业模式 · 收入结构（推算）", 17, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:7fr 5fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">BUSINESS · 05 · REVENUE MIX</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(3.8vw,6.4vh);line-height:1.04;letter-spacing:-.03em">用户在免费档，<br/>收入在两个付费档</h2>
        </div>
        <div class="h-bar-chart" data-anim="bars" style="margin-top:2.4vh;grid-template-columns:13em minmax(0,1fr) 7em">
          <div class="row-lbl">免费</div><div class="row-track"><div class="row-fill grey" style="width:95.0%"></div></div><div class="row-val">95.0<span class="unit">%</span></div>
          <div class="row-lbl">Pro</div><div class="row-track"><div class="row-fill" style="width:3.7%"></div></div><div class="row-val">3.7<span class="unit">%</span></div>
          <div class="row-lbl">Max</div><div class="row-track"><div class="row-fill accent" style="width:1.3%"></div></div><div class="row-val" style="color:var(--accent)">1.3<span class="unit">%</span></div>
        </div>
        <div class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.4vh;margin-top:1.8vh;color:var(--text-helper)">
          占总用户 17,894 人（免费 17,000 · Pro 670 · Max 224）。这是<strong style="font-weight:500;color:var(--text-primary)">用户结构</strong>，不是收入结构。
        </div>
      </div>

      <div style="display:flex;flex-direction:column;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div class="t-cat" style="color:var(--text-helper)">收入结构 · 第 12 个月（推算）</div>
        <div data-anim="ring" style="position:relative;width:min(26vh,19vw);aspect-ratio:1;margin:2.4vh auto 0">
          <svg viewBox="0 0 200 200" style="width:100%;height:100%" aria-label="收入结构环图：Pro 53%、Max 47%">
            <circle cx="100" cy="100" r="{_R}" fill="none" stroke="var(--grey-1)" stroke-width="26"/>
            {_arc(0.53, _R, 26, "var(--ink)")}
            {_arc(0.47, _R, 26, "var(--accent)")}
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3vh">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(1.55vw,2.6vh);line-height:1;letter-spacing:-.03em;font-feature-settings:'tnum'">HK$177.6k</div>
            <div class="t-meta" style="color:var(--text-helper)">M12 月收入</div>
          </div>
        </div>
        <div style="display:flex;gap:2.4vw;margin-top:1.8vh">
          <div style="display:flex;align-items:center;gap:.7vw">
            <span style="width:10px;height:10px;background:var(--ink);display:inline-block"></span>
            <span class="t-body-sm">Pro <b style="font-weight:500">53%</b></span>
          </div>
          <div style="display:flex;align-items:center;gap:.7vw">
            <span style="width:10px;height:10px;background:var(--accent);display:inline-block"></span>
            <span class="t-body-sm">Max <b style="font-weight:500;color:var(--accent)">47%</b></span>
          </div>
        </div>
        <div data-anim="punch" style="margin-top:auto;padding-top:1.8vh;border-top:2px solid var(--accent)">
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:max(16px,1.2vw);line-height:1.4">Max 占付费用户的 <b style="font-weight:500">25%</b>，贡献 <b style="font-weight:500;color:var(--accent)">47%</b> 收入。<br/><span style="color:var(--text-secondary);font-size:.85em">重度使用者有出口，就不会压低 Pro 的转化率——这是 Max 档存在的经济意义。</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P18 · S11 Horizontal Timeline ─────────────────────────────────────────
# 收入轨迹。timeline-h 硬编码 5 栏，正好放 5 个时点。
PAGES.append(f'''
<section class="slide" data-layout="S11" data-animate="timeline-walk" data-slide-id="p18">
  <div class="canvas-card">
    {chrome("商业模式 · 收入轨迹（推算）", 18, "HS")}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;margin-top:4.4vh">
      <div data-anim="line" style="display:flex;flex-direction:column;gap:1.2vh">
        <div class="t-cat accent">BUSINESS · 06 · TRAJECTORY</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,6.8vh);line-height:1.04;letter-spacing:-.03em">四个时点，<br/>收入怎么长出来</h2>
      </div>

      <div class="timeline-h" data-anim="walk" style="margin-top:3vh">
        <div class="tl-row">
          <div class="th-node up"><span class="dot"></span>
            <div class="label"><div class="yr">M1</div><div class="name">HK$0.8k</div><div class="desc">产品可用</div></div>
          </div>
          <div class="th-node down"><span class="dot"></span>
            <div class="label"><div class="yr">M2</div><div class="name">HK$2.6k</div><div class="desc">首批付费用户</div></div>
          </div>
          <div class="th-node up"><span class="dot"></span>
            <div class="label"><div class="yr">M4</div><div class="name">HK$9.3k</div><div class="desc">学校渠道出现</div></div>
          </div>
          <div class="th-node down"><span class="dot"></span>
            <div class="label"><div class="yr">M12</div><div class="name">HK$177.6k</div><div class="desc">894 付费用户</div></div>
          </div>
          <div class="th-node up accent"><span class="dot"></span>
            <div class="label"><div class="yr">M18</div><div class="name">HK$595.7k</div><div class="desc">3,000 付费用户</div></div>
          </div>
        </div>
      </div>

      <div data-anim="foot" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:2vh;margin-top:3vh">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(17px,1.3vw);line-height:1.4;max-width:52ch">
          <strong style="font-weight:500">这是推算。</strong>三个假设同时成立才会走到这条线——它不是预测，是一个可以被逐项推翻的算式。
        </div>
        <div class="t-meta" style="text-align:right;color:var(--text-helper)">用户增长路径是三个假设中<br/>唯一零外部锚点的一个，也是唯一的瓶颈</div>
      </div>
    </div>
  </div>
</section>
''')

# ── P19 · S02 Vertical Timeline ───────────────────────────────────────────
# 获客。三条渠道，各带一个量化数字。刻意不放 CPA 推算——那是内部估算且口径有争议。
PAGES.append(f'''
<section class="slide" data-layout="S02" data-animate="progression" data-slide-id="p19">
  <div class="canvas-card">
    {chrome("商业模式 · 获客路径", 19, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:6fr 5fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">BUSINESS · 07 · GO TO MARKET</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(3.8vw,6.4vh);line-height:1.04;letter-spacing:-.03em">不投付费广告，<br/>靠转介与学校渠道</h2>
        </div>
        <div class="timeline-v" data-anim="line" style="margin-top:1.8vh;--tl-axis-w:18px">
          <div class="tl-node" style="grid-template-columns:var(--tl-axis-w) minmax(0,4.4em) minmax(0,8.6em) 1fr;padding:1.8vh 0">
            <span class="dot"></span><span class="yr">渠道 01</span>
            <span class="multi" style="font-size:min(1.9vw,3.2vh)">HK$100</span>
            <span class="desc" style="font-size:max(13px,.8vw)">用户转介绍。香港教育市场的真实路径，学生把帐号分享出去，双方都省下广告费。<em style="font-style:normal;color:var(--text-helper)">［估算］</em></span>
          </div>
          <div class="tl-node accent" style="grid-template-columns:var(--tl-axis-w) minmax(0,4.4em) minmax(0,8.6em) 1fr;padding:1.8vh 0">
            <span class="dot"></span><span class="yr">渠道 02</span>
            <span class="multi" style="font-size:min(1.9vw,3.2vh)">HK$500K</span>
            <span class="desc" style="font-size:max(13px,.8vw)">学校渠道。B2B 报价，不是 B2C 订阅——学校为「每生一笔钱」买 AI 辅助教学服务。[A] 政府新闻公报</span>
          </div>
          <div class="tl-node" style="grid-template-columns:var(--tl-axis-w) minmax(0,4.4em) minmax(0,8.6em) 1fr;padding:1.8vh 0">
            <span class="dot"></span><span class="yr">渠道 03</span>
            <span class="multi" style="font-size:min(1.9vw,3.2vh)">22h31m</span>
            <span class="desc" style="font-size:max(13px,.8vw)">短影音内容。YouTube 香港每用户每月使用时间，长影音平台全港第一。[B] DataReportal 2025</span>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div class="t-cat" style="color:var(--text-helper)">学校渠道的制度背景 [A]</div>
        <div class="kpi-row-4" style="grid-template-columns:repeat(2,1fr);margin-top:1.8vh;padding-top:1.6vh">
          <div class="kpi-cell">
            <div class="lbl">三年拨款</div>
            <div class="nb">HK$5<span class="unit">亿</span></div>
            <div class="note">「智启学教」政府拨款计划</div>
          </div>
          <div class="kpi-cell">
            <div class="lbl">每所学校</div>
            <div class="nb">HK$500<span class="unit">K</span></div>
            <div class="note">一笔过，用途明文包含 AI 辅助教学服务</div>
          </div>
        </div>
        <div data-anim="confess" class="card-ink" style="margin-top:2.2vh;padding:1.6vh 1.3vw">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">必须先讲的事</div>
          <p class="t-body-sm" style="color:rgba(255,255,255,.86);margin-top:.6vh;font-size:max(13px,.78vw)">这笔钱是给学校的（B2B），不是给家长的（B2C）。Sayo Academy 已在同一批拨款里——我们不是先进入者，但目前的产品形态与资助用途的吻合度最高。</p>
        </div>
        <div data-anim="foot" class="t-meta" style="margin-top:auto;padding-top:1.6vh;color:var(--text-helper)">
          三条渠道的推算依据：转介绍为单一来源估算 [C]；学校渠道为政府公报 [A]；短影音为第三方平台统计 [B]。本页不含付费流量成本推算——那是内部估算且口径有争议，不作为计划基础。
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P20 · SWISS-CLOSING-ASCII ─────────────────────────────────────────────
# 申请。左半 IKB 宣言 + 金额 + 资金分配占位；右半白底三个里程碑。
# 五项资金分配：使用者未拍板 → 醒目占位，不自行填。
PAGES.append(f'''
<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement" data-slide-id="closing">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.4vh 3.4vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1">
          <div class="l">20 / 20</div>
          <div class="r">THE ASK</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:1.4vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">REQUEST</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(3.4vw,5.8vh);line-height:1.1;letter-spacing:-.025em;font-weight:200;color:#fff">不是请你们花钱。<br/>是请你们买<br/>三个可被验证的结果。</h2>
          <div style="font-family:var(--sans);font-weight:200;font-size:min(6.4vw,10.6vh);line-height:.9;letter-spacing:-.04em;color:#fff;margin-top:.4vh">HK$440,000</div>
        </div>
        <div data-anim="alloc" style="position:relative;z-index:1;border:1px solid rgba(255,255,255,.5);padding:1.4vh 1.2vw">
          <div class="t-meta" style="color:rgba(255,255,255,.7)">资金用途分配</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-size:max(14px,.95vw);line-height:1.5;color:#fff;margin-top:.5vh">［待拍板：五项分配比例尚未定案］</div>
        </div>
        <div data-anim="signature" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.22);padding-top:1.4vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">黄浩然 · 黄羿捷</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">2026.10.16</div>
        </div>
      </div>

      <div class="half" style="padding:5.4vh 3.4vw 4.4vh;justify-content:space-between">
        <div class="chrome-min">
          <div class="l">MILESTONES</div>
          <div class="r">03 CHECKPOINTS</div>
        </div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.2vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(3.6vw,6.4vh);line-height:.9">01</div>
            <div>
              <h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(17px,1.45vw);line-height:1.2;margin-bottom:.7vh">第 3 个月 · 产品可用</h3>
              <p class="t-body-sm" style="color:var(--text-secondary)">500 名免费用户 · 26 名付费用户。第一批真实课堂记录，以及第一个实测的免费额度利用率。</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.2vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(3.6vw,6.4vh);line-height:.9">02</div>
            <div>
              <h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(17px,1.45vw);line-height:1.2;margin-bottom:.7vh">第 6 个月 · 2,400 免费 · 126 付费</h3>
              <p class="t-body-sm" style="color:var(--text-secondary)">第一次拿到续订数据。学校渠道出现第一份正式报价。</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.2vh 0;border-top:1px solid var(--border-subtle);border-bottom:2px solid var(--accent)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(3.6vw,6.4vh);line-height:.9;color:var(--accent)">03</div>
            <div>
              <h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(17px,1.45vw);line-height:1.2;color:var(--accent);margin-bottom:.7vh">第 12 个月 · ARR 破 HK$2,000,000</h3>
              <p class="t-body-sm" style="color:var(--text-secondary)">17,000 免费 · 894 付费 · 月收入 HK$177,646。三个假设会被真实数据逐项校准。</p>
            </div>
          </div>
        </div>
        <div data-anim="foot" class="t-meta" style="color:var(--text-helper);border-top:1px solid var(--border-subtle);padding-top:1.2vh">
          里程碑是推算。付费转化率 5%、免费额度利用率 40%、用户增长路径三者目前都无实测锚点，外部可查区间为 2.18%–9%。<br/>→ 完 · END
        </div>
      </div>
    </div>
  </div>
</section>
''')
