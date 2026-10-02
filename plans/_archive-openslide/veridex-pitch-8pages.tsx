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
      '"PingFang TC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans TC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
    body: '"PingFang TC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans TC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
  },
  typeScale: { hero: 96, body: 32 },
  radius: 14,
};

/* ================================================================== *
 * Tokens
 *
 * 紀律：藍 = Veridex 自己的正面內容 / 結構
 *       琥珀 = 問題、未通過、盲點、斷點、真正的不足
 *       ACCENT / AMBER 是圖形色（填充、邊框、條形）
 *       文字另用 ACCENT_TXT / AMBER_TXT 這組深色版，否則達不到 AA
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

/** 動效只有三種：幕間 260ms、Step 逐條揭示、連線描繪（見 useDeckStyles）。 */
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
 * Connector draw-on (動效 #3：stroke-dashoffset)
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
const PAD_TOP = 60;
const HEAD_H = 24;
const BOTTOM_H = 148; // 有腳註
const BOTTOM_H_PLAIN = 112; // 無腳註

/* ================================================================== *
 * Shared parts
 * ================================================================== */

const PageNo: FC = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <span style={{ fontFamily: NUM, fontVariantNumeric: 'tabular-nums' }}>
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
};

const eyebrow: CSSProperties = {
  fontSize: 22,
  lineHeight: '30px',
  letterSpacing: '0.14em',
  color: DIM,
  fontWeight: 600,
};

const Frame: FC<{
  kicker: string;
  title: ReactNode;
  who: string;
  titleSize?: number;
  lead?: string;
  note?: ReactNode;
  center?: boolean;
  children: ReactNode;
}> = ({ kicker, title, who, titleSize = 60, lead, note, center, children }) => (
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
        letterSpacing: '0.14em',
        color: MUTED,
        fontWeight: 600,
      }}
    >
      <span style={{ color: ACCENT_TXT }}>{kicker}</span>
      {/* 課程明文要求：每頁右上角有講者姓名 */}
      <span style={{ letterSpacing: '0.04em' }}>{who}</span>
    </div>

    <h2
      style={{
        flex: 'none',
        margin: '18px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: titleSize,
        fontWeight: 800,
        lineHeight: `${Math.round(titleSize * 1.15)}px`,
        letterSpacing: '-0.01em',
      }}
    >
      {title}
    </h2>

    {lead ? (
      <p style={{ flex: 'none', margin: '12px 0 0', fontSize: 32, lineHeight: '46px', color: MUTED }}>
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
        justifyContent: center ? 'center' : 'flex-start',
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
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 40,
          textAlign: 'right',
          fontSize: 22,
          lineHeight: '24px',
          color: DIM,
        }}
      >
        <PageNo />
      </div>
    </div>
  </div>
);

/** 左側色條 + 一句落點。tone: blue = 我們的正面內容 / amber = 問題 */
const Bar: FC<{ tone: 'blue' | 'amber'; h: number; size?: number; children: ReactNode }> = ({
  tone,
  h,
  size = 30,
  children,
}) => (
  <div
    style={{
      boxSizing: 'border-box',
      height: h,
      display: 'flex',
      alignItems: 'center',
      borderLeft: `5px solid ${tone === 'amber' ? AMBER : ACCENT}`,
      background: tone === 'amber' ? AMBER_SOFT : BLUE_SOFT,
      padding: '0 30px',
      fontSize: size,
      lineHeight: 1.45,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

const Rule: FC<{ w?: number | string; tone?: string; h?: number }> = ({
  w = '100%',
  tone = RULE,
  h = 1,
}) => <div style={{ width: w, height: h, background: tone, flex: 'none' }} />;

/** 段首標籤：出路一 ── 自己做檢驗 */
const SectionLabel: FC<{ tag: string; text: string; right?: ReactNode }> = ({ tag, text, right }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 48, flex: 'none' }}>
    <span style={{ fontSize: 34, lineHeight: '40px', fontWeight: 800, color: ACCENT_TXT }}>{tag}</span>
    <div style={{ width: 60, height: 2, background: RULE, flex: 'none' }} />
    <span style={{ fontSize: 30, lineHeight: '40px', fontWeight: 600 }}>{text}</span>
    {right ? (
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>{right}</div>
    ) : null}
  </div>
);

/** 連線描繪：向下箭頭 */
const DownArrow: FC = () => (
  <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden="true" style={{ flex: 'none' }}>
    <path
      className="vd-line"
      pathLength={1}
      d="M14 2 V22"
      stroke={RULE}
      strokeWidth={3}
      strokeLinecap="round"
      fill="none"
    />
    <path
      className="vd-line"
      pathLength={1}
      d="M7 17 L14 25 L21 17"
      stroke={RULE}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ================================================================== *
 * P1 · 封面 — 大標版式
 * ================================================================== */

const P01: Page = () => (
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
        letterSpacing: '0.14em',
        color: MUTED,
        fontWeight: 600,
      }}
    >
      <span style={{ letterSpacing: '0.04em' }}>黃浩然 · 黃羿捷</span>
    </div>

    <h1
      style={{
        flex: 'none',
        margin: '188px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 800,
        lineHeight: '110px',
        letterSpacing: '-0.025em',
      }}
    >
      Veridex：AI 時代的有效自學方案
    </h1>

    <p
      style={{
        flex: 'none',
        margin: '40px 0 0',
        fontSize: 46,
        lineHeight: '62px',
        fontWeight: 600,
        color: MUTED,
      }}
    >
      按你的資料生成，按你的程度驗收
    </p>

    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        right: PAD_X,
        bottom: 56,
        borderTop: `1px solid ${RULE}`,
        paddingTop: 28,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div>
          <div style={{ ...eyebrow }}>呈</div>
          <div style={{ marginTop: 6, fontSize: 30, lineHeight: '42px', fontWeight: 600 }}>
            青年創業基金委員會
          </div>
        </div>
        <div style={{ width: 80, height: 1, background: RULE, margin: '0 32px 21px' }} />
        <div>
          <div style={{ ...eyebrow }}>講者</div>
          <div style={{ marginTop: 6, fontSize: 30, lineHeight: '42px', fontWeight: 600 }}>
            黃浩然、黃羿捷
          </div>
        </div>
        <div style={{ width: 80, height: 1, background: RULE, margin: '0 32px 21px' }} />
        <div>
          <div style={{ ...eyebrow }}>日期</div>
          <div
            style={{
              marginTop: 6,
              fontSize: 30,
              lineHeight: '42px',
              fontWeight: 600,
              fontFamily: NUM,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            2026 · 10 · 16
          </div>
        </div>
      </div>
      <div style={{ fontSize: 22, lineHeight: '24px', color: DIM }}>
        <PageNo />
      </div>
    </div>
  </div>
);

/* ================================================================== *
 * P2 · 傳統課堂給不了定制 — 左右兩列對照（先左後右）
 * ================================================================== */

const CompareCell: FC<{ h: number; children: ReactNode }> = ({ h, children }) => (
  <div
    style={{
      boxSizing: 'border-box',
      height: h,
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      fontSize: 34,
      lineHeight: '50px',
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

const P02: Page = () => (
  <Frame
    kicker="問題一 · 定制化課程"
    title="傳統課堂給不了定制"
    who="黃浩然"
    lead="老師的注意力是稀缺資源 —— 一份講義、一條進度，都只能按一個人來做"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 'none' }}>
      {/* 左：傳統課堂 */}
      <div>
        <Steps>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              height: 54,
              borderBottom: `2px solid ${RULE}`,
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 30, lineHeight: '38px', fontWeight: 800, color: MUTED }}>
              傳統課堂
            </span>
          </div>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${RULE}`,
                borderLeft: `5px solid ${RULE}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
                marginBottom: 26,
              }}
            >
              <CompareCell h={170}>講義是發給所有人的，不是給你的</CompareCell>
            </div>
          </Step>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${RULE}`,
                borderLeft: `5px solid ${RULE}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
                marginBottom: 26,
              }}
            >
              <CompareCell h={170}>一條進度，快的被拖、慢的掉隊</CompareCell>
            </div>
          </Step>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${RULE}`,
                borderLeft: `5px solid ${RULE}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
              }}
            >
              <CompareCell h={170}>老師不知道你想學什麼</CompareCell>
            </div>
          </Step>
        </Steps>
      </div>

      {/* 右：AI native 課堂 */}
      <div>
        <Steps>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              height: 54,
              borderBottom: `2px solid ${ACCENT}`,
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 30, lineHeight: '38px', fontWeight: 800, color: ACCENT_TXT }}>
              AI native 課堂
            </span>
          </div>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${BLUE_LINE}`,
                borderLeft: `5px solid ${ACCENT}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
                marginBottom: 26,
              }}
            >
              <CompareCell h={170}>課照著你的資料長出來</CompareCell>
            </div>
          </Step>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${BLUE_LINE}`,
                borderLeft: `5px solid ${ACCENT}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
                marginBottom: 26,
              }}
            >
              <CompareCell h={170}>進度跟著你的水平：快的跳過，慢的加時</CompareCell>
            </div>
          </Step>
          <Step>
            <div
              style={{
                boxSizing: 'border-box',
                border: `1px solid ${BLUE_LINE}`,
                borderLeft: `5px solid ${ACCENT}`,
                borderRadius: 'var(--osd-radius)',
                background: PANEL,
              }}
            >
              <CompareCell h={170}>你說什麼，第一課就是什麼</CompareCell>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * P3 · 我們怎麼造這門課 — 流程 + 產品原型
 * ================================================================== */

const ProcessStep: FC<{ n: string; text: string; hot?: boolean; cap?: string }> = ({
  n,
  text,
  hot,
  cap,
}) => (
  <div style={{ marginBottom: 24 }}>
    <div
      style={{
        boxSizing: 'border-box',
        border: `1px solid ${hot ? BLUE_LINE : RULE}`,
        borderLeft: `5px solid ${hot ? ACCENT : RULE}`,
        borderRadius: 'var(--osd-radius)',
        background: hot ? BLUE_SOFT : PANEL,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        gap: 20,
      }}
    >
      <span
        style={{
          fontSize: 32,
          lineHeight: '40px',
          fontWeight: 800,
          color: hot ? ACCENT_TXT : MUTED,
          fontFamily: NUM,
        }}
      >
        {n}
      </span>
      <span
        style={{
          fontSize: 34,
          lineHeight: '46px',
          fontWeight: hot ? 800 : 600,
        }}
      >
        {text}
      </span>
    </div>
    {cap ? (
      <div
        style={{
          marginTop: 12,
          paddingLeft: 28,
          fontSize: 24,
          lineHeight: '34px',
          fontWeight: 600,
          color: ACCENT_TXT,
        }}
      >
        {cap}
      </div>
    ) : null}
  </div>
);

const P03: Page = () => (
  <Frame kicker="問題一 · 定制化課程" title="我們怎麼造這門課" who="黃羿捷">
    <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 40, flex: 'none' }}>
      <div>
        <Steps>
          <Step>
            <ProcessStep n="①" text="上傳資料，說清需求" />
          </Step>
          <Step>
            <ProcessStep n="②" text="了解現狀，摸清程度" hot cap="傳統課堂永遠不會做這一步" />
          </Step>
          <Step>
            <ProcessStep n="③" text="生成課程，帶有檢驗" />
          </Step>
        </Steps>
      </div>

      <Steps>
        <Step>
          <ImagePlaceholder
            hint="Veridex 課程頁截圖：章節、知識點、語音講解、板書同步"
            width={880}
            height={560}
            style={{ borderRadius: 'var(--osd-radius)' }}
          />
        </Step>
      </Steps>
    </div>

    <div style={{ marginTop: 44, display: 'flex', gap: 32, alignItems: 'stretch' }}>
      <div
        style={{
          flex: 'none',
          width: 560,
          display: 'flex',
          alignItems: 'center',
          fontSize: 30,
          lineHeight: '44px',
          fontWeight: 600,
          color: MUTED,
        }}
      >
        課出來了，**那個檢驗算不算數？**
      </div>
      <div style={{ flex: '1 1 auto' }}>
        <Bar tone="amber" h={88} size={34}>
          問題二：有人檢驗過嗎？
        </Bar>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * P4 · 上課時 — 逐條出（與 P2 右欄同色同句式）
 * ================================================================== */

const TalkLine: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      boxSizing: 'border-box',
      borderLeft: `5px solid ${ACCENT}`,
      background: BLUE_SOFT,
      height: 150,
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      fontSize: 44,
      lineHeight: '62px',
      fontWeight: 700,
      marginBottom: 40,
    }}
  >
    {children}
  </div>
);

const P04: Page = () => (
  <Frame kicker="問題一 · 定制化課程" title="上課時" titleSize={84} who="黃羿捷" center>
    <Steps>
      <Step>
        <TalkLine>AI 講解，白板板書同步推上去</TalkLine>
      </Step>
      <Step>
        <TalkLine>你隨時可以打斷、追問、要求換一種講法</TalkLine>
      </Step>
      <Step>
        <div style={{ marginBottom: 40 }}>
          <TalkLine>進度按你的反應走——跟不上就停下來重講</TalkLine>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * P5 · 學會一件事，要走完四步 — 四步橫排（不畫環）
 * ================================================================== */

const StepCard: FC<{ n: string; name: string; actor: string }> = ({ n, name, actor }) => (
  <div
    style={{
      boxSizing: 'border-box',
      flex: 1,
      minHeight: 250,
      border: `1px solid ${RULE}`,
      borderTop: `4px solid ${ACCENT}`,
      borderRadius: 'var(--osd-radius)',
      background: PANEL,
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        fontSize: 30,
        lineHeight: '38px',
        fontWeight: 800,
        color: ACCENT_TXT,
        fontFamily: NUM,
      }}
    >
      {n}
    </div>
    <div style={{ marginTop: 10, fontSize: 40, lineHeight: '50px', fontWeight: 800 }}>{name}</div>
    <div style={{ marginTop: 10, fontSize: 24, lineHeight: '34px', color: MUTED }}>{actor}</div>
  </div>
);

/** 分隔線：文字左右各一段線。禁止畫成回環。 */
const BandDivider: FC<{ text: string }> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
    <div style={{ flex: '1 1 auto', height: 1, background: RULE }} />
    <span
      style={{
        flex: 'none',
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: 700,
        color: MUTED,
        letterSpacing: '0.06em',
      }}
    >
      {text}
    </span>
    <div style={{ flex: '1 1 auto', height: 1, background: RULE }} />
  </div>
);

const P05: Page = () => (
  <Frame
    kicker="問題二 · 有效的檢驗"
    title="學會一件事，要走完四步"
    who="黃浩然"
    note={
      <>
        Merrill, M. D. (2002). First principles of instruction.{' '}
        <i>Educational Technology Research and Development</i> 50(3):43–59.
        {'　'}doi:10.1007/bf02505024
      </>
    }
  >
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 60, flex: 'none' }}>
      <div style={{ width: 620, display: 'flex', gap: 16, flex: 'none' }}>
        <StepCard n="①" name="喚起先備" actor="你：把已經會的調出來" />
        <StepCard n="②" name="示範" actor="AI：講給你聽" />
      </div>

      <div style={{ width: 340, display: 'flex', alignItems: 'center', flex: 'none' }}>
        <BandDivider text="前兩步是聽，是輸入" />
      </div>

      <div style={{ width: 620, display: 'flex', gap: 16, flex: 'none' }}>
        <StepCard n="③" name="應用" actor="你：要自己做一遍" />
        <StepCard n="④" name="整合" actor="你：換個情境再用一次" />
      </div>
    </div>

    <div style={{ marginTop: 56, width: 620, marginLeft: 'auto', flex: 'none' }}>
      <BandDivider text="後兩步必須動手" />
    </div>

    <div style={{ marginTop: 100, flex: 'none' }}>
      <div style={{ fontSize: 40, lineHeight: '58px', fontWeight: 600 }}>
        動手之前，沒有人知道你到底會了多少。
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 40,
          lineHeight: '58px',
          fontWeight: 800,
          color: ACCENT_TXT,
        }}
      >
        → 沒有檢驗，這四步走不完
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * P6 · 靠學生自己，兩條路都堵死 — 橫向條形圖
 * ================================================================== */

const BAR_LABELS = 300;
const BAR_GAP = 24;
const BAR_MAX = 1180; // 58% 對應的像素寬

const HBar: FC<{ label: string; pct: number; value: string; zero?: boolean }> = ({
  label,
  pct,
  value,
  zero,
}) => {
  const w = zero ? 44 : Math.round((pct / 58) * BAR_MAX);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: BAR_GAP,
        height: 36,
        flex: 'none',
      }}
    >
      <div
        style={{
          width: BAR_LABELS,
          flex: 'none',
          fontSize: 28,
          lineHeight: '34px',
          fontWeight: 600,
          color: zero ? AMBER_TXT : 'var(--osd-text)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: w,
          height: 28,
          flex: 'none',
          background: zero ? 'transparent' : ACCENT,
          border: zero ? `2px dashed ${AMBER}` : 'none',
        }}
      />
      <div
        style={{
          fontSize: 24,
          lineHeight: '30px',
          fontWeight: 600,
          color: zero ? AMBER_TXT : DIM,
          fontFamily: NUM,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
    </div>
  );
};

const SelfJudge: FC<{ n: string; label: string }> = ({ n, label }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
    <span
      style={{
        fontFamily: NUM,
        fontSize: 48,
        lineHeight: '56px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: AMBER_TXT,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 28, lineHeight: '36px', fontWeight: 600 }}>{label}</span>
  </div>
);

const P06: Page = () => {
  useDeckStyles();
  return (
    <Frame
      kicker="問題二 · 有效的檢驗"
      title="靠學生自己，兩條路都堵死"
      who="黃浩然"
      note={
        <>
          HEPI (2026). <i>Student Generative AI Survey</i>, Report 199, n = 1,054，英國全日制本科生
          <br />
          Knof, Berndt, Shiozawa et al. (2024). <i>BMC Medical Education</i> 24:1210.
          {'　'}doi:10.1186/s12909-024-06121-7
        </>
      }
    >
      <SectionLabel
        tag="出路一"
        text="自己做檢驗"
        right={
          <span style={{ fontSize: 26, lineHeight: '34px', fontWeight: 700, color: AMBER_TXT }}>
            多數人從不自己做
          </span>
        }
      />

      <div style={{ marginTop: 10, fontSize: 25, lineHeight: '34px', color: MUTED, flex: 'none' }}>
        1,054 名英國全日制本科生，用 AI 做的事（可複選）
      </div>

      <div style={{ marginTop: 12, flex: 'none' }}>
        <HBar label="解釋概念" pct={58} value="58%" />
        <HBar label="總結材料" pct={47} value="47%" />
        <HBar label="研究思路" pct={40} value="40%" />
        <HBar label="組織思路" pct={39} value="39%" />
        <HBar label="搜索" pct={25} value="25%" />
        <HBar label="生成" pct={25} value="25%" />
        <HBar label="直接放進作業" pct={11} value="11%" />
        <HBar label="檢驗我到底學會沒有" pct={0} value="調查未列此項" zero />
      </div>

      <div style={{ margin: '6px 0 10px', flex: 'none' }}>
        <DownArrow />
      </div>

      <SectionLabel
        tag="出路二"
        text="那就檢驗一下"
        right={
          <span style={{ fontSize: 24, lineHeight: '34px', color: DIM }}>
            醫學生自評，N = 426（換了一個樣本）
          </span>
        }
      />

      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 48, flex: 'none' }}>
        <span style={{ fontSize: 28, lineHeight: '36px', fontWeight: 600, color: MUTED }}>
          自己判：
        </span>
        <SelfJudge n="18.5%" label="估準" />
        <SelfJudge n="35.5%" label="高估" />
        <SelfJudge n="46.0%" label="低估" />
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 26,
          lineHeight: '40px',
          color: MUTED,
          flex: 'none',
        }}
      >
        <span style={{ fontWeight: 800, color: AMBER_TXT }}>「元認知錯覺」</span>
        ——你對自己掌握程度的判斷，和真實水平不一致
      </div>

      <div style={{ marginTop: 20, flex: 'none' }}>
        <Bar tone="amber" h={76} size={32}>
          不做，看不到結果；做了，拿到的是自己的錯覺。
        </Bar>
      </div>
    </Frame>
  );
};

/* ================================================================== *
 * P7 · 一題做錯了，四個問題 — 純文字頁
 * ================================================================== */

const Question: FC<{ text: string; last?: boolean }> = ({ text, last }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 92,
      marginBottom: last ? 0 : 24,
      flex: 'none',
    }}
  >
    <div style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT, flex: 'none' }} />
    <span style={{ fontSize: 54, lineHeight: '68px', fontWeight: 700 }}>{text}</span>
  </div>
);

const P07: Page = () => (
  <Frame kicker="問題二 · 有效的檢驗" title="一題做錯了，四個問題" who="黃羿捷">
    <div style={{ paddingLeft: 40, flex: 'none' }}>
      <Steps>
        <Step>
          <Question text="它掛在哪個知識點上？" />
        </Step>
        <Step>
          <Question text="為什麼錯？" />
        </Step>
        <Step>
          <Question text="要補哪一塊？" />
        </Step>
        <Step>
          <Question text="多久之後再問我一次？" last />
        </Step>
      </Steps>
    </div>

    <Steps>
      <Step>
        <div style={{ marginTop: 60, flex: 'none' }}>
          <div style={{ fontSize: 38, lineHeight: '56px', fontWeight: 600, color: MUTED }}>
            現在的產品大多只回答第一個。
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 38,
              lineHeight: '56px',
              fontWeight: 800,
              color: ACCENT_TXT,
            }}
          >
            我們回答四個。
          </div>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * P8 · 我們的檢驗，細在哪四個地方 — 四行表
 * ================================================================== */

const FourRow: FC<{ k: string; do: string; rough: string }> = ({ k, do: how, rough }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'stretch',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${RULE}`,
      height: 150,
      flex: 'none',
    }}
  >
    <div
      style={{
        width: 220,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        fontSize: 36,
        lineHeight: '48px',
        fontWeight: 800,
        color: ACCENT_TXT,
      }}
    >
      {k}
    </div>
    <div
      style={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        fontSize: 34,
        lineHeight: '48px',
        fontWeight: 600,
      }}
    >
      {how}
    </div>
    <div
      style={{
        width: 400,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${RULE}`,
        paddingLeft: 36,
        fontSize: 26,
        lineHeight: '38px',
        fontWeight: 600,
        color: MUTED,
      }}
    >
      {rough}
    </div>
  </div>
);

const P08: Page = () => (
  <Frame
    kicker="問題二 · 有效的檢驗"
    title="我們的檢驗，細在哪四個地方"
    who="黃浩然"
    note={
      <>
        Cepeda, Vul, Rohrer, Wixted &amp; Pashler (2008). <i>Psychological Science</i>{' '}
        19(11):1095–1102. {'　'}doi:10.1111/j.1467-9280.2008.02209.x
        <br />
        原文摘要：最優間隔從「一周後測的 20–40%」遞減到「一年後測的 5–10%」
      </>
    }
  >
    <div style={{ flex: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 44,
          flex: 'none',
        }}
      >
        <div style={{ width: 220, flex: 'none', ...eyebrow }}>做法</div>
        <div style={{ flex: '1 1 auto', padding: '0 40px', ...eyebrow }}>我們怎麼做</div>
        <div
          style={{
            width: 400,
            flex: 'none',
            borderLeft: `1px solid ${RULE}`,
            paddingLeft: 36,
            ...eyebrow,
          }}
        >
          對比的粗話
        </div>
      </div>
      <div style={{ borderTop: `2px solid ${RULE}` }}>
        <FourRow k="測什麼" do="講出來 / 練一遍 / 做出來" rough="不止選擇題" />
        <FourRow k="追溯" do="追溯錯誤本因，追到你真正不會的知識點" rough="不只追到這道題" />
        <FourRow k="給什麼" do="給正確思路，不給答案" rough="不給你抄" />
        <FourRow k="測多久" do="間隔由 AI 推薦，你確認" rough="不是拍腦袋定一個日期" />
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * Notes（與頁面數組逐頁對齊）
 * ================================================================== */

export const notes: (string | undefined)[] = [
  /* 01 */ `開場不要解釋產品，先把兩個問題立起來：一，定制化的課怎麼造；二，學會沒有，靠什麼檢驗。這兩條貫穿全場。
封面只念標題和副標，底部三格（呈／講者／日期）不要逐字念，掃一眼即可。
限時提示：這頁停留不超過 40 秒，講完立刻翻。`,

  /* 02 */ `這一頁只講「定制」，一句話都不要提檢驗。
頂部那句是全頁的地基：老師的注意力是稀缺資源。要講「邊際成本」——多一個學生，老師多花的力氣是一整份；不是「老師不肯」。
措辭禁令：不要說「老師做不到定制」。被追問就答：一位老師照顧一位學生的邊際成本太高，班愈小愈貴，國際學校八人小班就是代價。
動畫節奏：先出左列三條，念完；再出右列三條，念完。不要解釋每一條的因果，聽眾會自己配對。
講者：黃浩然。`,

  /* 03 */ `這頁的功能是讓「按你的」三個字有兌現的動作。
① 上傳資料、說清需求：一句話，帶過。
② 了解現狀、摸清程度：這一條要停。這裡的措辭是中性的——「了解現狀，摸清程度」，不要升級成「AI 精準診斷」，一說出口就是自誇。
小字「傳統課堂永遠不會做這一步」照念，這是全頁最重的一句。
③ 生成課程，帶有檢驗：快速帶過，因為「帶有檢驗」四個字是下一段的伏筆。
右側原型截圖如果還是空的，就用口頭描述四個東西：章節、知識點、語音講解、板書同步。不要指著空白說「這裡之後放」。
落點句照念：課出來了，檢驗算不算數？念完停一拍，直接翻。
講者：黃羿捷。`,

  /* 04 */ `這是「定制」的第二個時刻，上一頁是出課時定內容與起點，這一頁是上課中調節奏。
三條逐條出，一條一頓。
第一條：AI 講解、板書同步推上去。
第二條：打斷、追問、換一種講法。這裡要說清楚「打斷」是節奏——我跟不上你，我就不往下走。
第三條：進度按你的反應走。
措辭禁令（重要）：不要說「答錯」「判斷」「反饋」。這三個詞屬於檢驗那一段，說漏了等於把兩個問題混在一起，下一整段會失效。
視覺上和 P2 右欄同色同句式，可以點一句「這就是剛才右邊那三條」。
講者：黃羿捷。`,

  /* 05 */ `這一頁的功能是把「沒有檢驗」從「我們的偏好」變成「流程本身的必然」。
先說人話：學會一件事要走完四步。標題就這麼簡單，不要用術語開場。
逐條念：喚起先備、示範——這兩步是聽，是輸入。應用、整合——這兩步必須動手。
然後停。落點是這兩句：動手之前，沒有人知道你到底會了多少。沒有檢驗，這四步走不完。
Merrill (2002) 只在腳註，念一句「這四步有出處，來自 Merrill 2002 年的教學設計原則」就夠，不要展開。
措辭禁令：不要說「這是學習者的認知過程」。Merrill 講的是課堂教學設計原則。講成認知過程會被懂行的人當場糾正。
不要畫循環圖。「後兩步必須動手」用分隔線說就夠，畫成回環會被理解成「可以重複任意步」。
講者：黃浩然。`,

  /* 06 */ `全場唯一的數據圖，講慢一點。兩條路必須一起講，分開講第二條就變成順便提一下。
先講樣本：HEPI 2026 年調查，1,054 名英國全日制本科生。這是英國樣本，要主動說明，不要等台下問。
條形圖從上往下念前三名：解釋概念 58%、總結材料 47%、研究思路 40%。後面幾條點過就好。
然後指向最後那條：檢驗我到底學會沒有——調查未列此項。
措辭紀律（重要）：說「調查未列此項」，絕對不要說「0% 的人用它」，也不要說「學生從來沒拿 AI 考過自己」。問卷沒列，不等於沒人做，講錯這一句被追問一次整份 deck 的可信度就完了。
往下：那就檢驗一下。但自己判的準嗎——估準 18.5%、高估 35.5%、低估 46.0%。
「元認知錯覺」這個詞直接用，緊跟一句白話：就是「你對自己掌握程度的判斷，和真實水平不一致」。
落點：不做，看不到結果；做了，拿到的是自己的錯覺。念完停。
出處：HEPI 2026；Knof 等 2024，樣本是醫學教育從業者，講的時候可以帶一句「這個來源是醫學教育的」，主動交代比被問好。
講者：黃浩然。`,

  /* 07 */ `這是全場的呼吸頁，前一頁是密集數據，這一頁幾乎沒有圖形——這是刻意的，不要臨時加東西進來。
四個問句逐條出，每出來一個停一拍，讓聽眾自己數。
一，它掛在哪個知識點上？
二，為什麼錯？
三，要補哪一塊？
四，多久之後再問我一次？
四個出完，停頓。然後兩句結論：現在的產品大多只回答第一個。我們回答四個。
不要解釋四個問句為什麼重要，聽眾自己會得出結論——這是這頁文字多、圖形少的原因。
講者：黃羿捷。`,

  /* 08 */ `收在「細在哪四個地方」，四行逐行念，每行先念做法，再念右邊的粗話。
測什麼：講出來、練一遍、做出來——不止選擇題。
追溯：追到你真正不會的知識點——不只追到這道題。
給什麼：給正確思路，不給答案——不給你抄。停一下，這一條是純 AI 產品的專屬優勢位，同時回答了「AI 到底是加速還是有害」。
測多久：間隔由 AI 推薦，你確認——不是拍腦袋定一個日期。
可上台的推論（念出來）：間隔太短也不是最優，間隔要跟著「你要測多久」來定。這讓我們站在文獻那邊，而不是那句科普裡常見的「越久越好」——後者是錯的。
措辭禁令：不要提「把判斷交給人」之類的安排。本項目不聘教師、不設仲裁，全流程 AI native。
不舉例。三種形式的細節留到下一版，現場被追問就說「形式我們現場示範一次」。
講者：黃浩然。`,
];

/* ================================================================== *
 * Meta
 * ================================================================== */

export const meta: SlideMeta = {
  title: 'Veridex 維學 · 產品部分（青年創業基金口頭報告）',
  createdAt: '2026-09-30T07:40:00.000Z',
};

export default [P01, P02, P03, P04, P05, P06, P07, P08] satisfies Page[];
