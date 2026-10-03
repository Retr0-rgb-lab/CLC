# -*- coding: utf-8 -*-
"""Veridex 青年创业基金简报 — Style B（瑞士国际主义）P10–P17。

版式映射依 swiss-layout-lock.md 的 S 编号；文字语汇用 template-swiss.html
里真实存在的 class。单一高亮色只用 var(--accent)（IKB 蓝）。
「问题／空白」不再用第二色，改由版式位置、实心块与文字标签承载。
"""

TOTAL = 20


def chrome(section, page, who):
    return (
        f'<div class="chrome-min"><div class="l">{section}</div>'
        f'<div class="r">{page:02d} / {TOTAL} · {who}</div></div>'
    )


PAGES = []

# ── P10 · S15 Matrix + Hero Stat ──────────────────────────────────────────
# 定位。四列 × 四问。Veridex 行是设计中，不是已上线。
# 底部巨数 0 = 跟我们最像的那一家，四个问题一个字都没写。
_MATRIX_ROWS = [
    ("Hyperknow", ["公开资料看不到"] * 4, "gap"),
    ("ChatGPT Study mode",
     ["依它读到的题目", "会（官方明文）", "提示你要温习什么", "公开资料看不到"], "plain"),
    ("Coursera", ["公开资料看不到"] * 4, "gap"),
    ("DeepLearning.AI", ["公开资料看不到"] * 4, "gap"),
    ("Veridex", ["每题都追到底", "给思路，不给答案", "只补那一块", "AI 算好、你确认"], "us"),
]

_rows_html = []
for _name, _cells, _kind in _MATRIX_ROWS:
    _is_us = _kind == "us"
    _tint = "var(--accent)" if _is_us else "var(--border-subtle)"
    _tint_w = "2px" if _is_us else "1px"
    _col = "var(--accent)" if _is_us else "var(--text-primary)"
    _cells_html = "".join(
        f'<div style="padding:1.5vh 1.2vw;border-left:1px solid var(--border-subtle);'
        f'font-family:var(--sans),var(--sans-zh);font-size:max(14px,.86vw);line-height:1.45;'
        f'color:{"var(--accent)" if _is_us else ("var(--text-helper)" if c.startswith("公开资料") else "var(--text-secondary)")}">{c}</div>'
        for c in _cells
    )
    _rows_html.append(
        f'<div style="display:grid;grid-template-columns:11vw repeat(4,1fr);'
        f'border-top:{_tint_w} solid {_tint};align-items:stretch">'
        f'<div style="padding:1.5vh 1.2vw 1.5vh 0;font-family:var(--sans),var(--sans-zh);'
        f'font-size:max(14px,.86vw);font-weight:500;color:{_col};line-height:1.35">'
        f'{_name}{"<span style=\'color:var(--accent);font-weight:400\'> · 设计中</span>" if _is_us else ""}</div>'
        f'{_cells_html}</div>'
    )

PAGES.append(f'''
<section class="slide" data-layout="S15" data-animate="matrix" data-slide-id="p10">
  <div class="canvas-card">
    {chrome("定位 · 竞争格局", 10, "HJ")}
    <div style="flex:1;display:grid;grid-template-rows:auto auto 1fr auto;margin-top:4.4vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
        <div class="t-cat accent">POSITIONING · 02</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.4vw,7.6vh);line-height:1.02;letter-spacing:-.03em">错了之后，这四件事分别归谁</h2>
      </div>

      <div data-anim="grid" style="margin-top:3vh">
        <div style="display:grid;grid-template-columns:11vw repeat(4,1fr)">
          <div class="t-meta" style="padding-bottom:1vh;color:var(--text-helper)">↓ 四个问题</div>
          <div class="t-meta" style="padding:0 1.2vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-helper)">挂哪个知识点</div>
          <div class="t-meta" style="padding:0 1.2vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-helper)">为什么错</div>
          <div class="t-meta" style="padding:0 1.2vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-helper)">补哪一块</div>
          <div class="t-meta" style="padding:0 1.2vw 1vh;border-left:1px solid var(--border-subtle);color:var(--text-helper)">多久再问一次</div>
        </div>
        {''.join(_rows_html)}
      </div>

      <div data-anim="hero-stat" style="display:flex;align-items:end;gap:3vw;margin-top:3.4vh">
        <div style="font-family:var(--sans);font-weight:200;font-size:min(9vw,15vh);line-height:.84;letter-spacing:-.04em;color:var(--accent)">0</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-size:max(17px,1.3vw);line-height:1.45;color:var(--text-secondary);padding-bottom:1.2vh;max-width:44ch">
          跟我们最像的那一家——有记忆、有个人化、有互动——四个问题一个字都没写。<br/>
          「公开资料看不到」是诚实的答案，不是判对方的结论。
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P11 · S20 Stacked KPI Ledger ──────────────────────────────────────────
# 定位。纵向帐单式三档定价 + Hyperknow 对照 + 三条计费原则。
# 禁用语纪律：全页不出现任何积分数字、不出现毛利、不做量折扣比较。
PAGES.append(f'''
<section class="slide" data-layout="S20" data-animate="stacked-ledger" data-slide-id="p11">
  <div class="canvas-card">
    {chrome("定位 · 怎么计价", 11, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:7fr 5fr;gap:3.4vw;margin-top:4.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat accent">POSITIONING · 03</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.2vw,7.2vh);line-height:1.02;letter-spacing:-.03em">你要记住的只有一件事：<br/>一天能上几节课</h2>
        </div>

        <div data-anim="ledger" style="margin-top:3.4vh">
          <div style="display:grid;grid-template-columns:5.4vw 13vw 1fr;gap:1.6vw;align-items:end;padding:2.2vh 0 1.4vh;border-top:2px solid var(--ink)">
            <div class="t-meta">T 01</div>
            <div class="t-meta" style="color:var(--text-helper)">免费</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:max(17px,1.5vw);line-height:1.3">每天 <b style="font-weight:400">2 节</b>短讲解</div>
          </div>
          <div style="display:grid;grid-template-columns:5.4vw 13vw 1fr;gap:1.6vw;align-items:end;padding:2.2vh 0 1.4vh;border-top:1px solid var(--border-subtle)">
            <div class="t-meta" style="color:var(--accent)">T 02</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(3.4vw,5.8vh);line-height:1;color:var(--accent)">HK$148</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.4;color:var(--text-secondary)">Pro · 每天 <b style="font-weight:400;color:var(--text-primary)">12 节</b>短讲解，或 <b style="font-weight:400;color:var(--text-primary)">5 节</b>完整课</div>
          </div>
          <div style="display:grid;grid-template-columns:5.4vw 13vw 1fr;gap:1.6vw;align-items:end;padding:2.2vh 0 1.4vh;border-top:1px solid var(--border-subtle)">
            <div class="t-meta">T 03</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(3.4vw,5.8vh);line-height:1">HK$388</div>
            <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.4;color:var(--text-secondary)">Max · 每天 <b style="font-weight:400;color:var(--text-primary)">25 节</b>短讲解，或 <b style="font-weight:400;color:var(--text-primary)">10 节</b>完整课</div>
          </div>
          <div class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.6vh;color:var(--text-helper)">额度每日发放，累积七天，不设窗口期，不月底清零——用不完不会因为你隔天没登入而消失。</div>
          <div class="t-meta" style="padding-top:1.2vh;color:var(--text-helper)">购买单位是节数。计价单位不是节数——为什么，下一段讲。</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div data-anim="head" class="t-cat" style="color:var(--text-helper)">同价位对照 · Hyperknow Pro</div>
        <div style="margin-top:2.4vh;display:flex;flex-direction:column;gap:0">
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <span class="t-meta" style="color:var(--text-helper)">月费</span>
            <span style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.3">US$18 ≈ HK$140 ／ HK$148</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <span class="t-meta" style="color:var(--text-helper)">额度怎么发</span>
            <span style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.3">窗口期重置，过期作废 ／ <b style="font-weight:400;color:var(--accent)">每日发放</b></span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <span class="t-meta" style="color:var(--text-helper)">用不完的额度</span>
            <span style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.3">不累积 ／ <b style="font-weight:400;color:var(--accent)">累积七天</b></span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <span class="t-meta" style="color:var(--text-helper)">课内追问</span>
            <span style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.3">扣额度 ／ <b style="font-weight:400;color:var(--accent)">0</b></span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:1.6vh 0;border-top:1px solid var(--border-subtle)">
            <span class="t-meta" style="color:var(--text-helper)">上传自己的教材</span>
            <span style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.05vw);line-height:1.3">额度增加 ／ <b style="font-weight:400;color:var(--accent)">0</b></span>
          </div>
        </div>

        <div data-anim="punch" style="margin-top:auto;padding-top:2.4vh;border-top:2px solid var(--accent)">
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:max(18px,1.45vw);line-height:1.35">价位几乎一样。差的是额度怎么发：它用不完就作废，我们的可以累积七天。</div>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P12 · S03 Split Statement ─────────────────────────────────────────────
# 定位收束。硬性要求：全页零数字（金额、百分比、期限一律不出）。
PAGES.append(f'''
<section class="slide" data-layout="S03" data-animate="split-statement" data-slide-id="p12">
  <div class="canvas-card" style="padding:0">
    <div class="split-half">
      <div class="half" style="padding:5.6vh 3.4vw 4.4vh;justify-content:space-between">
        <div class="chrome-min">
          <div class="l">定位 · 收束</div>
          <div class="r">12 / 17 · 两人</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-meta" style="letter-spacing:.22em;color:var(--text-helper)">SECTION 01 CLOSE</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.2vw,9vh);line-height:1.04;letter-spacing:-.03em">定制和检验，<br/>现在没有别人<br/><span style="color:var(--accent)">同时</span>做得出来。</h2>
        </div>
        <div data-anim="foot" class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:2vh;color:var(--text-helper)">黄浩然 · 黄羿捷</div>
      </div>
      <div class="half b-grey r-border" style="padding:5.6vh 3.4vw 4.4vh;justify-content:space-between">
        <div class="chrome-min">
          <div class="l">NEXT</div>
          <div class="r">→ 生意</div>
        </div>
        <div data-anim="note" style="display:flex;flex-direction:column;gap:2.4vh">
          <p class="lead" style="font-weight:300;max-width:30ch">问题讲完了。接下来是：这门课要怎么变成一笔生意。</p>
          <div style="border-top:1px solid var(--border-subtle);padding-top:2.2vh">
            <div class="t-meta" style="color:var(--text-helper)">谁会用它 ／ 别人在做什么 ／ 我们怎么收钱 ／ 人从哪来 ／ 请批什么</div>
          </div>
        </div>
        <div data-anim="foot" class="t-meta" style="color:var(--text-helper)">下一页起 · 黄浩然</div>
      </div>
    </div>
  </div>
</section>
''')
