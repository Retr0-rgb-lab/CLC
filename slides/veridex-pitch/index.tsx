import {
  type DesignSystem,
  ImagePlaceholder,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import { useEffect, type CSSProperties, type FC, type ReactNode } from 'react';

/* ================================================================== *
 * Design system
 * ================================================================== */

export const design: DesignSystem = {
  palette: { bg: '#F6F7F9', text: '#0F172A', accent: '#2F6BFF' },
  fonts: {
    display:
      '"PingFang SC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans SC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
    body: '"PingFang SC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans SC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
  },
  typeScale: { hero: 124, body: 32 },
  radius: 14,
};

/* ================================================================== *
 * Tokens
 *
 * Discipline: 藍 = 結構 / 數據 / Veridex 自己的正面內容
 *             琥珀 = 問題 / 未解 / 斷點 / 盲點 / 缺口
 * 橙色的量，就是那個位置有問題的量。
 *
 * ACCENT / AMBER 是「圖形色」——填充、邊框、條形、SVG stroke。
 * 文字另用 ACCENT_TXT / AMBER_TXT 這組深色版，否則同樣的色相
 * 在 #F6F7F9 與 AMBER_SOFT 上只有 3.2:1 / 2.96:1，達不到 AA。
 * ================================================================== */

const ACCENT = 'var(--osd-accent)';
const ACCENT_TXT = '#1B4FD8';
const BLUE_SOFT = 'rgba(47,107,255,0.08)';
const BLUE_LINE = 'rgba(47,107,255,0.30)';
const AMBER = '#C07A16';
const AMBER_TXT = '#8F5606';
const AMBER_SOFT = 'rgba(192,122,22,0.09)';
const AMBER_LINE = 'rgba(192,122,22,0.34)';
const MUTED = '#5A6675';
const DIM = '#5F6B79';
const RULE = '#DFE3E9';
const PANEL = '#FFFFFF';
const NUM = '"Inter","SF Pro Display","Segoe UI",system-ui,-apple-system,sans-serif';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

/** RISE — 全篇唯一的幕間動作：260ms 淡入 + 6px 上移。 */
export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

/* ================================================================== *
 * Connector draw-on (only motion #3: stroke-dashoffset)
 * ================================================================== */

const KEYFRAMES_ID = 'veridex-pitch-keyframes';
const KEYFRAMES_CSS = `
@keyframes vd-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.vd-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: vd-draw 620ms cubic-bezier(0,0,0.2,1) forwards; }
@media (prefers-reduced-motion: reduce) {
  .vd-line { animation: none; stroke-dashoffset: 0; }
}
`;

function useDeckStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(KEYFRAMES_ID)) return;
    const el = document.createElement('style');
    el.id = KEYFRAMES_ID;
    el.textContent = KEYFRAMES_CSS;
    document.head.appendChild(el);
  }, []);
}

/* ================================================================== *
 * Geometry
 * ================================================================== */

const PAD_X = 120;
const PAD_TOP = 68;
const HEAD_H = 24;
const BOTTOM_H = 148; // 有腳註
const BOTTOM_H_PLAIN = 112; // 無腳註

/* ================================================================== *
 * Shared parts
 * ================================================================== */

const Foot: FC<{ handoff?: string }> = ({ handoff }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 22,
        lineHeight: '24px',
        color: DIM,
      }}
    >
      <span style={{ fontWeight: 600, color: MUTED }}>{handoff ?? ''}</span>
      <span style={{ fontFamily: NUM, fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Frame: FC<{
  kicker: string;
  title: ReactNode;
  who: string;
  lead?: string;
  note?: string;
  handoff?: string;
  children: ReactNode;
}> = ({ kicker, title, who, lead, note, handoff, children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
      display: 'flex',
      flexDirection: 'column',
      padding: `${PAD_TOP}px ${PAD_X}px 0`,
    }}
  >
    <div
      style={{
        flex: 'none',
        height: HEAD_H,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 22,
        lineHeight: `${HEAD_H}px`,
        letterSpacing: '0.2em',
        color: MUTED,
        fontWeight: 600,
      }}
    >
      <span style={{ color: ACCENT_TXT }}>{kicker}</span>
      {/* 題目指引：每頁右上角必須有講者姓名 */}
      <span style={{ letterSpacing: '0.04em' }}>{who}</span>
    </div>

    <h2
      style={{
        flex: 'none',
        margin: '18px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 800,
        lineHeight: '69px',
        letterSpacing: '-0.01em',
      }}
    >
      {title}
    </h2>

    {lead ? (
      <p style={{ flex: 'none', margin: '12px 0 0', fontSize: 32, lineHeight: '46px', color: MUTED, maxWidth: 1500 }}>
        {lead}
      </p>
    ) : null}

    <div
      style={{
        flex: '1 1 auto',
        minHeight: 0,
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>

    <div style={{ flex: 'none', height: note ? BOTTOM_H : BOTTOM_H_PLAIN, position: 'relative' }}>
      {note ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 78,
            fontSize: 22,
            lineHeight: '32px',
            color: DIM,
          }}
        >
          {note}
        </div>
      ) : null}
      <Foot handoff={handoff} />
    </div>
  </div>
);

/** 左側色條 + 一句落點。tone: blue = 我們的正面內容 / amber = 問題 */
const Bar: FC<{ tone: 'blue' | 'amber'; h: number; size?: number; children: ReactNode }> = ({
  tone,
  h,
  size = 30,
  children,
}) => {
  const c = tone === 'amber' ? AMBER : ACCENT;
  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: h,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `5px solid ${c}`,
        background: tone === 'amber' ? AMBER_SOFT : BLUE_SOFT,
        padding: `0 30px`,
        fontSize: size,
        lineHeight: 1.45,
        fontWeight: 600,
        color: 'var(--osd-text)',
      }}
    >
      {children}
    </div>
  );
};

const Rule: FC<{ w?: number; tone?: string; h?: number }> = ({ w = '100%', tone = RULE, h = 1 }) => (
  <div style={{ width: w, height: h, background: tone, flex: 'none' }} />
);

/** 大數字 */
const BigNum: FC<{ n: string; unit?: string; size?: number; color?: string }> = ({
  n,
  unit,
  size = 84,
  color = ACCENT_TXT,
}) => (
  <span
    style={{
      fontFamily: NUM,
      fontSize: size,
      fontWeight: 800,
      lineHeight: `${size * 1.05}px`,
      letterSpacing: '-0.03em',
      color,
      fontVariantNumeric: 'tabular-nums',
    }}
  >
    {n}
    {unit ? (
      <span style={{ fontSize: Math.round(size * 0.32), fontWeight: 600, marginLeft: 8, letterSpacing: 0 }}>
        {unit}
      </span>
    ) : null}
  </span>
);

const eyebrow: CSSProperties = {
  fontSize: 22,
  lineHeight: '30px',
  letterSpacing: '0.14em',
  color: DIM,
  fontWeight: 600,
};

/* ================================================================== *
 * 01 · 封面 — 大標版式
 * ================================================================== */

const P01: Page = () => {
  useDeckStyles();
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        fontFamily: 'var(--osd-font-body)',
        padding: `${PAD_TOP}px ${PAD_X}px 0`,
      }}
    >
      <div
        style={{
          height: HEAD_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 22,
          lineHeight: `${HEAD_H}px`,
          letterSpacing: '0.2em',
          color: MUTED,
          fontWeight: 600,
        }}
      >
        <span style={{ color: ACCENT_TXT }}>CLC 3242P · 課程考核</span>
        <span style={{ letterSpacing: '0.04em' }}>黃浩然 · 黃羿捷</span>
      </div>

      <h1
        style={{
          margin: '186px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 800,
          lineHeight: '134px',
          letterSpacing: '-0.025em',
        }}
      >
        把「學會」
        <br />
        變成一件
        <br />
        可以被檢驗的事
      </h1>

      <p style={{ margin: '44px 0 0', fontSize: 40, lineHeight: '58px', color: MUTED }}>
        你的第一個 AI 個人課堂 —— Veridex 維學
      </p>

      <div
        style={{
          position: 'absolute',
          left: PAD_X,
          right: PAD_X,
          bottom: 76,
          borderTop: `1px solid ${RULE}`,
          paddingTop: 30,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
        }}
      >
        <div>
          <div style={{ ...eyebrow }}>呈</div>
          <div style={{ marginTop: 8, fontSize: 32, lineHeight: '46px', fontWeight: 600 }}>
            青年創業基金委員會
          </div>
        </div>
        <div>
          <div style={{ ...eyebrow }}>講者 · 日期</div>
          <div style={{ marginTop: 8, fontSize: 32, lineHeight: '46px', fontWeight: 600 }}>
            黃浩然、黃羿捷　｜　2026 · 10 · 16
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: -56,
            fontFamily: NUM,
            fontSize: 22,
            lineHeight: '24px',
            color: DIM,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

/* ================================================================== *
 * 02 · 開場 — 四拍文字遞進
 * ================================================================== */

const P02: Page = () => (
  <Frame kicker="開場" title="先問一個所有人都答得上的問題" who="黃浩然">
    <Steps>
      <Step>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', fontSize: 50, lineHeight: '68px', fontWeight: 600 }}>
          醫生用 AI 看片子，律師用 AI 查案例，工程師用 AI 寫程式。
        </div>
      </Step>
      <Step>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', fontSize: 50, lineHeight: '68px', fontWeight: 600 }}>
          但每個人要學的東西，只有自己學。
          <span style={{ color: ACCENT_TXT }}>AI 有沒有加速過一個人的學習？</span>
        </div>
      </Step>
      <Step>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', fontSize: 50, lineHeight: '68px', fontWeight: 600 }}>
          有人說有：答案快了、講解快了。／ 也有人說有害：於是不再想。
        </div>
      </Step>
    </Steps>

    <Steps>
      <Step>
        <div style={{ marginTop: 40 }}>
          <Rule />
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              lineHeight: '62px',
              fontWeight: 700,
              color: 'var(--osd-text)',
            }}
          >
            今天不討論 AI 好不好用。我們要問的是：
            <span style={{ color: ACCENT_TXT }}>一個人學會一件事，必須經過什麼？</span>
          </div>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 03 · 檢驗有效 — 雙大數字卡
 * ================================================================== */

const P03: Page = () => (
  <Frame
    kicker="問題｜學習科學"
    title="檢驗有效——這不是觀點，是兩個數字"
    who="黃浩然"
    note="Wisniewski, Zierer & Hattie (2020), Frontiers in Psychology 11:309, DOI 10.3389/fpsyg.2019.03087　｜　Roediger & Karpicke (2006), Psychological Science 17(3):249–255, DOI 10.1111/j.1467-9280.2006.01693.x"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div
        style={{
          boxSizing: 'border-box',
          border: `1px solid ${RULE}`,
          borderTop: `4px solid ${ACCENT}`,
          borderRadius: 'var(--osd-radius)',
          background: PANEL,
          padding: '32px 34px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ ...eyebrow }}>反饋的效應量（以標準差為單位）</div>
        <div style={{ marginTop: 18 }}>
          <BigNum n="d = 0.48" size={80} />
        </div>
        <div style={{ marginTop: 14, fontSize: 30, lineHeight: '44px', fontWeight: 600 }}>
          反饋對學習的整體效果
        </div>
        <div style={{ marginTop: 'auto', fontSize: 24, lineHeight: '36px', color: MUTED }}>
          Wisniewski、Zierer & Hattie (2020) 把同一問題的多份研究合併重算（這種做法叫「元分析」）。常被引用的 0.70 是 2007 年的舊值，Hattie 本人已在 2020 年下修。
        </div>
      </div>

      <div
        style={{
          boxSizing: 'border-box',
          border: `1px solid ${RULE}`,
          borderTop: `4px solid ${ACCENT}`,
          borderRadius: 'var(--osd-radius)',
          background: PANEL,
          padding: '32px 34px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ ...eyebrow }}>一週後的分數落後</div>
        <div style={{ marginTop: 18 }}>
          <BigNum n="21" unit="個百分點" size={80} />
        </div>
        <div style={{ marginTop: 14, fontSize: 30, lineHeight: '44px', fontWeight: 600 }}>
          反覆重讀 vs. 只測一次
        </div>
        <div style={{ marginTop: 'auto', fontSize: 24, lineHeight: '36px', color: MUTED }}>
          Roediger & Karpicke (2006)：反覆重讀同一份教材的人，一週後的測驗分數比只測一次的人低 21 個百分點——而他們的信心是三組裡最高的。
        </div>
      </div>
    </div>

    <div style={{ marginTop: 32 }}>
      <Bar tone="blue" h={88} size={36}>
        測得越準，學得越多。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 04 · 轉折點 — 左右對比兩欄
 * ================================================================== */

const P04: Page = () => (
  <Frame
    kicker="問題｜人的盲點"
    title="你判斷不了自己學沒學會"
    who="黃浩然"
    note="Koriat (1997), Journal of Experimental Psychology 23(5)　｜　Dunlosky & Rawson (2012), Learning and Instruction 22(6), DOI 10.1016/j.learninstruc.2011.08.003　｜　Reines & Camosy (2013), PLoS ONE 8(12):e83777"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div
        style={{
          boxSizing: 'border-box',
          border: `1px solid ${AMBER_LINE}`,
          borderLeft: `5px solid ${AMBER}`,
          borderRadius: 'var(--osd-radius)',
          background: PANEL,
          padding: '30px 32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ ...eyebrow, color: AMBER_TXT }}>人用的訊號</div>
        <div style={{ marginTop: 12, fontSize: 52, lineHeight: '64px', fontWeight: 800 }}>順暢感</div>
        <div style={{ marginTop: 18, fontSize: 26, lineHeight: '42px', color: MUTED }}>
          「看懂的時候那種順暢感」——而不是真實測試。心理學稱為 cue-utilization：判斷時只用到感覺，不用測試（Koriat, 1997）。
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Rule />
          <div style={{ marginTop: 18, fontSize: 25, lineHeight: '38px', color: AMBER_TXT, fontWeight: 700 }}>
            而且會造成實害：過度自信真的會拉低成績（Dunlosky &amp; Rawson 2012，因果研究）。
          </div>
        </div>
      </div>

      <div
        style={{
          boxSizing: 'border-box',
          border: `1px solid ${BLUE_LINE}`,
          borderLeft: `5px solid ${ACCENT}`,
          borderRadius: 'var(--osd-radius)',
          background: PANEL,
          padding: '30px 32px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>唯一可靠的訊號</div>
        <div style={{ marginTop: 12, fontSize: 52, lineHeight: '64px', fontWeight: 800 }}>真實測試</div>
        <div style={{ marginTop: 18, fontSize: 26, lineHeight: '42px', color: MUTED }}>
          做一道題，答對才算。它不依賴感覺，也不依賴勇氣——所以它不能由學生自己執行。
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Rule />
          <div style={{ marginTop: 18, fontSize: 25, lineHeight: '38px', color: ACCENT_TXT, fontWeight: 700 }}>
            它可以重複、可以計分、可以留下記錄——這三件事，人自己做不到。
          </div>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 28 }}>
      <Bar tone="blue" h={92} size={32}>
        <span style={{ color: AMBER_TXT }}>判斷的人必須站在學生之外</span>
        ——所以在學生端，這件事只能由系統來做。
      </Bar>
    </div>
    <div style={{ marginTop: 16, display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 23, lineHeight: '32px', color: MUTED }}>一致性：每次標準相同</div>
      <div style={{ fontSize: 23, lineHeight: '32px', color: MUTED }}>可規模：幾百人同時驗收</div>
      <div style={{ fontSize: 23, lineHeight: '32px', color: MUTED }}>24 小時：隨時能重測</div>
    </div>
    <div style={{ marginTop: 14, fontSize: 23, lineHeight: '32px', color: DIM, textAlign: 'center' }}>
      這個落差在醫學一年級的實測裡同樣看得到：自評越高，成績越低（Reines &amp; Camosy 2013, PLoS ONE）。
    </div>
  </Frame>
);

/* ================================================================== *
 * 05 · 唯一的數據圖頁 — 橫向條形圖
 * ================================================================== */

const BarRow: FC<{ label: string; pct: string; w: number; last?: boolean }> = ({ label, pct, w, last }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 48, marginTop: last ? 26 : 12 }}>
    <div style={{ width: 340, flex: 'none', fontSize: 26, lineHeight: '36px', color: 'var(--osd-text)' }}>{label}</div>
    <div style={{ flex: 'none', position: 'relative', width: w, height: 34, background: ACCENT, borderRadius: 3 }} />
    <div
      style={{
        flex: 'none',
        width: 110,
        fontFamily: NUM,
        fontSize: 28,
        lineHeight: '34px',
        fontWeight: 700,
        color: 'var(--osd-text)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {pct}
    </div>
  </div>
);

const GhostRow: FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', height: 48, marginTop: 12 }}>
    <div style={{ width: 340, flex: 'none', fontSize: 26, lineHeight: '36px', color: AMBER_TXT, fontWeight: 700 }}>
      檢驗我到底學會沒有
    </div>
    <div
      style={{
        flex: 'none',
        position: 'relative',
        width: 220,
        height: 34,
        border: `2px dashed ${AMBER_LINE}`,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        fontSize: 22,
        lineHeight: '30px',
        color: AMBER_TXT,
        fontWeight: 600,
      }}
    >
      調查未列此項
    </div>
  </div>
);

const P05: Page = () => (
  <Frame
    kicker="問題｜學生現狀"
    title={
      <>
        學生已經在用 AI——但這份問卷裡<span style={{ color: AMBER_TXT }}>沒有一項是檢驗自己</span>
      </>
    }
    who="黃浩然"
    note="HEPI (2026), Student Generative AI Survey, Report 199, n = 1,054，英國全日制本科生樣本。"
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 24, lineHeight: '34px', color: MUTED }}>
        問：學生用生成式 AI 做什麼？（可複選，所以加起來超過 100%）
      </div>
      <div style={{ fontSize: 24, lineHeight: '34px', color: MUTED, fontFamily: NUM }}>
        95% 用過 AI　·　94% 用於課業
      </div>
    </div>

    <div style={{ marginTop: 14 }}>
      <BarRow label="解釋概念" pct="58%" w={1180} />
      <BarRow label="總結材料" pct="47%" w={956} />
      <BarRow label="提供研究思路" pct="40%" w={814} />
      <BarRow label="組織思路" pct="39%" w={793} />
      <BarRow label="聯網搜索" pct="25%" w={508} />
      <BarRow label="生成文本" pct="25%" w={508} />
      <BarRow label="直接把 AI 文字放進作業" pct="11%" w={224} />
      <GhostRow />
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 26 }}>
      <Bar tone="amber" h={108} size={28}>
        <div style={{ fontSize: 24, lineHeight: '34px', color: MUTED, fontWeight: 500 }}>
          排在最前面的全是「解釋、總結、思路、組織」。
        </div>
        <div style={{ marginTop: 6, fontSize: 32, lineHeight: '44px', fontWeight: 700 }}>
          <span style={{ color: AMBER_TXT }}>這份問卷裡，AI 是拿來解釋的；沒有人問過它拿來考自己。</span>
        </div>
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 06 · 三種土辦法 — 三欄上下分層卡
 * ================================================================== */

const Habit: FC<{ no: string; name: string; how: string; cost: string }> = ({ no, name, how, cost }) => (
  <div
    style={{
      height: '100%',
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ ...eyebrow, color: ACCENT_TXT }}>{no}</div>
    <div style={{ marginTop: 8, fontSize: 40, lineHeight: '50px', fontWeight: 800 }}>{name}</div>
    <div style={{ marginTop: 12, fontSize: 24, lineHeight: '36px', color: DIM }}>{how}</div>
    <div style={{ marginTop: 'auto' }}>
      <Rule />
      <div style={{ marginTop: 18, ...eyebrow, color: AMBER_TXT }}>代價</div>
      <div style={{ marginTop: 8, fontSize: 26, lineHeight: '42px', fontWeight: 600, color: AMBER_TXT }}>{cost}</div>
    </div>
  </div>
);

const P06: Page = () => (
  <Frame
    kicker="問題｜學完之後"
    title="學完之後那一關，現在沒有人認真做"
    who="黃浩然"
    lead="我們看過的做法：學生判斷自己有沒有學會，主要是這四種。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, flex: '1 1 auto', minHeight: 0 }}>
      <Habit no="做法一" name="自己判斷" how="看完之後問自己一句「我懂了嗎」。" cost="靠順暢感，系統性高估。" />
      <Habit no="做法二" name="問同學" how="找同學互相出題、互相問。" cost="要排隊、要看關係、要欠人情。" />
      <Habit no="做法三" name="翻答案對照" how="做完題之後翻答案對一遍。" cost="對上了就當學會了——欺騙自己。" />
      <Habit no="做法四" name="買題庫自測" how="買或找現成的題庫，課後刷題。" cost="題目跟你的課不對焦，錯了也不知道錯在哪一步。" />
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 32 }}>
      <Bar tone="amber" h={92} size={32}>
        四種都湊合能用，但沒有一種真的在檢驗。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 07 · 競品 — 對照表（局限欄最寬）
 * ================================================================== */

const cellHead: CSSProperties = {
  fontSize: 22,
  lineHeight: '30px',
  letterSpacing: '0.1em',
  color: DIM,
  fontWeight: 700,
  textAlign: 'left',
};

const cell: CSSProperties = { fontSize: 24, lineHeight: '34px', color: 'var(--osd-text)' };

const cellDim: CSSProperties = { ...cell, color: MUTED };

const cellAmber: CSSProperties = { ...cell, color: AMBER_TXT, fontWeight: 600 };

const Rival: FC<{
  name: string;
  stage: string;
  best?: boolean;
  price: string;
  limit: string;
  limitAmber?: boolean;
}> = ({ name, stage, best, price, limit, limitAmber }) => (
  <div
    style={{
      height: 128,
      display: 'grid',
      gridTemplateColumns: '340px 300px 360px 1fr',
      borderBottom: `1px solid ${RULE}`,
    }}
  >
    <div style={{ ...cell, fontWeight: 700, display: 'flex', alignItems: 'center', paddingRight: 20 }}>{name}</div>
    <div style={{ ...cellDim, display: 'flex', alignItems: 'center', paddingRight: 20 }}>
      {stage}
      {best ? <span style={{ color: ACCENT_TXT, fontWeight: 700, marginLeft: 8 }}>最完整</span> : null}
    </div>
    <div style={{ ...cellDim, display: 'flex', alignItems: 'center', paddingRight: 24 }}>{price}</div>
    <div style={{ ...(limitAmber ? cellAmber : cell), display: 'flex', alignItems: 'center' }}>{limit}</div>
  </div>
);

const P07: Page = () => (
  <Frame
    kicker="問題｜競品現狀"
    title="行業產品做到了哪一步"
    who="黃浩然"
    lead="先承認一件事：對手做得很紮實。"
  >
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '340px 300px 360px 1fr', height: 48 }}>
        <div style={{ ...cellHead, display: 'flex', alignItems: 'flex-end', paddingRight: 20 }}>產品</div>
        <div style={{ ...cellHead, display: 'flex', alignItems: 'flex-end', paddingRight: 20 }}>做到哪一步</div>
        <div style={{ ...cellHead, display: 'flex', alignItems: 'flex-end', paddingRight: 24 }}>定價（2026 公開）</div>
        <div style={{ ...cellHead, display: 'flex', alignItems: 'flex-end' }}>具體局限</div>
      </div>

      <Rival
        name="Coursera / DeepLearning.AI"
        stage="學 + 證書"
        price="US$59 / 月（DL.AI 未能核實）"
        limit="證書是「上過課」的憑證，不是掌握度評估。"
      />
      <Rival
        name="Hyperknow"
        stage="學 + 練"
        price="US$0 / 18 / 50"
        limit="檔位命名未公開，無法對照其能力邊界。"
      />
      <Rival
        name="OpenMAIC（清華 MAIC 團隊）"
        stage="開源課堂框架"
        price="免費開源（MIT 授權）"
        limit="社群 issue #1712 回報選項重複導致判分錯誤，修復 PR 已提交未合併。"
        limitAmber
      />
      <Rival
        name="StudyFetch / Quizlet"
        stage="學 → 練 → 檢驗"
        best
        price="未能核實"
        limit="公開資料裡看不到它說明「你為什麼錯」；Quizlet 已有 1,123,682 條評分。"
        limitAmber
      />
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 28 }}>
      <Bar tone="amber" h={84} size={28}>
        做得最完整的是 StudyFetch 與 Quizlet——但公開資料裡看不到它們說明「你為什麼錯」。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 08 · 問題定位 — 上藍下琥珀兩區
 * ================================================================== */

const Full: FC<{ tone: 'blue' | 'amber'; label: string; h: number; children: ReactNode }> = ({
  tone,
  label,
  h,
  children,
}) => {
  const c = tone === 'amber' ? AMBER_TXT : ACCENT_TXT;
  return (
    <div
      style={{
        height: h,
        boxSizing: 'border-box',
        border: `1px solid ${tone === 'amber' ? AMBER_LINE : BLUE_LINE}`,
        borderRadius: 'var(--osd-radius)',
        background: tone === 'amber' ? AMBER_SOFT : BLUE_SOFT,
        padding: '26px 30px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ ...eyebrow, color: c }}>{label}</div>
      <div style={{ marginTop: 16, flex: '1 1 auto' }}>{children}</div>
    </div>
  );
};

const GapQ: FC<{ n: string; q: string; d: string }> = ({ n, q, d }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flex: '1 1 0', minWidth: 0 }}>
    <div
      style={{
        flex: 'none',
        width: 42,
        height: 42,
        borderRadius: 4,
        background: AMBER,
        color: '#FFF',
        fontFamily: NUM,
        fontSize: 24,
        lineHeight: '42px',
        textAlign: 'center',
        fontWeight: 700,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontSize: 30, lineHeight: '42px', fontWeight: 700 }}>{q}</div>
      <div style={{ fontSize: 24, lineHeight: '34px', color: MUTED }}>{d}</div>
    </div>
  </div>
);

const P08: Page = () => (
  <Frame
    kicker="問題｜問題定位"
    title={
      <>
        檢驗<span style={{ color: ACCENT_TXT }}>不是空白</span>，是<span style={{ color: AMBER_TXT }}>不夠準</span>
      </>
    }
    who="黃浩然"
    handoff="交接 · 問題講完了，下面講我們怎麼補這一步。"
    note="「公開資料」＝2026 年 9–10 月查閱的產品官網、開源倉庫與公開 issue 記錄；標「未能核實」者當時取不到公開資料。"
  >
    <Full tone="blue" label="這三個位置，早就擠滿了" h={290}>
      <div style={{ display: 'flex', gap: 24 }}>
        <div
          style={{
            width: 520,
            height: 82,
            boxSizing: 'border-box',
            background: PANEL,
            border: `1px solid ${BLUE_LINE}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 26,
            fontSize: 30,
            lineHeight: '40px',
            fontWeight: 700,
          }}
        >
          一　找資料
        </div>
        <div
          style={{
            width: 520,
            height: 82,
            boxSizing: 'border-box',
            background: PANEL,
            border: `1px solid ${BLUE_LINE}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 26,
            fontSize: 30,
            lineHeight: '40px',
            fontWeight: 700,
          }}
        >
          二　學與解釋
        </div>
        <div
          style={{
            width: 520,
            height: 82,
            boxSizing: 'border-box',
            background: PANEL,
            border: `1px solid ${BLUE_LINE}`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 26,
            fontSize: 30,
            lineHeight: '40px',
            fontWeight: 700,
          }}
        >
          三　檢驗（判對錯）
        </div>
      </div>
      <div style={{ marginTop: 20, fontSize: 28, lineHeight: '40px', color: MUTED }}>
        這就是一個人學會一件事必須經過的三步。前兩步早就擠滿了；第三步也擠滿了——只是在我們查得到的公開說明裡，都停在判對錯。
      </div>
    </Full>

    <div style={{ marginTop: 26 }}>
      <Full tone="amber" label="公開資料裡找不到任何一家說明這三件事" h={268}>
        <div style={{ display: 'flex', gap: 34, alignItems: 'flex-start', flex: '1 1 auto' }}>
          <GapQ n="1" q="你為什麼錯？" d="要能歸因到個人，不只是判這題對不對。" />
          <GapQ n="2" q="三十天後還剩多少？" d="排複習是 SRS 已經在做的；用同一套驗收反覆量你還剩多少，公開說明裡看不到。" />
          <GapQ n="3" q="開放題怎麼判？" d="不是選擇題的題目，誰來打分、怎麼打分。" />
        </div>
      </Full>
    </div>

    <div style={{ marginTop: 'auto' }}>
      <Bar tone="blue" h={92} size={30}>
        我們要做的不是多一種測驗，是把最後這一步做準。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 09 · 最小閉環 — 雙泳道流程圖
 * ================================================================== */

const LaneBox: FC<{ x: number; y: number; n: string; text: string }> = ({ x, y, n, text }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 456,
      height: 180,
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderTop: `4px solid ${ACCENT}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '22px 24px',
    }}
  >
    <div style={{ fontFamily: NUM, fontSize: 24, lineHeight: '32px', color: ACCENT_TXT, fontWeight: 700 }}>{n}</div>
    <div style={{ marginTop: 8, fontSize: 26, lineHeight: '42px', fontWeight: 600 }}>{text}</div>
  </div>
);

const LaneLabel: FC<{ y: number; name: string; role: string }> = ({ y, name, role }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: y,
      width: 132,
      height: 180,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRight: `1px solid ${RULE}`,
    }}
  >
    <div style={{ fontSize: 38, lineHeight: '48px', fontWeight: 800, color: ACCENT_TXT }}>{name}</div>
    <div style={{ fontSize: 22, lineHeight: '32px', color: DIM }}>{role}</div>
  </div>
);

const P09: Page = () => {
  useDeckStyles();
  return (
    <Frame kicker="方案｜一次學習" title="一次學習裡，人和 AI 各做什麼" who="黃羿捷">
      <div style={{ position: 'relative', height: 500, flex: 'none' }}>
        <LaneLabel y={20} name="人" role="學的人" />
        <LaneLabel y={280} name="AI" role="三個角色" />

        <div style={{ position: 'absolute', left: 132, top: 0, width: 1548, height: 500 }}>
          <LaneBox x={0} y={20} n="人 ①" text="丟一個主題進來" />
          <LaneBox x={546} y={20} n="人 ②" text="做那一道題" />
          <LaneBox x={1092} y={20} n="人 ③" text="看結果" />

          <LaneBox x={0} y={280} n="AI ①" text="拆成章節與知識點" />
          <LaneBox x={546} y={280} n="AI ②" text="1 對 1 講解，隨時可打斷" />
          <LaneBox x={1092} y={280} n="AI ③" text="出題、判卷、指出你錯在哪一步" />

          <svg
            width={1548}
            height={500}
            viewBox="0 0 1548 500"
            style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
          >
            <g stroke={ACCENT} strokeWidth={2} fill="none" strokeLinecap="round">
              <path className="vd-line" pathLength={1} d="M 462 110 L 534 110" style={{ animationDelay: '80ms' }} />
              <path className="vd-line" pathLength={1} d="M 1008 110 L 1080 110" style={{ animationDelay: '160ms' }} />
              <path className="vd-line" pathLength={1} d="M 462 370 L 534 370" style={{ animationDelay: '80ms' }} />
              <path className="vd-line" pathLength={1} d="M 1008 370 L 1080 370" style={{ animationDelay: '160ms' }} />
              <path className="vd-line" pathLength={1} d="M 228 208 L 228 262" style={{ animationDelay: '240ms' }} />
              <path className="vd-line" pathLength={1} d="M 774 272 L 774 218" style={{ animationDelay: '320ms' }} />
              <path className="vd-line" pathLength={1} d="M 1320 272 L 1320 218" style={{ animationDelay: '400ms' }} />
            </g>
            <g fill={ACCENT}>
              <polygon points="546,110 534,101 534,119" />
              <polygon points="1092,110 1080,101 1080,119" />
              <polygon points="546,370 534,361 534,379" />
              <polygon points="1092,370 1080,361 1080,379" />
              <polygon points="228,280 219,268 237,268" />
              <polygon points="774,200 765,212 783,212" />
              <polygon points="1320,200 1311,212 1329,212" />
            </g>
          </svg>
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          height: 150,
          boxSizing: 'border-box',
          border: `1px solid ${RULE}`,
          borderRadius: 'var(--osd-radius)',
          background: PANEL,
          padding: '24px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 22,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              flex: 'none',
              width: 150,
              height: 50,
              borderRadius: 6,
              background: BLUE_SOFT,
              border: `1px solid ${BLUE_LINE}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              lineHeight: '34px',
              fontWeight: 700,
              color: ACCENT_TXT,
            }}
          >
            過了
          </div>
          <div style={{ fontSize: 30, lineHeight: '50px', fontWeight: 600 }}>開下一節。</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              flex: 'none',
              width: 150,
              height: 50,
              borderRadius: 6,
              background: BLUE_SOFT,
              border: `1px solid ${BLUE_LINE}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              lineHeight: '34px',
              fontWeight: 700,
              color: ACCENT_TXT,
            }}
          >
            沒過
          </div>
          <div style={{ fontSize: 30, lineHeight: '50px', fontWeight: 600 }}>
            找出你真正不會的那一點，<span style={{ color: ACCENT_TXT }}>只補那一點</span>。
          </div>
        </div>
      </div>
    </Frame>
  );
};

/* ================================================================== *
 * 10 · AI 的角色 — 三欄角色卡（它做 / 人做）
 * ================================================================== */

const Role: FC<{ name: string; gloss: string; ai: string; human: string }> = ({ name, gloss, ai, human }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        fontSize: 34,
        lineHeight: '46px',
        fontWeight: 800,
        color: ACCENT_TXT,
      }}
    >
      {name}
    </div>
    <div style={{ marginTop: 4, fontSize: 24, lineHeight: '36px', color: DIM }}>{gloss}</div>
    <div style={{ marginTop: 20 }}>
      <Rule tone={BLUE_LINE} h={2} />
    </div>
    <div style={{ marginTop: 22, ...eyebrow, color: ACCENT_TXT }}>它做</div>
    <div style={{ marginTop: 6, fontSize: 26, lineHeight: '42px', fontWeight: 600 }}>{ai}</div>
    <div style={{ marginTop: 'auto' }}>
      <Rule />
      <div style={{ marginTop: 20, ...eyebrow }}>人做</div>
      <div style={{ marginTop: 6, fontSize: 26, lineHeight: '42px', color: MUTED }}>{human}</div>
    </div>
  </div>
);

const P10: Page = () => (
  <Frame
    kicker="方案｜AI 的角色"
    title="AI 在這裡扮演三個角色"
    who="黃羿捷"
    lead="Agent＝會自己判斷下一步、並自動呼叫工具的 AI 程式。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, flex: '1 1 auto', minHeight: 0 }}>
      <Role
        name="成課 Agent"
        gloss="把材料變成一門課"
        ai="把資料或一個主題，拆成章節與知識點"
        human="決定學什麼"
      />
      <Role
        name="授課 Agent"
        gloss="一對一講解"
        ai="講解、追問、換一種講法"
        human="隨時插嘴打斷"
      />
      <Role
        name="驗收 Agent"
        gloss="出題與判卷"
        ai="出題、判卷、指出你錯在哪一步與為什麼"
        human="看結果，決定要不要繼續"
      />
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="blue" h={84} size={30}>
        三個角色各做一件事，串起來就是一次完整的學習。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 11 · 成課三種方式 — 編號行 + 原型佔位
 * ================================================================== */

const Entry: FC<{ n: string; name: string; desc: string }> = ({ n, name, desc }) => (
  <div
    style={{
      height: 140,
      display: 'flex',
      gap: 24,
      alignItems: 'center',
      borderTop: `1px solid ${RULE}`,
    }}
  >
    <div
      style={{
        flex: 'none',
        width: 66,
        height: 66,
        borderRadius: 6,
        background: BLUE_SOFT,
        border: `1px solid ${BLUE_LINE}`,
        fontFamily: NUM,
        fontSize: 30,
        lineHeight: '64px',
        textAlign: 'center',
        fontWeight: 800,
        color: ACCENT_TXT,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontSize: 36, lineHeight: '48px', fontWeight: 700 }}>{name}</div>
      <div style={{ marginTop: 4, fontSize: 25, lineHeight: '36px', color: MUTED }}>{desc}</div>
    </div>
  </div>
);

const P11: Page = () => (
  <Frame
    kicker="方案｜成課"
    title="三種方式，把東西變成一門課"
    who="黃羿捷"
    lead="成課 Agent 現在就有三個入口。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '940px 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div>
        <Entry n="1" name="說一句話" desc="「把中央極限定理講清楚。」" />
        <Entry n="2" name="傳一份資料" desc="講義、筆記、作業，都可以直接丟進去。" />
        <Entry n="3" name="同步你已有的" desc="Notion、Google Drive、學校的課程系統。" />
      </div>
      <div>
        <ImagePlaceholder
          hint="成課 Agent 原型畫面：一份講義 → 課程目錄"
          width={700}
          height={420}
          style={{ borderRadius: 10, background: PANEL, border: `1px dashed ${RULE}` }}
        />
        <div style={{ marginTop: 10, fontSize: 22, lineHeight: '30px', color: DIM }}>
          原型截圖待補。
        </div>
      </div>
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="amber" h={84} size={30}>
        這一頁我們不比任何人強——AI 已經能做了。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 12 · 驗收三種形式 — 三欄 + 底部橫帶
 * ================================================================== */

const Form: FC<{ name: string; gloss: string; catch: string }> = ({ name, gloss, catch: caught }) => (
  <div
    style={{
      height: '100%',
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontSize: 38, lineHeight: '50px', fontWeight: 800, color: ACCENT_TXT }}>{name}</div>
    <div style={{ marginTop: 8, fontSize: 24, lineHeight: '36px', color: MUTED }}>{gloss}</div>
    <div style={{ marginTop: 'auto' }}>
      <Rule tone={AMBER_LINE} h={2} />
      <div style={{ marginTop: 18, ...eyebrow, color: AMBER_TXT }}>抓的是哪一種「假裝會了」</div>
      <div style={{ marginTop: 8, fontSize: 28, lineHeight: '42px', fontWeight: 700, color: AMBER_TXT }}>{caught}</div>
    </div>
  </div>
);

const P12: Page = () => (
  <Frame
    kicker="方案｜驗收"
    title="三種驗收，各抓一種「假裝會了」"
    who="黃羿捷"
    lead="驗收 Agent 出題、判卷，並指出你錯在哪一步。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, flex: '1 1 auto', minHeight: 0 }}>
      <Form
        name="講出來"
        gloss="用自己的話講清楚，講給一個指定的人聽。"
        catch="你只是背得很順"
      />
      <Form
        name="練一遍"
        gloss="課後練習：過一遍，反饋帶解釋。"
        catch="記得住，但調不出來"
      />
      <Form
        name="做出來"
        gloss="你自己做的項目，AI 按事先寫好的標準打分。"
        catch="原題會做，換情境就廢"
      />
    </div>

    <div style={{ marginTop: 36 }}>
      <div
        style={{
          height: 116,
          boxSizing: 'border-box',
          border: `1px solid ${BLUE_LINE}`,
          borderRadius: 'var(--osd-radius)',
          background: BLUE_SOFT,
          padding: '0 30px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            flex: 'none',
            fontSize: 30,
            lineHeight: '40px',
            fontWeight: 800,
            color: ACCENT_TXT,
          }}
        >
          第四種形式
        </div>
        <div style={{ fontSize: 28, lineHeight: '44px', fontWeight: 600 }}>
          30 天後再來一次（延遲軸）：同一套驗收，隔一段時間重跑一次，看還剩多少。
        </div>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 13 · 追根溯源 — 垂直階梯圖
 * ================================================================== */

const Rung: FC<{ x: number; y: number; w: number; name: string; meta: string; blind?: boolean }> = ({
  x,
  y,
  w,
  name,
  meta,
  blind,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: 96,
      boxSizing: 'border-box',
      border: `1px solid ${blind ? AMBER_LINE : RULE}`,
      borderLeft: `5px solid ${blind ? AMBER : ACCENT}`,
      borderRadius: 8,
      background: blind ? AMBER_SOFT : PANEL,
      padding: '0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 30, lineHeight: '40px', fontWeight: 700, color: blind ? AMBER_TXT : 'var(--osd-text)' }}>
      {name}
    </div>
    <div style={{ fontSize: 24, lineHeight: '34px', color: blind ? AMBER_TXT : DIM }}>{meta}</div>
  </div>
);

const Chevron: FC<{ top: number }> = ({ top }) => (
  <svg
    width={22}
    height={18}
    viewBox="0 0 22 18"
    style={{ position: 'absolute', left: 118, top, pointerEvents: 'none' }}
  >
    <polygon points="11,17 1,1 21,1" fill={RULE} />
  </svg>
);

const P13: Page = () => {
  useDeckStyles();
  return (
    <Frame
      kicker="方案｜驗收"
      title="沒驗過，就往回找"
      who="黃羿捷"
      lead="前置知識＝學這題必須先會的東西。你答錯的不是這一題，是往下那幾題。"
      note="遞歸式前置知識追蹤（RPKT, Recursive Prerequisite Knowledge Tracing），IEEE FMLDS 2025。"
    >
      <div style={{ position: 'relative', height: 500, flex: '1 1 auto', minHeight: 0 }}>
        <Rung x={0} y={0} w={1180} name="第 3 章 · 中央極限定理" meta="你答錯的題在這裡" />
        <Rung x={80} y={128} w={1100} name="前置 · 樣本平均" meta="往下追一層" />
        <Rung x={160} y={256} w={1020} name="前置 · 期望值與變異數" meta="再往下" />
        <Rung x={240} y={384} w={940} name="真正的盲點 · 條件機率" meta="你從沒真正學會過" blind />

        <Chevron top={100} />
        <Chevron top={228} />
        <Chevron top={356} />

        <svg
          width={80}
          height={24}
          viewBox="0 0 80 24"
          style={{ position: 'absolute', left: 1186, top: 420, pointerEvents: 'none' }}
        >
          <path className="vd-line" pathLength={1} d="M 0 12 L 62 12" stroke={AMBER} strokeWidth={2} fill="none" />
          <polygon points="78,12 64,5 64,19" fill={AMBER} />
        </svg>

        <div
          style={{
            position: 'absolute',
            left: 1250,
            width: 430,
            height: 480,
            boxSizing: 'border-box',
            border: `1px solid ${BLUE_LINE}`,
            borderRadius: 8,
            background: BLUE_SOFT,
            padding: '0 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ ...eyebrow, color: ACCENT_TXT }}>只補這裡</div>
          <div style={{ marginTop: 10, fontSize: 44, lineHeight: '56px', fontWeight: 800, color: ACCENT_TXT }}>
            條件機率
          </div>
          <div style={{ marginTop: 18 }}>
            <Rule tone={BLUE_LINE} h={2} />
          </div>
          <div style={{ marginTop: 18, fontSize: 24, lineHeight: '36px', color: MUTED }}>
            這一門課的其他部分，全部跳過。
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <Bar tone="blue" h={88} size={30}>
          驗收不是給一個分數，是指出你真正卡住的那一點。
        </Bar>
      </div>
    </Frame>
  );
};

/* ================================================================== *
 * 14 · 認知負荷 — 左右對照表
 * ================================================================== */

const Load: FC<{ mine: string; ours: string }> = ({ mine, ours }) => (
  <div
    style={{
      height: 124,
      display: 'grid',
      gridTemplateColumns: '700px 80px 1fr',
      alignItems: 'center',
      borderTop: `1px solid ${RULE}`,
    }}
  >
    <div style={{ fontSize: 30, lineHeight: '44px', color: 'var(--osd-text)', fontWeight: 600, paddingRight: 24 }}>
      {mine}
    </div>
    <div style={{ fontSize: 30, lineHeight: '44px', color: ACCENT_TXT, textAlign: 'center', fontWeight: 700 }}>→</div>
    <div style={{ fontSize: 30, lineHeight: '44px', color: ACCENT_TXT, fontWeight: 700 }}>{ours}</div>
  </div>
);

const P14: Page = () => (
  <Frame
    kicker="方案｜設計原則"
    title="學習之外的活，不該由學生扛"
    who="黃羿捷"
    lead="我們借用認知負荷理論的思路：腦的容量有限，別讓它去管雜事。"
    note="Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285."
  >
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '700px 80px 1fr',
          height: 48,
          alignItems: 'flex-end',
        }}
      >
        <div style={{ ...cellHead, paddingRight: 24 }}>學生今天要自己做</div>
        <div style={{ ...cellHead, textAlign: 'center' }}>　</div>
        <div style={{ ...cellHead, color: ACCENT_TXT }}>Veridex 接管</div>
      </div>
      <Load mine="決定該學什麼" ours="按你的資料排出下一步" />
      <Load mine="判斷自己有沒有聽懂" ours="驗收 Agent 判定，代替自我判斷" />
      <Load mine="記住什麼時候該複習" ours="用驗收結果安排複習時機" />
      <Load mine="自己排進日程" ours="自動排" />
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="blue" h={88} size={30}>
        這些活全部由系統做，學生只需要做一件事：學。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 15 · 三個數字 — 大數字卡 + 琥珀承諾條
 * ================================================================== */

const Promise: FC<{ kind: string; n: string; name: string; gloss: string }> = ({ kind, n, name, gloss }) => (
  <div
    style={{
      height: '100%',
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '30px 32px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ ...eyebrow }}>{kind}</div>
    <div style={{ marginTop: 20 }}>
      <BigNum n={n} size={88} />
    </div>
    <div style={{ marginTop: 16, fontSize: 32, lineHeight: '46px', fontWeight: 700 }}>{name}</div>
    <div style={{ marginTop: 'auto', fontSize: 24, lineHeight: '36px', color: MUTED }}>{gloss}</div>
  </div>
);

const P15: Page = () => (
  <Frame
    kicker="方案｜試點承諾"
    title="請用這三個數字判斷我們做不做得成"
    who="黃羿捷"
    lead="三個月內簽約並備課；第 6 月封閉測試後，交出第一份數字。"
    handoff="交接 · 方案講完了，下面說我們是誰、要什麼。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, flex: '1 1 auto', minHeight: 0 }}>
      <Promise kind="行為" n="≥ 50%" name="14 天任務完成率" gloss="教師指派的學習任務；與試點教師共同議定。" />
      <Promise kind="成果" n="≥ 20%" name="學習前後測差異" gloss="同一批學員各測一次；與試點教師共同議定。" />
      <Promise kind="延遲" n="≥ 70%" name="30 天後回訪" gloss="同一套驗收重跑一次；與試點教師共同議定。" />
    </div>

    <div style={{ marginTop: 32 }}>
      <Bar tone="amber" h={140} size={28}>
        <div style={{ fontWeight: 600 }}>
          這些分不由我們打——試點學校的授課教師出題、評分；我們只出系統、記過程、出報告。
        </div>
        <div style={{ marginTop: 6, fontWeight: 700, color: AMBER_TXT }}>這是承諾值，不是已經測出來的結果。</div>
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 16 · 團隊與資料 — 左右分欄
 * ================================================================== */

const Member: FC<{ name: string; role: string }> = ({ name, role }) => (
  <div
    style={{
      height: '100%',
      minHeight: 200,
      flex: '1 1 auto',
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontSize: 34, lineHeight: '46px', fontWeight: 800 }}>{name}</div>
    <div style={{ marginTop: 4, fontSize: 24, lineHeight: '34px', color: DIM }}>{role}</div>
    <div
      style={{
        marginTop: 'auto',
        border: `2px dashed ${AMBER_LINE}`,
        borderRadius: 6,
        background: AMBER_SOFT,
        padding: '10px 16px',
        fontSize: 24,
        lineHeight: '34px',
        color: AMBER_TXT,
        fontWeight: 700,
      }}
    >
      已交付物：［待填］
    </div>
  </div>
);

const Guard: FC<{ n: string; t: string; d: string }> = ({ n, t, d }) => (
  <div
    style={{
      height: 100,
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      borderTop: `1px solid ${RULE}`,
    }}
  >
    <div
      style={{
        flex: 'none',
        width: 44,
        height: 44,
        borderRadius: 4,
        background: BLUE_SOFT,
        border: `1px solid ${BLUE_LINE}`,
        fontFamily: NUM,
        fontSize: 24,
        lineHeight: '42px',
        textAlign: 'center',
        fontWeight: 800,
        color: ACCENT_TXT,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontSize: 30, lineHeight: '42px', fontWeight: 700, color: ACCENT_TXT }}>{t}</div>
      <div style={{ fontSize: 23, lineHeight: '32px', color: DIM }}>{d}</div>
    </div>
  </div>
);

const P16: Page = () => (
  <Frame
    kicker="收束｜為什麼信你"
    title="憑什麼信你"
    who="黃浩然"
    lead="兩件事：我們是誰，以及您的資料在誰手上。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div>
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>團隊</div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 24, flex: '1 1 auto', minHeight: 0 }}>
          <Member name="黃浩然" role="學習痛點定義、訪談教師與學生、課程介面、對外簡報" />
          <Member name="黃羿捷" role="模型與提示工程、驗收引擎、校園試點部署、私隱安全" />
        </div>
      </div>
      <div>
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>資料保管 · 四條</div>
        <div style={{ marginTop: 14 }}>
          <Guard n="1" t="資料留在用戶所屬司法區" d="香港用戶留港、內地用戶留內地；模型自託管，不經境外 API。" />
          <Guard n="2" t="各校資料分隔" d="學校之間的資料互相不可見。" />
          <Guard n="3" t="令牌有時效" d="存取權限自動到期，不長期有效。" />
          <Guard n="4" t="導出留審計" d="誰匯出什麼、什麼時候，全部留記錄。" />
        </div>
      </div>
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="blue" h={84} size={30}>
        資料規則寫進合約，不是寫在網站上。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 17 · 面向人群 — 左右對照
 * ================================================================== */

const Who: FC<{ t: string }> = ({ t }) => (
  <div
    style={{
      height: 120,
      boxSizing: 'border-box',
      border: `1px solid ${BLUE_LINE}`,
      borderRadius: 8,
      background: PANEL,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 28,
      fontSize: 30,
      lineHeight: '42px',
      fontWeight: 600,
    }}
  >
    {t}
  </div>
);

const Pay: FC<{ t: string }> = ({ t }) => (
  <div
    style={{
      height: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      borderTop: `1px solid ${BLUE_LINE}`,
    }}
  >
    <div
      style={{
        flex: 'none',
        width: 34,
        height: 34,
        borderRadius: 17,
        background: ACCENT,
        color: '#FFF',
        fontSize: 22,
        lineHeight: '34px',
        textAlign: 'center',
        fontWeight: 700,
      }}
    >
      ✓
    </div>
    <div style={{ fontSize: 30, lineHeight: '42px', fontWeight: 600 }}>{t}</div>
  </div>
);

const P17: Page = () => (
  <Frame
    kicker="收束｜面向誰"
    title={
      <>
        能力是<span style={{ color: ACCENT_TXT }}>泛</span>的，收費只做<span style={{ color: AMBER_TXT }}>一類</span>
      </>
    }
    who="黃浩然"
    lead="同一套系統能服務很多人，但我們只對一種人收費。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1000px 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div>
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>同一套系統可以服務</div>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Who t="中學生" />
          <Who t="大學生" />
          <Who t="轉行者" />
          <Who t="語言學習者" />
        </div>
        <div style={{ marginTop: 18, fontSize: 24, lineHeight: '34px', color: DIM }}>
          這四類人學的東西不同，但「學會沒有」這個問題是同一個。
        </div>
      </div>
      <div>
        <div style={{ ...eyebrow, color: AMBER_TXT }}>只收費給這一類</div>
        <div style={{ marginTop: 16 }}>
          <Pay t="有明確目標" />
          <Pay t="有截止日期" />
          <Pay t="願意為結果付錢" />
        </div>
        <div style={{ marginTop: 18, fontSize: 24, lineHeight: '34px', color: DIM }}>
          其餘三類，我們免費開放，不收費。
        </div>
      </div>
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="blue" h={112} size={32}>
        <div style={{ fontSize: 24, lineHeight: '34px', color: MUTED, fontWeight: 500 }}>首年主攻</div>
        <div style={{ marginTop: 4 }}>香港與內地大學生——人最多、離校園最近的一段。</div>
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 18 · 定價 — 列式對照表（不與 P6 / P12 的三欄卡片同構）
 * ================================================================== */

/* 定價頁用「列式對照表」骨架，不與 P6 / P12 的三欄卡片同構。 */
const tierCell: CSSProperties = {
  boxSizing: 'border-box',
  padding: '20px 26px',
  borderLeft: `1px solid ${RULE}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const TierName: FC<{ name: string; main?: boolean }> = ({ name, main }) => (
  <div style={{ ...tierCell, background: main ? BLUE_SOFT : PANEL, borderTop: `3px solid ${main ? ACCENT : RULE}` }}>
    <div style={{ ...eyebrow, color: main ? ACCENT_TXT : MUTED }}>{main ? '主力檔' : '檔位'}</div>
    <div style={{ marginTop: 6, fontSize: 40, lineHeight: '52px', fontWeight: 800, color: main ? ACCENT_TXT : 'var(--osd-text)' }}>
      {name}
    </div>
  </div>
);

const TierPrice: FC<{ price: string; main?: boolean }> = ({ price, main }) => (
  <div style={{ ...tierCell, background: main ? BLUE_SOFT : PANEL, borderTop: `3px solid ${main ? ACCENT : RULE}` }}>
    <BigNum n={price} size={68} />
  </div>
);

const AttrRow: FC<{ label: string; a: string; b: string; c: string; mainIdx: number }> = ({
  label,
  a,
  b,
  c,
  mainIdx,
}) => (
  <>
    <div
      style={{
        boxSizing: 'border-box',
        padding: '22px 26px',
        background: PANEL,
        borderTop: `1px solid ${RULE}`,
        display: 'flex',
        alignItems: 'center',
        fontSize: 26,
        lineHeight: '40px',
        fontWeight: 700,
        color: MUTED,
      }}
    >
      {label}
    </div>
    <div style={{ ...tierCell, borderTop: `1px solid ${RULE}`, background: mainIdx === 0 ? BLUE_SOFT : PANEL, fontSize: 27, lineHeight: '42px', fontWeight: 600 }}>
      {a}
    </div>
    <div style={{ ...tierCell, borderTop: `1px solid ${RULE}`, background: mainIdx === 1 ? BLUE_SOFT : PANEL, fontSize: 27, lineHeight: '42px', fontWeight: 600 }}>
      {b}
    </div>
    <div style={{ ...tierCell, borderTop: `1px solid ${RULE}`, background: mainIdx === 2 ? BLUE_SOFT : PANEL, fontSize: 27, lineHeight: '42px', fontWeight: 600 }}>
      {c}
    </div>
  </>
);

const P18: Page = () => (
  <Frame
    kicker="收束｜定價"
    title="定價：免費 / Pro / Max"
    who="黃浩然"
    lead="積分＝跑一次驗收要消耗的額度。"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px repeat(3, 1fr)',
        gridAutoRows: '1fr',
        border: `1px solid ${RULE}`,
        borderRadius: 'var(--osd-radius)',
        flex: '1 1 auto',
        minHeight: 0,
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          padding: '20px 26px',
          background: PANEL,
          borderTop: `3px solid ${RULE}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ ...eyebrow }}>對照</div>
        <div style={{ marginTop: 6, fontSize: 30, lineHeight: '40px', fontWeight: 700 }}>三個檔位</div>
      </div>
      <TierName name="免費" />
      <TierName name="Pro" main />
      <TierName name="Max" />

      <div style={{ boxSizing: 'border-box', background: PANEL, borderTop: `1px solid ${RULE}`, padding: '22px 26px', display: 'flex', alignItems: 'center', fontSize: 26, lineHeight: '40px', fontWeight: 700, color: MUTED }}>
        價格
      </div>
      <TierPrice price="HK$0" />
      <TierPrice price="HK$78" main />
      <TierPrice price="HK$150" />

      <AttrRow
        label="積分（跑驗收的額度）"
        a="每月固定，夠跑完一次完整驗收"
        b="約免費版的 6 倍"
        c="約 Pro 的 2.5 倍"
        mainIdx={1}
      />
      <AttrRow
        label="核心"
        a="可體驗全部三種驗收形式"
        b="解鎖項目打分 ＋ 30 天回訪"
        c="大模型優先，課程數量不限"
        mainIdx={1}
      />
    </div>

    <div style={{ marginTop: 30 }}>
      <Bar tone="blue" h={80} size={26}>
        每個檔位的積分都夠跑完一次完整驗收；我們只收成本，不賺價差。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 19 · 切檔理由 — 左理由 + 右價格縱列
 * ================================================================== */

const Why: FC<{ n: string; t: string; d: string }> = ({ n, t, d }) => (
  <div
    style={{
      height: 190,
      boxSizing: 'border-box',
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      borderTop: `1px solid ${RULE}`,
    }}
  >
    <div
      style={{
        flex: 'none',
        fontFamily: NUM,
        fontSize: 30,
        lineHeight: '40px',
        fontWeight: 800,
        color: ACCENT_TXT,
        width: 48,
      }}
    >
      {n}
    </div>
    <div>
      <div style={{ fontSize: 30, lineHeight: '42px', fontWeight: 700 }}>{t}</div>
      <div style={{ marginTop: 4, fontSize: 24, lineHeight: '36px', color: MUTED }}>{d}</div>
    </div>
  </div>
);

const PriceRow: FC<{ name: string; price: string; mine?: boolean; tag?: string }> = ({ name, price, mine, tag }) => (
  <div
    style={{
      height: 108,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      background: mine ? BLUE_SOFT : 'transparent',
      borderBottom: mine ? `2px solid ${ACCENT}` : `1px solid ${RULE}`,
    }}
  >
    <span style={{ fontSize: 25, lineHeight: '34px', fontWeight: mine ? 700 : 500, color: mine ? ACCENT_TXT : 'var(--osd-text)' }}>
      {name}
      {tag ? (
        <span style={{ marginLeft: 10, fontSize: 22, lineHeight: '28px', color: AMBER_TXT, fontWeight: 600 }}>{tag}</span>
      ) : null}
    </span>
    <span
      style={{
        fontFamily: NUM,
        fontSize: 25,
        lineHeight: '34px',
        fontWeight: 700,
        color: mine ? ACCENT_TXT : 'var(--osd-text)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {price}
    </span>
  </div>
);

const P19: Page = () => (
  <Frame kicker="收束｜定價理由" title="為什麼這樣切" who="黃浩然">
    <div style={{ display: 'grid', gridTemplateColumns: '940px 1fr', gap: 40, flex: '1 1 auto', minHeight: 0 }}>
      <div>
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>三條理由</div>
        <div style={{ marginTop: 10 }}>
          <Why n="01" t="免費版的邊界，就是 Pro 的錨" d="同類產品的免費版常是一堵牆。我們砍次數，不砍動作——免費也要能真跑完一次驗收。" />
          <Why n="02" t="積分限制的是成本，不是功能" d="不做無上限。簡單題用小模型、難題用大模型，所以額度可以預先算準。" />
          <Why n="03" t="Max 是出口，不是升級誘餌" d="重度用戶有出口，就不會壓低 Pro 的轉化率。" />
        </div>
      </div>
      <div>
        <div style={{ ...eyebrow, color: ACCENT_TXT }}>競品公開價格</div>
        <div style={{ marginTop: 10 }}>
          <PriceRow name="Coursera 旁聽" price="US$0" />
          <PriceRow name="StudyFetch" price="未能核實" tag="公開資料取不到價目" />
          <PriceRow name="Hyperknow" price="US$18 / 50" />
          <PriceRow name="Coursera Plus" price="US$59" />
          <PriceRow name="Veridex Pro" price="HK$78" mine />
        </div>
      </div>
    </div>

    <div style={{ marginTop: 28 }}>
      <Bar tone="blue" h={96} size={30}>
        便宜的能教會你，貴的也能教會你。區別是——
        <span style={{ color: ACCENT_TXT }}>沒有一個價格，是按「你學會了」結算的。</span>
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 20 · 路線圖 — 橫向時間軸
 * ================================================================== */

const Mile: FC<{ name: string; detail: string; deliver: string }> = ({ name, detail, deliver }) => (
  <div
    style={{
      height: '100%',
      boxSizing: 'border-box',
      border: `1px solid ${RULE}`,
      borderTop: `4px solid ${ACCENT}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '26px 26px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontSize: 30, lineHeight: '44px', fontWeight: 800 }}>{name}</div>
    <div style={{ marginTop: 10, fontSize: 27, lineHeight: '42px', color: MUTED }}>{detail}</div>
    <div style={{ marginTop: 'auto' }}>
      <Rule tone={BLUE_LINE} h={2} />
      <div style={{ marginTop: 18, ...eyebrow, color: ACCENT_TXT }}>這一步怎麼算完成</div>
      <div style={{ marginTop: 6, fontSize: 24, lineHeight: '36px', color: 'var(--osd-text)' }}>{deliver}</div>
    </div>
  </div>
);

const P20: Page = () => {
  useDeckStyles();
  return (
    <Frame
      kicker="收束｜路線圖"
      title="18 個月，您會拿到這些"
      who="黃浩然 · 黃羿捷"
      lead="四個時間點，每一個都有可以被驗收的東西。"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, flex: 'none' }}>
        <div style={{ fontSize: 34, lineHeight: '48px', fontWeight: 800, color: ACCENT_TXT, textAlign: 'center' }}>第 3 月</div>
        <div style={{ fontSize: 34, lineHeight: '48px', fontWeight: 800, color: ACCENT_TXT, textAlign: 'center' }}>第 6 月</div>
        <div style={{ fontSize: 34, lineHeight: '48px', fontWeight: 800, color: ACCENT_TXT, textAlign: 'center' }}>第 12 月</div>
        <div style={{ fontSize: 34, lineHeight: '48px', fontWeight: 800, color: ACCENT_TXT, textAlign: 'center' }}>第 18 月</div>
      </div>

      <div style={{ position: 'relative', height: 64, flex: 'none', marginTop: 6 }}>
        <svg width={1680} height={64} viewBox="0 0 1680 64" style={{ position: 'absolute', left: 0, top: 0 }}>
          <path className="vd-line" pathLength={1} d="M 8 32 L 1672 32" stroke={RULE} strokeWidth={3} fill="none" />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 23,
            width: 1678,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 26,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: ACCENT }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: ACCENT }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: ACCENT }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: ACCENT }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, flex: '1 1 auto', minHeight: 0, marginTop: 20 }}>
        <Mile name="可用原型" detail="30–50 次深訪；100 人等候名單；試點學校簽約。" deliver="一份可以點開的原型 ＋ 簽約學校名單。" />
        <Mile name="封閉測試" detail="100–200 人真實使用。" deliver="100 人以上的完整使用記錄。" />
        <Mile name="首批付費用戶" detail="首年目標 100–300 人。" deliver="付費數與留存曲線。" />
        <Mile name="延遲數據齊備" detail="30 天回訪結果全部回收。" deliver="第一份延遲回訪報告。" />
      </div>

      <div style={{ marginTop: 22 }}>
        <div
          style={{
            boxSizing: 'border-box',
            border: `2px dashed ${AMBER_LINE}`,
            borderRadius: 8,
            background: AMBER_SOFT,
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <div style={{ flex: 'none', fontSize: 30, lineHeight: '42px', fontWeight: 800, color: AMBER_TXT }}>
            我們要申請
          </div>
          <div style={{ fontSize: 27, lineHeight: '42px', color: 'var(--osd-text)' }}>
            首年要 HK$
            <span
              style={{
                color: AMBER_TXT,
                fontWeight: 800,
                borderBottom: `3px dashed ${AMBER_LINE}`,
                padding: '0 10px 2px',
              }}
            >
              ［待填：金額］
            </span>
            ，用在 ①原型開發 ②校園部署 ③模型與運算成本。
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 24, lineHeight: '34px', color: MUTED }}>
          解鎖條件＝第 6 月 100 人真實使用。屆時未達到，我們停。
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <div
          style={{
            height: 96,
            boxSizing: 'border-box',
            borderLeft: `5px solid ${ACCENT}`,
            background: BLUE_SOFT,
            display: 'flex',
            alignItems: 'center',
            padding: '0 30px',
            fontSize: 34,
            lineHeight: '48px',
            fontWeight: 700,
          }}
        >
          一個人學會了，不是他自己說了算。
          <span style={{ color: ACCENT_TXT }}>我們補的就是這最後一眼。</span>
        </div>
      </div>
    </Frame>
  );
};

/* ================================================================== *
 * 附錄 A · 參考文獻
 * ================================================================== */

const Ref: FC<{ n: number; t: string }> = ({ n, t }) => (
  <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
    <div style={{ flex: 'none', width: 34, fontFamily: NUM, fontSize: 22, lineHeight: '34px', color: ACCENT_TXT, fontWeight: 700 }}>
      {String(n).padStart(2, '0')}
    </div>
    <div style={{ fontSize: 22, lineHeight: '34px', color: MUTED }}>{t}</div>
  </div>
);

const P21: Page = () => (
  <Frame kicker="附錄 A" title="參考文獻" who="黃浩然 · 黃羿捷">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <div>
        <Ref n={1} t="Wisniewski, Zierer & Hattie (2020). Effects of feedback on learning: A meta-analysis. Frontiers in Psychology 11:309. DOI 10.3389/fpsyg.2019.03087" />
        <Ref n={2} t="Roediger & Karpicke (2006). Test-enhanced learning. Psychological Science 17(3):249–255. DOI 10.1111/j.1467-9280.2006.01693.x" />
        <Ref n={3} t="Koriat (1997). Monitoring knowledge from within. Journal of Experimental Psychology 23(5):1181–1196." />
        <Ref n={4} t="Wei, Soderstrom & Meade (2025). Psychonomic Bulletin & Review. DOI 10.3758/s13423-025-02816-0" />
        <Ref n={5} t="Dunlosky & Rawson (2012). Overconfidence causes underperformance on exams. Learning and Instruction 22(6):375–382. DOI 10.1016/j.learninstruc.2011.08.003" />
        <Ref n={6} t="Reines & Camosy (2013). Overconfidence and grades. PLoS ONE 8(12):e83777." />
        <Ref n={7} t="HEPI (2026). Student Generative AI Survey, Report 199. n = 1,054，英國全日制本科生。" />
      </div>
      <div>
        <Ref n={8} t="OpenMAIC 公開 issue #1712（2026-09-29）：選項重複會破壞題目顯示與判分；修復 PR 已提交、未合併。" />
        <Ref n={9} t="OpenMAIC 授權：MIT（內嵌 mathml2omml 套件另為 LGPL-3.0-or-later）。" />
        <Ref n={10} t="Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science 12(2):257–285." />
        <Ref n={11} t="遞歸式前置知識追蹤（RPKT）. IEEE FMLDS 2025." />
        <Ref n={12} t="Coursera Plus 公開定價頁，2026 年 9 月查閱：US$59/月、US$399/年。" />
        <Ref n={13} t="Hyperknow 官網公開定價，2026 年 9 月查閱：US$0 / US$18 / US$50。" />
        <Ref n={14} t="StudyFetch、Quizlet 公開頁面，2026 年 9 月查閱（Quizlet 評分 1,123,682 條）；兩者定價頁未能取得。" />
      </div>
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 24 }}>
      <Bar tone="blue" h={64} size={24}>
        <span style={{ fontWeight: 500, color: MUTED }}>
          標「未能核實」者，為 2026 年 9–10 月查閱時公開渠道取不到資料；本 deck 不以估計值補位。
        </span>
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * 附錄 B · 答問準備
 * ================================================================== */

const QA: FC<{ q: string; a: string }> = ({ q, a }) => (
  <div style={{ marginTop: 20, height: 168, boxSizing: 'border-box' }}>
    <div style={{ fontSize: 27, lineHeight: '40px', fontWeight: 700 }}>
      <span style={{ color: ACCENT_TXT }}>問　</span>
      {q}
    </div>
    <div style={{ marginTop: 8, fontSize: 23, lineHeight: '36px', color: MUTED, paddingLeft: 50 }}>{a}</div>
  </div>
);

const P22: Page = () => (
  <Frame kicker="附錄 B" title="答問準備" who="黃浩然 · 黃羿捷">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <div>
        <QA
          q="你們的驗收準則怎麼定？"
          a="每門課有一張「驗收卡」，寫明這門課怎麼算過。試點教師可以改，改了要留記錄，學生的分數仍以教師的版本為準。"
        />
        <QA
          q="AI 判錯了怎麼辦？"
          a="出題時同時產出標準答案和判分依據，兩者衝突時以試點教師覆核為準。錯判會被記成事件，進修正池。"
        />
        <QA
          q="學生會不會直接用 AI 作弊？"
          a="三種驗收裡有兩種是開放題（講出來、做出來），不能靠複製答案拿到分；再加上 30 天後重跑一次，短期蒙混會在回訪時露餡。"
        />
      </div>
      <div>
        <QA q="資料放在哪裡？" a="資料留在用戶所屬司法區：香港用戶留港、內地用戶留內地。各校資料分隔、存取令牌有時效、導出留審計。模型我們自託管或在當地部署，不經境外 API。四條都寫進學校合約。" />
        <QA
          q="你和 StudyFetch、Quizlet 差在哪？"
          a="它們的公開說明裡，驗收做到判對錯。我們多做一步：指出你為什麼錯、錯在哪一步、三十天後還剩多少。"
        />
        <QA
          q="為什麼是你們，不是大公司？"
          a="我們只做最後那一步，把它做深；而且試點學校的教師直接決定我們的驗收規則，我們改得比大公司快。"
        />
      </div>
    </div>

    <div style={{ marginTop: 'auto', paddingTop: 26 }}>
      <Bar tone="amber" h={96} size={26}>
        <span style={{ fontWeight: 600, color: AMBER_TXT }}>停損線（我們自己設的，不是別人訂的）：</span>
        第 6 月激活率低於 25%，我們重做定位；第 12 月付費轉化低於 3%，我們轉向學校與機構採購。這兩條我們事先寫死了，不事後解釋。
      </Bar>
    </div>
  </Frame>
);

/* ================================================================== *
 * Speaker notes — index-aligned with the page array
 * ================================================================== */

export const notes: (string | undefined)[] = [
  /* 01 */ `開場白定調：不要從技術講起。
先講今天要回答的問題——一個人學會一件事，必須經過什麼。
提醒自己：20 分鐘，20 頁，平均每頁一分鐘。不要念投影片。`,

  /* 02 */ `四拍講完，每拍停一拍讓聽眾跟上來。
第一拍：列舉，讓聽眾確認「對，AI 無處不在」。
第二拍是問題本身——問完停兩秒，不要急著接。
第三拍：兩種說法都擺出來，表示我們不預設立場。
第四拍是轉向：今天不評價 AI 好壞，只拆「學會」這件事。
如果時間緊，這頁可以壓到 40 秒，但第二拍的停頓不能省。`,

  /* 03 */ `這頁是合法性地基：先證明「檢驗有價值」，後面講產品才站得住。
d = 0.48：效應量以標準差為單位，0.48 是中等偏上的效果。如果有人問 0.70——那是 Hattie 2007 年的舊值，他本人 2020 年重做元分析後下修到 0.48，我們用新值。
21 個百分點：Roediger & Karpicke 的三組實驗。重讀組一週後落後，而且他們最自信——這正好接下一頁。`,

  /* 04 */ `全篇的轉折點。前面講「應該檢驗」，這頁講「驗收必須發生在學生之外」。
Koriat 1997：人判斷自己會不會，靠的是順暢感，不是測試。cue-utilization 這個詞可以講，但要立刻用中文解釋成「只用到感覺，不用測試」。
Dunlosky & Rawson 2012 是因果研究，不是相關性——論文標題就是結論，這點要說。
落點句要慢念：判斷的人必須站在學生之外。
接著用三個理由收緊：一致性、可規模、24 小時。這三個都跟「努力不努力」無關，是在講系統為什麼不可替代。
如果有人追問「那老師驗收不也可以」——可以，而且試點學校的授課教師就是最後把關的人（見 P15、P16）。這不是繞開老師，是把老師從「逐題批改」裡放出來。`,

  /* 05 */ `全場唯一的數據圖，講慢一點。
資料來源先講清楚：HEPI 2026 年調查，1,054 名英國全日制本科生。這是英國樣本，要主動說明，不要等台下問。
從上往下念前三名就好：解釋概念 58%、總結材料 47%、提供研究思路 40%。
停頓，然後指向最後那條虛線：調查裡根本沒有「檢驗自己」這一項——注意措辭是「調查未列此項」，不是「沒人用」，這是事實準確的說法。
落點只講這一句：這份問卷裡，AI 是拿來解釋的；沒有人問過它拿來考自己。
不要講成「學生從來沒拿 AI 考過自己」——問卷沒列，不等於沒人做。講錯這一句，被追問一次就完了。`,

  /* 06 */ `這頁回答「現有學習形式的問題」，是委員最在意的部分。
四種做法要講得像你真的用過，不要像在念課本。
講完第三種停一下：對上了就當學會了——請問在座各位，您上次是怎麼確認自己學會的？
第四種（買題庫自測）一定要講，這是 2026 年最普遍的作法；代價是題目跟課不對焦，錯了也不知道錯在哪一步。
落點句：四種都湊合能用，但沒有一種真的在檢驗。`,

  /* 07 */ `這一頁不是攻擊，是定位。先講三句好話再講局限。
承認 StudyFetch 做得最完整，它的三層檢驗是主打卡點；Quizlet 有一百多萬條評分。
OpenMAIC 要說清楚是清華 MAIC 團隊的開源課堂框架，MIT 授權，不是同級商業競品；issue #1712 是公開記錄，修復 PR 已提交未合併，可以查。
措辭紀律：說「公開資料裡看不到它們說明你為什麼錯」，不要說「它們沒做」。前者可以被接受，後者一旦被推翻，整份 deck 的可信度就完了。
限時：只念前三列，OpenMAIC 與 StudyFetch 兩列快速帶過，時間留給下面的結論條。`,

  /* 08 */ `全篇的發布會轉折點，節奏要慢。
上半部：這三步就是一個人學會一件事必須經過的過程（回答 P2 留下的問題），而且前兩步擠滿，第三步也擠滿了——這是承認對手。
下半部三個問題，一個一個念，中間停頓。這三個問題就是我們全部的機會。
第二題要說清楚：排複習這件事 SRS 和 Quizlet 早就在做，我們不比它們；我們做的是「用同一套驗收反覆量你還剩多少」。
交接點一（照念）：「問題講完了，下面講我們怎麼補這一步。」然後停，看向搭檔，等他接。`,

  /* 09 */ `黃羿捷第一頁。交接之後第一句要穩。
講法：先講三個時刻——丟主題、做題、看結果。人只做這三件事。
再講 AI 做的三件事：拆章節、講解、出題判卷。
一句話總結：這是單向的一條線，不繞圈。過了就開下一節，沒過就只補那一點。
禁令提醒自己：不要說「回到起點」或「循環」。`,

  /* 10 */ `對應題目要求的「AI Agent 角色」，講清楚分工。
每個角色只講兩句：它做什麼、人做什麼。特別強調「人做」那一欄——我們不打算讓 AI 取代判斷，只是把雜事接走。
Agent 這個詞第一次出現時解釋一句：會自己判斷下一步、並自動呼叫工具的 AI 程式。`,

  /* 11 */ `這一頁要主動讓位，這是加分項不是減分項。
說清楚：說一句話、傳一份資料、這兩件事現在的 AI 早就做得了，我們不比這裡強。
我們的差別從下一頁開始。
原型截圖如果沒做好，就用這三個入口口頭描述，不要指著空白說「這裡之後放」。`,

  /* 12 */ `這頁是產品的核心。
三種形式對應三種不同的「假裝會了」：背得順、調不出來、換情境就廢。
舉一個具體例子最好：講出來那一項，請學生講給一個指定的對象聽——因為對著牆講和講給人聽，暴露的東西完全不同。
最後講延遲軸：30 天後同一套驗收重跑一次，這是我們和別人最大的差別。`,

  /* 13 */ `這頁要講得最有興趣，因為它是最不尋常的一頁。
用一個具體場景：你在第三章答錯一題，系統往下追——不是回到第三章重講，而是追到條件機率。
這條鏈是認真的：中央極限定理的前置確實是獨立同分布變數的期望與變異，再往下才是條件機率。不要講成「其實是分式運算」之類的笑話，那是錯的。
強調：只補那一點，不重講全課。這是學生真正會買單的地方。
腳註的 RPKT 是技術來源，可以提一句「這個做法有論文」，不要展開。`,

  /* 14 */ `【限時壓縮點之一：時間不夠時整頁跳過，直接翻到 P15。這頁是設計原則的補充，不是主線。】
用認知負荷理論解釋我們為什麼要接管這些雜事。講法：腦的容量有限，如果還要自己排順序、記複習時間、判斷有沒有聽懂，真正學的空間就沒了。
措辭紀律：說「我們借用認知負荷理論的思路」，不要說「心理學的認知負荷理論說我們該這麼設計」——Sweller 講的是解題時的工作記憶負荷，不是「把雜務交給系統」。這是我們借用的推論，不是他的結論。
複習那一行不要說「間隔重複」，那是別人也在做的成熟做法；說「用驗收結果安排複習時機」。
左邊四行念快一點，右邊四行念慢一點——重點在右邊。落點：學生只需要做一件事，學。`,

  /* 15 */ `這頁最重要的是誠實。
三個數字是承諾值，不是已經測出來的結果——這句要主動說，不要等台下發現。
三個數字都是與試點教師共同議定的，念的時候把「與教師共同議定」講出來，這是這三個數字唯一的依據。
時間表要對：簽約與備課在第 3 月，數字要等第 6 月封閉測試之後才交得出來。不要說「三個月內交數字」，那跟 P20 的路線圖對不上，被追問就穿幫。
強調評分權不在我們手上：出題和評分都是試點學校的教師，我們只出系統。
交接點二（照念）：「方案講完了，下面說我們是誰、要什麼。」停，看向搭檔。`,

  /* 16 */ `收束段的信任頁，講誠懇，不要講條目。
左邊兩句話講團隊分工。
【待填】兩個「已交付物：［待填］」必須在上台前填掉。若真的沒有交付物，就刪掉該行，改講真實存在的東西（例如已做出的可用原型、已試講的課程）——空著上台最致命。
右邊四條資料規則，逐條念，每條一句理由。第一條要念完整：資料留在用戶所屬司法區，香港用戶留港、內地用戶留內地，模型我們自託管或在當地部署，不經境外 API。不要簡化成「數據不出境」，那個說法會被香港／內地兩地使用者一問就破。
落點：寫進合約，不是寫在網站上。`,

  /* 17 */ `回答「你們到底做給誰」。
左邊四類人：能力是同一套，所以邊際成本低。
右邊三條：只有同時滿足這三條的人才收費。這是刻意的取舍——不追求用戶數大。
首年聚焦香港與內地大學生，講清楚理由：人最多、離校園最近。
如果有人問「內地用戶的資料怎麼辦」，回答見 P16 第一條：留在用戶所屬司法區。`,

  /* 18 */ `定價頁，講得平實。這頁已改成列式對照表，逐行念比逐欄念清楚。
先講免費版：不是試用牆，夠跑完一次完整驗收——這是刻意的，讓用戶真的體驗到驗收。
再講 Pro 是主力，$78 的理由下一頁拆。Max 是給重度用戶的出口。
結論條講「只收成本，不賺價差」。不要在台上提「積分絕對數值還沒測算」——那是內部備忘，不是對外頁面該講的話。
備註（不上台講，只記在這裡）：積分的絕對數值尚未確定，目前只寫比例，成本測算完成後補上。`,

  /* 19 */ `【限時壓縮點之二：只念右邊兩行價格——StudyFetch 與 Veridex Pro，其餘行不念。】左邊三條理由講第一條就夠。
第一條最重要：免費版的邊界決定 Pro 的錨。用戶只有在免費版裡真的驗證過驗收，才會想付費。
第二條的「模型路由」要翻成白話：簡單題用小模型、難題用大模型，所以額度可以預先算準。不要講「模型路由」這個術語。
第三條講出口：Max 存在，重度用戶不會硬留在免費版，反而不會壓低 Pro 的轉化率。
右邊價格表：StudyFetch 那一行標了「公開資料取不到價目」，如果有人追問，直接說官網取不到，不要辯解。
落點句慢慢念：沒有一個價格，是按「你學會了」結算的。`,

  /* 20 */ `收尾，兩人同台。
四個時間點快速帶過，強調每個時間點都有可以被驗收的東西——這是前面十五頁的承諾。
【待填】中間那條「我們要申請」的金額必須在上台前填好。這是全場唯一一處要錢的句子，必須念出金額、用途、與解鎖條件。
如果金額還沒定，現場照實說「金額我們在申請表上報，這裡先講用途與解鎖條件」，不要含糊帶過。
最後一句留給搭檔一起念，或由你念完停下來。
收束句：「一個人學會了，不是他自己說了算。我們補的就是這最後一眼。」念完停三秒，不要補話。`,

  /* 21 */ undefined,
  /* 22 */ undefined,
];

/* ================================================================== *
 * Meta
 * ================================================================== */

export const meta: SlideMeta = {
  title: 'Veridex 維學 · 青年創業基金口頭報告',
  createdAt: '2026-09-30T07:40:00.000Z',
};

export default [
  P01, P02, P03, P04, P05, P06, P07, P08, P09, P10,
  P11, P12, P13, P14, P15, P16, P17, P18, P19, P20,
  P21, P22,
] satisfies Page[];
