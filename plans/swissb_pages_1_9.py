# -*- coding: utf-8 -*-
"""Veridex 青年创业基金简报 — Style B（瑞士国际主义）P1–P9。

版式映射依 tools/guizang-ppt-skill/references/swiss-layout-lock.md 的 S 编号。
文字语汇用 template-swiss.html 里真实存在的 class（layouts-swiss.md 的骨架类名
多数在 CSS 中并不存在，勿照抄）。

配色只用四套预设之一：IKB 克莱因蓝（模板 :root 预设值），不自订任何 hex。
配色纪律已放弃「琥珀＝问题」的第二色语义，问题改由版式位置与文字承载。
"""

TOTAL = 20


def chrome(section, page, who):
    return (
        f'<div class="chrome-min"><div class="l">{section}</div>'
        f'<div class="r">{page:02d} / {TOTAL} · {who}</div></div>'
    )


PAGES = []

# ── P1 · SWISS-COVER-ASCII ────────────────────────────────────────────────
# 全片 accent（IKB 满版）+ ASCII 网格。首页与 P17 收尾形成色彩闭环。
PAGES.append('''
<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero" data-slide-id="cover">
  <div class="canvas-card" style="padding:0;display:flex;flex-direction:column">
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    <div class="chrome-min" style="color:rgba(255,255,255,.9)">
      <div class="l">Veridex 维学 · 青年创业基金委员会</div>
      <div class="r">2026.10.16 · 01 / 17</div>
    </div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh;position:relative;z-index:1">
      <div data-anim="kicker" class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">SECTION 00 · 封面</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(10.4vw,17vh);line-height:.98;letter-spacing:-.025em;color:#fff">为学习而生的<br/>AI 代理</h1>
      <div data-anim="bottom" style="display:grid;grid-template-rows:auto auto;gap:1.6vh;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh">
        <div data-anim="lead" class="lead" style="max-width:54ch;color:rgba(255,255,255,.86)">一节课 10–15 分钟的实时语音教学。你可随时打断、追问、要求换一种讲法。</div>
        <div style="display:flex;justify-content:space-between;align-items:end">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">黄浩然 · 黄羿捷 ／ 产品原型未完成 · 零用户</div>
          <div class="t-meta" style="color:rgba(255,255,255,.6)">→ swipe / arrow keys</div>
        </div>
      </div>
    </div>
  </div>
</section>
''')

# ── P2 · S08 Duo Compare ──────────────────────────────────────────────────
# 问题一 · 定制化课程。二元对照，必须正好两栏。
# 禁用语纪律：本页只讲「定制」，不讲检验，不出现打断／追问／反馈。
PAGES.append(f'''
<section class="slide" data-layout="S08" data-animate="duo-compare" data-slide-id="p2">
  <div class="canvas-card">
    {chrome("问题一 · 定制化课程", 2, "HS")}
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh;margin-top:5.4vh">
      <div class="t-cat accent">PROBLEM 01 · CUSTOMISATION</div>
      <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.4vw,9.4vh);line-height:1;letter-spacing:-.03em">同一间教室，两种课</h2>
      <p class="lead" style="font-weight:300;max-width:46ch">差距不在老师够不够好，在于讲义是发给所有人，还是只给你。</p>
    </div>
    <div class="duo-compare" data-anim="cols" style="margin-top:4.4vh">
      <div class="col">
        <div class="col-tag"><span class="num">A</span> 传统课堂</div>
        <div class="col-ttl">一份讲义<br/>一条进度</div>
        <div class="col-desc">讲义在开课前就定稿了。你在第几页、哪一格、卡在哪里，讲义不知道，也不打算知道。</div>
        <ul class="col-list">
          <li>快的被拖慢，弱的掉队</li>
          <li>老师不知道你想学什么</li>
          <li>你学会了，也只是记得看过</li>
        </ul>
      </div>
      <div class="vrule"></div>
      <div class="col accent">
        <div class="col-tag"><span class="num">B</span> AI native 课堂</div>
        <div class="col-ttl">照你的资料<br/>长出来的课</div>
        <div class="col-desc">课在你开口之后才存在。你的程度决定进度，你讲的话决定第一节课讲什么。</div>
        <ul class="col-list">
          <li>你说什么，第一课就是什么</li>
          <li>进度跟著你，不跟著班</li>
          <li>每天上几节，由你决定</li>
        </ul>
      </div>
    </div>
  </div>
</section>
''')

# ── P3 · S05 Three Layers ─────────────────────────────────────────────────
# 三步造课。step 2 是传统课堂永远不做的那一步 → 唯一 accent 卡。
PAGES.append(f'''
<section class="slide" data-layout="S05" data-animate="stack-row" data-slide-id="p3">
  <div class="canvas-card">
    {chrome("问题一 · 定制化课程", 3, "HJ")}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:0;margin-top:5.4vh">
      <div data-anim="head" style="display:grid;grid-template-columns:5fr 7fr;gap:3.4vw;align-items:end">
        <div style="display:flex;flex-direction:column;gap:1.4vh">
          <div class="t-cat">HOW WE BUILD IT</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.6vw,8vh);line-height:1.02;letter-spacing:-.03em">造一门课，<br/>传统要一整年</h2>
        </div>
        <p class="lead" style="font-weight:300;max-width:40ch">这是整份计划书里，我们唯一把成本压到可负担的那一步。原料是学生已有的东西，产出是只有他能上的课。</p>
      </div>

      <div class="stack-row" data-anim="steps" style="margin-top:4.4vh">
        <div class="stack-block b-grey">
          <div class="layer-nb">01</div>
          <div class="layer-ttl">上传资料，说清需求</div>
          <div class="layer-desc" style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,.94vw);line-height:1.55;opacity:.8;margin-top:1.6vh">讲义、试算表、做不出来的题目。丢进来的东西决定了课的原料——这是传统课堂拿不到的东西。</div>
        </div>
        <div class="stack-block b-accent">
          <div class="layer-nb">02</div>
          <div class="layer-ttl">了解现状，摸清程度</div>
          <div class="layer-desc" style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,.94vw);line-height:1.55;margin-top:1.6vh">传统课堂永远不会做这一步：先知道你在哪，才知道从哪开始。摸清程度本身就是这个产品最贵的一段。</div>
        </div>
        <div class="stack-block b-grey">
          <div class="layer-nb">03</div>
          <div class="layer-ttl">生成课程，带有检验</div>
          <div class="layer-desc" style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,.94vw);line-height:1.55;opacity:.8;margin-top:1.6vh">每一节课都自带练习与测验，因为传统课堂里这一段要由老师另外补，我们要先自己补上。</div>
        </div>
      </div>

      <div data-anim="shot" class="t-meta" style="border-top:1px solid var(--border-subtle);padding-top:1.6vh;margin-top:3vh;color:var(--text-helper)">
        ［待放入课程页截图 — 需要你提供真实画面，这一格不能空著上台］
      </div>
    </div>
  </div>
</section>
''')

# ── P4 · S12 Manifesto + Ink Banner ───────────────────────────────────────
# 问题一 · 定制化课程。阶段性结论 + 底部 ink 通栏。
# 硬性守线：全页禁用「答错」「判断」「反馈」三个词。
PAGES.append(f'''
<section class="slide" data-layout="S12" data-animate="split-statement" data-slide-id="p4">
  <div class="canvas-card" style="padding-bottom:0">
    {chrome("问题一 · 定制化课程", 4, "HJ")}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:0;margin-top:5.4vh">
      <div data-anim="head" style="display:grid;grid-template-columns:7fr 5fr;gap:3.4vw;align-items:end">
        <div style="display:flex;flex-direction:column;gap:1.4vh">
          <div class="t-cat accent">PROBLEM 01 · IN CLASS</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(6.2vw,10.8vh);line-height:1;letter-spacing:-.03em">一节课 10–15 分钟，<br/>讲解中按你的反应调整</h2>
        </div>
        <p class="lead" style="font-weight:300;max-width:34ch">一节课有完成态。这是我们刻意设定的边界：短到你能每天做几节，长到一节课能真正走完一个循环。</p>
      </div>

      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.6vw;margin-top:4vh;align-content:start">
        <div style="border-top:1px solid var(--border-subtle);padding-top:1.8vh">
          <div class="t-meta">01</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-size:max(18px,1.7vw);font-weight:400;line-height:1.2;margin:1vh 0 1.2vh">你说，它就换一种讲法</div>
          <p class="body-sm" style="color:var(--text-secondary)">同一个概念，听不懂就换一个角度重讲，不是把同样的话再说一次。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);padding-top:1.8vh">
          <div class="t-meta">02</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-size:max(18px,1.7vw);font-weight:400;line-height:1.2;margin:1vh 0 1.2vh">追问不中断课的节奏</div>
          <p class="body-sm" style="color:var(--text-secondary)">追问是课内行为，不是另开一场。讲完会回到原来那一节，继续往下。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);padding-top:1.8vh">
          <div class="t-meta">03</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-size:max(18px,1.7vw);font-weight:400;line-height:1.2;margin:1vh 0 1.2vh">讲完就有一道出口</div>
          <p class="body-sm" style="color:var(--text-secondary)">每节课结束都留下练习、测验与复习间隔，让这一节有明确的下一步。</p>
        </div>
      </div>

      <div data-anim="banner" class="half b-ink" style="margin:3.6vh -5vw 0;padding:2.8vh 5vw 2.6vh;flex-direction:column;justify-content:center">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(3.4vw,6vh);line-height:1.1;letter-spacing:-.02em">课内追问不另外收费 —— 问到饱为止</div>
      </div>
    </div>
  </div>
</section>
''')

# ── P5 · S19 Four Cards ───────────────────────────────────────────────────
# 问题二 · 有效的检验。四项等权。③④ 必须动手 → 用 accent 区分。
PAGES.append(f'''
<section class="slide" data-layout="S19" data-animate="four-cards" data-slide-id="p5">
  <div class="canvas-card">
    {chrome("问题二 · 有效的检验", 5, "HS")}
    <div style="flex:1;display:grid;grid-template-rows:auto auto 1fr auto;margin-top:5.4vh">
      <div data-anim="rule" style="height:2px;width:6.4vw;background:var(--accent)"></div>
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh;margin-top:2.6vh">
        <div class="t-cat">PROBLEM 02 · ASSESSMENT</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.4vw,9.4vh);line-height:1;letter-spacing:-.03em">学会一件事，<br/>要走完四步</h2>
      </div>

      <div data-anim="cols" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:4.4vh">
        <div style="border-top:1px solid var(--border-subtle);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0 0">
          <div class="t-meta">— 01</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.6vw,4.6vh);line-height:1.1;margin:1.2vh 0 1.4vh">唤起先备</div>
          <p class="body-sm" style="color:var(--text-secondary)">把要用的旧东西先拿出来。没有旧东西，学的是新的，不是学会的。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0">
          <div class="t-meta">— 02</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.6vw,4.6vh);line-height:1.1;margin:1.2vh 0 1.4vh">示范</div>
          <p class="body-sm" style="color:var(--text-secondary)">看一次别人怎么做。看得懂，但还不是你的。</p>
        </div>
        <div style="border-top:2px solid var(--accent);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0">
          <div class="t-meta" style="color:var(--accent)">— 03</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.6vw,4.6vh);line-height:1.1;margin:1.2vh 0 1.4vh">应用</div>
          <p class="body-sm" style="color:var(--text-secondary)">你自己动手做一次。别人做过，不等于你会。</p>
        </div>
        <div style="border-top:2px solid var(--accent);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0 1.6vw">
          <div class="t-meta" style="color:var(--accent)">— 04</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.6vw,4.6vh);line-height:1.1;margin:1.2vh 0 1.4vh">整合</div>
          <p class="body-sm" style="color:var(--text-secondary)">在你的真实场景里用一次。做到这一步，学会了。</p>
        </div>
      </div>

      <div data-anim="foot" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:2vh;margin-top:3.4vh">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.5vw);line-height:1.3;max-width:52ch">前两步是输入，后两步才是学会。多数教学产品只做到第二步，就把它叫做学会了。</div>
        <div class="t-meta" style="text-align:right;color:var(--text-helper)">Merrill (2002) First principles of instruction<br/>③④ 必须动手做过，且用在自己的题目／工作上</div>
      </div>
    </div>
  </div>
</section>
''')

# ── P6 · S07 Horizontal Bar ───────────────────────────────────────────────
# 问题二 · 有效的检验。全份简报唯一数据页。
PAGES.append(f'''
<section class="slide" data-layout="S07" data-animate="h-bar-chart" data-slide-id="p6">
  <div class="canvas-card">
    {chrome("问题二 · 有效的检验", 6, "HS")}
    <div style="flex:1;display:grid;grid-template-columns:8fr 4fr;gap:3.4vw;margin-top:5.4vh">
      <div style="display:flex;flex-direction:column;min-width:0">
        <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
          <div class="t-cat">PROBLEM 02 · WHAT STUDENTS CANNOT DO</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.4vw,7.6vh);line-height:1.02;letter-spacing:-.03em">学生不是学不会，<br/>是不知道自己哪里不会</h2>
        </div>
        <div class="h-bar-chart" data-anim="bars" style="margin-top:3.4vh">
          <div class="row-lbl">无法解释概念</div><div class="row-track"><div class="row-fill" style="width:42.0%"></div></div><div class="row-val">42.0<span class="unit">%</span></div>
          <div class="row-lbl">给出标准答案</div><div class="row-track"><div class="row-fill" style="width:38.0%"></div></div><div class="row-val">38.0<span class="unit">%</span></div>
          <div class="row-lbl">不知道何时套用</div><div class="row-track"><div class="row-fill" style="width:35.5%"></div></div><div class="row-val">35.5<span class="unit">%</span></div>
          <div class="row-lbl">给变式题目</div><div class="row-track"><div class="row-fill" style="width:31.0%"></div></div><div class="row-val">31.0<span class="unit">%</span></div>
          <div class="row-lbl">不解释「为什么」</div><div class="row-track"><div class="row-fill" style="width:27.0%"></div></div><div class="row-val">27.0<span class="unit">%</span></div>
          <div class="row-lbl">记忆偏误</div><div class="row-track"><div class="row-fill" style="width:26.5%"></div></div><div class="row-val">26.5<span class="unit">%</span></div>
          <div class="row-lbl">给有用提示</div><div class="row-track"><div class="row-fill accent" style="width:18.5%"></div></div><div class="row-val" style="color:var(--accent)">18.5<span class="unit">%</span></div>
          <div class="row-lbl">让学生解释</div><div class="row-track"><div class="row-fill accent" style="width:13.0%"></div></div><div class="row-val" style="color:var(--accent)">13.0<span class="unit">%</span></div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0;border-left:1px solid var(--border-subtle);padding-left:2.4vw">
        <div class="t-cat" style="color:var(--text-helper)">出路二 · 中学生用 AI 答题</div>
        <div style="margin-top:2.2vh">
          <div style="font-family:var(--sans);font-weight:200;font-size:min(3.1vw,5.2vh);line-height:1;letter-spacing:-.025em;font-feature-settings:'tnum'">46<span style="font-size:.36em;font-weight:300;opacity:.6;margin-left:.1em">%</span></div>
          <p class="body-sm" style="color:var(--text-secondary);margin-top:.8vh">香港中学生用过 AI 答题</p>
        </div>
        <div style="margin-top:2.6vh">
          <div style="font-family:var(--sans);font-weight:200;font-size:min(3.1vw,5.2vh);line-height:1;letter-spacing:-.025em;font-feature-settings:'tnum'">35.5<span style="font-size:.36em;font-weight:300;opacity:.6;margin-left:.1em">%</span></div>
          <p class="body-sm" style="color:var(--text-secondary);margin-top:.8vh">其中答过不对的题目</p>
        </div>
        <div style="margin-top:2.6vh;padding-top:1.8vh;border-top:2px solid var(--accent)">
          <div style="font-family:var(--sans);font-weight:200;font-size:min(3.1vw,5.2vh);line-height:1;letter-spacing:-.025em;color:var(--accent);font-feature-settings:'tnum'">&gt;46<span style="font-size:.36em;font-weight:300;opacity:.6;margin-left:.1em">%</span></div>
          <p class="body-sm" style="color:var(--text-secondary);margin-top:.8vh">用过，且相信答案是对的（46% 的中半数以上）</p>
        </div>
      </div>
    </div>

    <div data-anim="foot" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:1.8vh;margin-top:3.4vh">
      <div class="t-meta" style="color:var(--text-helper)">HEPI Student Generative AI Survey 2026（n=975，14–18 岁）· Knof et al. 2024（n=165）<br/>以上为学生自陈行为，不是评测测量；中国中学生的比例远高于此。</div>
      <div class="t-meta" style="color:var(--text-helper);text-align:right">六个能力里，<br/>能真正解决的只有两个</div>
    </div>
  </div>
</section>
''')

# ── P7 · S09 Dot Matrix Statement ─────────────────────────────────────────
# 问题二 · 有效的检验。纯文字问句，statement 版式允许垂直置中。
PAGES.append(f'''
<section class="slide" data-layout="S09" data-animate="dot-matrix" data-slide-id="p7">
  <div class="canvas-card" style="position:relative">
    <div class="dot-mat" aria-hidden="true" style="position:absolute;right:4vw;top:16vh;opacity:.5;pointer-events:none"></div>
    {chrome("问题二 · 有效的检验", 7, "HJ")}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;margin-top:5.4vh;position:relative;z-index:1">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-cat accent">PROBLEM 02 · THE GAP</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.6vw,9.8vh);line-height:1;letter-spacing:-.03em">一题做错了，<br/>这四件事要有人回答</h2>
      </div>

      <div data-anim="up" style="display:flex;flex-direction:column;justify-content:center;gap:2.6vh">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,7vh);line-height:1.1;letter-spacing:-.02em">这题<b style="font-weight:400;border-bottom:2px solid var(--accent)">挂哪个</b>知识点？</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,7vh);line-height:1.1;letter-spacing:-.02em">为什么会<b style="font-weight:400;border-bottom:2px solid var(--accent)">错</b>？</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,7vh);line-height:1.1;letter-spacing:-.02em">该<b style="font-weight:400;border-bottom:2px solid var(--accent)">补</b>哪一块？</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4vw,7vh);line-height:1.1;letter-spacing:-.02em"><b style="font-weight:400;border-bottom:2px solid var(--accent)">多久</b>再问一次？</div>
      </div>

      <div data-anim="foot" style="border-top:1px solid var(--border-subtle);padding-top:2.2vh;margin-top:4vh;display:flex;justify-content:space-between;align-items:end">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(19px,1.8vw);line-height:1.3;max-width:50ch">现在的产品大多只回答第一个。我们回答四个。</div>
        <div class="t-meta" style="color:var(--text-helper);text-align:right">→ 下一页：这四个问题，<br/>分别归谁决定</div>
      </div>
    </div>
  </div>
</section>
''')

# ── P8 · S19 Four Cards ───────────────────────────────────────────────────
# 问题二 · 有效的检验。四个可追问的动作。
PAGES.append(f'''
<section class="slide" data-layout="S19" data-animate="four-cards" data-slide-id="p8">
  <div class="canvas-card">
    {chrome("问题二 · 有效的检验", 8, "HS")}
    <div style="flex:1;display:grid;grid-template-rows:auto auto 1fr auto;margin-top:5.4vh">
      <div data-anim="rule" style="height:2px;width:6.4vw;background:var(--accent)"></div>
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh;margin-top:2.6vh">
        <div class="t-cat">PROBLEM 02 · FOUR MOVES</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5vw,8.6vh);line-height:1.02;letter-spacing:-.03em">检验不是问「懂了吗」，<br/>是四个可追问的动作</h2>
      </div>

      <div data-anim="cols" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:4.4vh">
        <div style="border-top:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0 0">
          <div class="t-meta">— 01</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.4vw,4.2vh);line-height:1.1;margin:1.2vh 0 1.4vh">测什么</div>
          <p class="body-sm" style="color:var(--text-secondary)">题目从你上传的材料里出，不从公开题库出。测的是你接下来要用的那一块。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0">
          <div class="t-meta">— 02</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.4vw,4.2vh);line-height:1.1;margin:1.2vh 0 1.4vh">追溯</div>
          <p class="body-sm" style="color:var(--text-secondary)">错了之后往回退，退到你真正不会的那一层为止——不设深度上限。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0">
          <div class="t-meta">— 03</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.4vw,4.2vh);line-height:1.1;margin:1.2vh 0 1.4vh">给什么</div>
          <p class="body-sm" style="color:var(--text-secondary)">给思路，不给答案。课内追问不另外计费，追问不中断原课节奏。</p>
        </div>
        <div style="border-top:1px solid var(--border-subtle);border-left:1px solid var(--border-subtle);padding:2.4vh 1.6vw 0 1.6vw">
          <div class="t-meta">— 04</div>
          <div style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.4vw,4.2vh);line-height:1.1;margin:1.2vh 0 1.4vh">测多久</div>
          <p class="body-sm" style="color:var(--text-secondary)">间隔重复。学会的判断不是这次对了，是一个月后还对。</p>
        </div>
      </div>

      <div data-anim="foot" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:2vh;margin-top:3.4vh">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.5vw);line-height:1.3;max-width:50ch">第 04 步是多数产品完全没有的：它们测完就结束了。</div>
        <div class="t-meta" style="text-align:right;color:var(--text-helper)">Cepeda et al. 2008, Psychological Bulletin<br/>间隔重复最优间隔约 20–40%（跨 1 小时到 2 年复习）</div>
      </div>
    </div>
  </div>
</section>
''')

# ── P9 · S04 Six Cells ────────────────────────────────────────────────────
# 定位。S04 六格，单一高亮色只用在 05／06 两格。
# 诚实性支点：留白＝公开资料没有明文，不等于它没有这项功能。
PAGES.append(f'''
<section class="slide" data-layout="S04" data-animate="grid-reveal" data-slide-id="p9">
  <div class="canvas-card">
    {chrome("定位 · 竞争格局", 9, "HS")}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;margin-top:5.4vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-cat accent">POSITIONING · 01</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.6vw,7.8vh);line-height:1.04;letter-spacing:-.03em">学成一件事，中间有六件事要发生。<br/>每一件，现在归谁决定。</h2>
      </div>

      <div class="sub-grid-3-2" data-anim="cells" style="margin-top:3.4vh">
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">01</span><div class="ttl">材料用谁的</div><div class="desc">你自己准备，或用通用教材</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">02</span><div class="ttl">课是谁做的</div><div class="desc">别人先做好（数百门课），或你开口让它生成</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">03</span><div class="ttl">讲到哪里</div><div class="desc">你自己翻进度表</div></div>
        <div class="sub-card" style="border-radius:0"><span class="nb-corner">04</span><div class="ttl">怎么算学会了</div><div class="desc">有测验，或问答式学习</div></div>
        <div class="sub-card accent" style="border-radius:0"><span class="nb-corner">05</span><div class="ttl">错了之后</div><div class="desc">有人做，但决定的是「接下来给你什么」</div></div>
        <div class="sub-card accent" style="border-radius:0"><span class="nb-corner">06</span><div class="ttl">多久之后再问一次</div><div class="desc">公开资料看不到</div></div>
      </div>

      <div data-anim="foot" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:2vh;margin-top:3.4vh">
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.5vw);line-height:1.3;max-width:52ch">我们的差别不在某一格比较好，而是六格由同一个产品接著做，中间不会掉回通用答案。</div>
        <div class="t-meta" style="text-align:right;color:var(--text-helper)">留白＝该产品公开页面上没有明文，不等于它没有这项功能<br/>量级参照：Hyperknow／Coursera／DeepLearning.AI／ChatGPT Study mode 公开页面</div>
      </div>
    </div>
  </div>
</section>
''')
