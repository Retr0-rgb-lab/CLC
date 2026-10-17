# Specs 對齊筆記（Alfred Notion 修訂後 · 2026-10-17）

對照計劃書：`/workspace/clc-rewrite/out/Veridex书面计划书.md`（及本機 `E:\College_Projects\CLC\book\`）。**未重寫書面計劃書**（Alfred 擁有該版）。

## Owner 命名鎖（後續 steering）

| 項 | 定案 |
|---|---|
| 第四核**能力** | 隨時＋課中問答 |
| 第四核**對外標題**（Specs／用語表／計劃書標題層） | **就這一節的隨堂提問／隨時問正在學的內容** |
| 勿作 headline | 「AI 基本問答」／「基本的 AI 問答」（僅可內部別名） |
| 產品開發 | **兩人 AI 輔助自研、不外包** |

## 已改檔（box：`/workspace/clc-rewrite/specs/`；並盡量同步本機 `E:\College_Projects\CLC\specs\`）

### product/
- `veridex-product-philosophy.md` — 第四核標題＋能力鎖
- `content-quality-liability.md` — 四大核心／問答閘命名
- `web-app-presentation.md` — 四核標題；隨時＋課中雙入口；計劃書層「功能與介面一致，不細講布局」
- `hk-business-glossary.md` — §0b 語氣／命名／自研／招聘／Stripe／學校渠道；替換表加「口徑」「AI 基本問答」「100 人」
- `go-to-market-and-risk-framing.md` — 標題去「口徑」；自研＋十餘人；學校渠道 §1.5 腳註；人手與進度驗收改交付物
- `README.md`（本機 `E:\College_Projects\CLC\specs\product\README.md`）— 已補「計劃書語氣與第四核命名鎖」節

### economics/
- `veridex-financial-model.md` — §6.2 Stripe 白話；§9.1／§9.1.1 自研餅圖；廢止 12–15 人月外包；產品開發驗收＝第 90 天；補證項 9 改追蹤接口帳單
- `unit-economics-sustainability.md` — 產品／開發鎖；Stripe 白話；場景表第四核改名
- `veridex-pricing.md` — 頂部對齊鎖＋Stripe 白話（費率數字未改）

## 衝突／數字分歧（計劃書 vs 舊 Specs）

1. **產品開發驗收**：舊 Specs `financial-model` §9.1 寫「M12 ARR ≈ HK$1,820,000」作驗收；**計劃書已改**為第 90 天保底交付物，ARR／894 付費等為**推算觀測、非本輪驗收**。**Specs 已改跟計劃書。**
2. **外包 12–15 人月／約 HK$120k–150k**：見於計劃書 `.prev` 版 §9.1；**現行計劃書已取消**。box Specs 原先幾乎未寫該人月表（僅補證「兼職工程師報價」暗示外包路徑）——**已廢止並改寫為自研敘事**。
3. **第四核對外標題**：現行 Alfred 計劃書正文仍多用「AI 基本問答交互」；**Specs／用語表已鎖新標題**。若計劃書要與 Specs 標題一致，需 Alfred 再改計劃書（本任務不改計劃書）。
4. **M1 用戶數**：舊 go-to-market 示例寫「約 500 免費＋首批付費」；計劃書 M1 默認口述**保守約 6–8 付費**，500／26 等屬舊里程碑表。**go-to-market 已改為保底四項＋入表，付費講保守觀測**；`financial-model` §9 里程碑表仍殘留舊 M1「500 免費／26 付費」作**觀測情景數字**——與計劃書「觀測／非驗收」一致方向，但**具體 500／26 vs 保守 6–8** 仍並存於不同表，引用時須標「觀測／口述檔」。
5. **招聘**：計劃書＝首年約十餘人；Specs 原先無「100 人」字樣；用語表／GTM 已**禁止寫回 100 人**。
6. **學校渠道**：計劃書與 Specs 均已「不入收入模型」；GTM 補 §1.5 與計劃書一致。
7. **Stripe 費率數字**：計劃書與 Specs 一致（Pro 5.0%／HK$7.38 等）；Specs 補非技術白話說明。

## 未動

- 書面計劃書全文（Alfred）
- pitch-* Spec／Deck／docx（除非後續另派）

## 本機同步

已寫入 `E:\College_Projects\CLC\specs\{product,economics}\` 與 `E:\College_Projects\CLC\book\specs-align-after-notion.md`（經 `.grokbot\tmp-clc-specs` 中轉，因 CopyFromBox 不能直寫 E:）。
