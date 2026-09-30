# open-slide — Agent Guide

You are authoring **slides** in this repo. Every slide is arbitrary React code that you write.

## Hard rules

- Put your slide under `slides/<kebab-case-id>/`.
- The entry is `slides/<id>/index.tsx`.
- Put slide-specific images/videos/fonts under `slides/<id>/assets/`. For assets reused across decks or themes (logos, avatars), use the global `assets/` folder and import via `@assets/...`.
- Do **not** touch `package.json`, `open-slide.config.ts`, or other slides.
- Do not add dependencies. Use only `react` and standard web APIs.

## Which skill to use

- **Drafting a new deck** — use the `create-slide` skill. It walks through scoping questions, structure, and hand-off.
- **Applying inspector comments** (`@slide-comment` markers in a page) — use the `apply-comments` skill.
- **Creating or extracting a theme** — use the `create-theme` skill. Themes live as markdown under `themes/<id>.md` and are read by `create-slide` before authoring.
- **Resolving "this page" / "this element"** — when the user references the current slide or selection without naming it, consult the `current-slide` skill. It reads the dev server's `node_modules/.open-slide/current.json` to find which slide, page, and inspector-picked element they mean.
- **Writing a speech script / speaker notes** — use the framework's built-in feature: the `notes` export in the slide's `index.tsx`, index-aligned with the page array and shown in the presenter view. See the **Speaker notes** section of the `slide-authoring` skill. Never deliver a script as a markdown or text file.
- **Any other slide edit** — read the `slide-authoring` skill before writing. It is the technical reference for everything inside `slides/<id>/`: file contract, the 1920×1080 canvas, type scale, palette, layout, assets, self-review checklist, and anti-patterns. `create-slide` and `apply-comments` both defer to it for the *how*.

Keep this file short: hard rules only. All deeper guidance lives in the skills above.

## Content discipline (這個專案)

上面是框架的技術規矩。以下三條是**內容規矩**，優先級更高——它們決定一頁投影片能不能出現。凡兩者衝突時，內容規矩優先。

### 1. 使用者沒有確定過的內容，不要自己填

沒有明確敲定的東西，**不要憑推測補上**。留下醒目的佔位（`［待填］`、`［待確認］`），或者去問。

- ❌ 規格裡沒有，於是「順便加了一頁風險披露」——那一頁把「機器評分與人一致率只有 52%」寫成了投影片標題，等於替評審寫好拒絕我們的理由
- ✅ 留佔位，在回報裡列出「還需要你補什麼」，讓使用者在答問之前自己填

判準：**如果這句話是使用者會想要親自決定的，就不要自己決定。**

### 2. 不要放沒有證據的內容

任何數字、論文、競品說法、價格，放上投影片之前必須能追溯到可公開查證的出處。

- ❌ 引用一篇查不到 DOI 的論文（曾經發生：為了換一個佐證，編造了一篇 `Reines & Camosy 2013`，結果 PubMed 檢索 0 條、Crossref 上那個 DOI 是一篇肌肉病論文）
- ❌ 報一個「感覺應該是這樣」的效應量
- ✅ 查不到就不寫。查不到本身就是一條結論——寫進規格的禁用清單，記錄為什麼不能用

被推翻的迷思同樣禁止上片，即使它聽起來合理、就算它很常見。常見 ≠ 為真。

### 3. 投影片的上下文不能讓人覺得突兀

任何數字、術語、序號、對比，都必須在**同一頁之內**給出它所依賴的上下文。聽眾不會為了理解第 4 頁而回頭重讀第 3 頁。

- ❌ 單獨放一個「第四格是空的」——但聽眾從來沒被介紹過什麼是四格
- ❌ 單獨放一個 52%——不知道誰的 52%、什麼意思、跟旁邊的數字什麼關係
- ✅ 同一頁把必要的定義、場景、對比對象一起給出

**每一頁都要能獨立看懂。** 這是硬性要求，不是風格偏好。

### 衝突時的處理順序

1. 使用者明確說過的
2. 本專案 `specs/` 裡已核實並記錄的
3. 查得到出處的公開資料
4. 以上都沒有 → 問使用者，不要猜

## Updating skills

The skills above are managed by `@open-slide/core`. Do not edit them in place. To pull the latest versions:

```
pnpm up @open-slide/core
pnpm sync:skills
```

`pnpm dev` will also detect drift on startup and offer to sync. `pnpm sync:skills --dry-run` (via `pnpm exec open-slide sync:skills --dry-run`) previews changes without writing.
