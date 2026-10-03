# -*- coding: utf-8 -*-
"""把 Veridex P1–P17 拼进 guizang-ppt-skill 的瑞士风模板，产出单档 HTML deck。

唯一建置命令：
    python3 plans/build_veridex_deck_swissb.py   ->  plans/Veridex_20p_SwissB.html

来源只读：模板取自 tools/guizang-ppt-skill/assets/template-swiss.html，
不修改 skill 目录。视觉系统、runtime、WebGL ASCII 背景、讲者模式全部沿用上游，
我们只替换 <title> 与 <div id="deck"> 内的投影片本体。

配色：模板 :root 预设即 IKB 克莱因蓝（#002FA7），不自订任何 hex。
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "tools" / "guizang-ppt-skill" / "assets" / "template-swiss.html"
OUT = ROOT / "plans" / "Veridex_20p_SwissB.html"
TITLE = "Veridex 维学 — 青年创业基金委员会 · 瑞士国际主义 Style B"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from swissb_pages_1_9 import PAGES as PAGES_A          # noqa: E402
from swissb_pages_10_17 import PAGES as PAGES_MID       # noqa: E402
from swissb_pages_business import PAGES as PAGES_BIZ   # noqa: E402
from swissb_notes import NOTES                         # noqa: E402

PAGES = PAGES_A + PAGES_MID + PAGES_BIZ
EXPECTED_PAGES = 20

# validate-swiss-deck.mjs 接受的版式白名单
ALLOWED = {f"S{i:02d}" for i in range(1, 23)} | {"SWISS-COVER-ASCII", "SWISS-CLOSING-ASCII"}
SECTION_RE = re.compile(r'<section\b[^>]*>')
LAYOUT_RE = re.compile(r'data-layout="([^"]+)"')
SLIDE_ID_RE = re.compile(r'data-slide-id="([^"]+)"')


def preflight() -> list[str]:
    """写档前先做静态检查：页数、版式白名单、重复版式连续三次、备注对位。"""
    problems: list[str] = []
    if len(PAGES) != EXPECTED_PAGES:
        problems.append(f"页数应为 {EXPECTED_PAGES}，实际 {len(PAGES)}")

    layouts: list[str] = []
    slide_ids: list[str] = []
    for i, page in enumerate(PAGES, 1):
        first = SECTION_RE.search(page)
        if not first:
            problems.append(f"P{i}: 找不到 <section>")
            continue
        m = LAYOUT_RE.search(first.group(0))
        if not m:
            problems.append(f"P{i}: 缺少 data-layout")
        else:
            layouts.append(m.group(1))
            if m.group(1) not in ALLOWED:
                problems.append(f"P{i}: data-layout=\"{m.group(1)}\" 不在 S01–S22 白名单")
        sid = SLIDE_ID_RE.search(first.group(0))
        if sid:
            slide_ids.append(sid.group(1))
        else:
            problems.append(f"P{i}: 缺少 data-slide-id（讲者备注靠它对位）")

    for i in range(len(layouts) - 2):
        if layouts[i] == layouts[i + 1] == layouts[i + 2]:
            problems.append(f"P{i+1}–P{i+3}: 连续三页同版式 {layouts[i]}")

    if len(set(layouts)) < 12:
        problems.append(f"版式种类只有 {len(set(layouts))} 种，17 页至少要 12 种")

    # 讲者备注必须一页一条、id 完全对位
    note_ids = [n.get("id") for n in NOTES]
    if note_ids != slide_ids:
        problems.append(f"备注 id 与投影片 id 不对位\n      投影片: {slide_ids}\n      备注  : {note_ids}")

    # statement 之外的页面，标题区不得 text-align:center / align-self:center
    statement = {"S03", "S09", "S10", "SWISS-COVER-ASCII", "SWISS-CLOSING-ASCII"}
    for i, (page, layout) in enumerate(zip(PAGES, layouts), 1):
        if layout in statement:
            continue
        head = page[:1800]
        if re.search(r"text-align\s*:\s*center", head, re.I):
            problems.append(f"P{i}: 标题区出现 text-align:center")
        if re.search(r"align-self\s*:\s*center", head, re.I) and re.search(r"<h[12]\b", head, re.I):
            problems.append(f"P{i}: 标题区出现 align-self:center + h1/h2")
        if re.search(r"<text\b", page, re.I):
            problems.append(f"P{i}: SVG 内含可见 <text>")

    return problems


def build() -> str:
    html = TEMPLATE.read_text(encoding="utf-8")

    # 1) 换标题
    html = re.sub(r"<title>.*?</title>", f"<title>{TITLE}</title>", html, count=1, flags=re.S)

    # 2) 换投影片：保留 <div id="deck"> 与 <div id="nav">，只换中间内容
    start = html.index('<div id="deck">') + len('<div id="deck">')
    end = html.index('<div id="nav">')
    body = "\n" + "\n".join(p.strip() for p in PAGES) + "\n\n"
    html = html[:start] + body + html[end:]

    # 3) 换讲者备注：SPEAKER_NOTES = [ ... ]; 整段替换
    notes_js = (
        "const SPEAKER_NOTES = "
        + json.dumps(NOTES, ensure_ascii=False, indent=2)
        + ";"
    )
    html, n = re.subn(
        r"const SPEAKER_NOTES\s*=\s*\[[\s\S]*?\n\];",
        lambda _m: notes_js,
        html,
        count=1,
    )
    if n != 1:
        raise SystemExit("✗ 找不到模板中的 SPEAKER_NOTES 区块，未替换讲者备注")

    return html


def main() -> int:
    problems = preflight()
    if problems:
        print("✗ 建置前检查未通过：", file=sys.stderr)
        for p in problems:
            print(f"   - {p}", file=sys.stderr)
        return 1

    OUT.write_text(build(), encoding="utf-8")
    kb = OUT.stat().st_size / 1024
    print(f"✓ slides: {len(PAGES)}  →  {OUT.relative_to(ROOT)}  ({kb:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
