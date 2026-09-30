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
import type { CSSProperties, FC, ReactNode } from 'react';

/* ------------------------------------------------------------------ *
 * Design system
 * ------------------------------------------------------------------ */

export const design: DesignSystem = {
  palette: { bg: '#F6F7F9', text: '#0F172A', accent: '#2F6BFF' },
  fonts: {
    display:
      '"PingFang SC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans SC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
    body: '"PingFang SC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans SC","Heiti TC",-apple-system,"Segoe UI",sans-serif',
  },
  typeScale: { hero: 124, body: 33 },
  radius: 14,
};

/* ------------------------------------------------------------------ *
 * Tokens
 * ------------------------------------------------------------------ */

const ACCENT = 'var(--osd-accent)'; // design token — keep in sync with design.palette.accent
const BLUE_SOFT = 'rgba(47,107,255,0.09)';
const BLUE_LINE = 'rgba(47,107,255,0.30)';
const AMBER = '#C07A16'; // status only: 未通过 / 盲点 / 行业停在这里
const AMBER_SOFT = 'rgba(192,122,22,0.11)';
const MUTED = '#5A6675';
const DIM = '#6B7684';
const RULE = '#DFE3E9';
const PANEL = '#FFFFFF';
const GREY_SOFT = 'rgba(15,23,42,0.045)';

const NUM = '"Inter","SF Pro Display","Segoe UI",system-ui,-apple-system,sans-serif';

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 260,
    delay: 60,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Shared parts
 * ------------------------------------------------------------------ */

const Foot: FC<{ handoff?: string }> = ({ handoff }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 22,
        color: DIM,
        letterSpacing: '0.02em',
      }}
    >
      {/* name lives top-right on every page — 題目指引 requires it for 導師辨識 */}
      <span style={{ fontWeight: 600 }}>{handoff ?? ''}</span>
      <span style={{ fontFamily: NUM, fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Frame: FC<{
  kicker: string;
  title: ReactNode;
  lead?: string;
  who: string;
  handoff?: string;
  note?: string;
  children: ReactNode;
}> = ({ kicker, title, lead, who, handoff, note, children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
      padding: '84px 120px 92px',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 22,
        letterSpacing: '0.22em',
        color: MUTED,
        fontWeight: 600,
      }}
    >
      <span style={{ color: ACCENT, letterSpacing: '0.22em' }}>{kicker}</span>
      <span style={{ letterSpacing: '0.04em' }}>{who}</span>
    </div>

    <h2
      style={{
        margin: '24px 0 0',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 64,
        fontWeight: 800,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        maxWidth: 1520,
      }}
    >
      {title}
    </h2>

    {lead && (
      <p
        style={{
          margin: '16px 0 0',
          fontSize: 'var(--osd-size-body)',
          lineHeight: 1.5,
          color: MUTED,
          maxWidth: 1400,
        }}
      >
        {lead}
      </p>
    )}

    <div style={{ marginTop: 42 }}>{children}</div>

    {note && (
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 82,
          fontSize: 20,
          lineHeight: 1.45,
          color: DIM,
          maxWidth: 1440,
        }}
      >
        {note}
      </div>
    )}

    <Foot handoff={handoff} />
  </div>
);

const Card: FC<{
  w: number;
  h: number;
  accent?: string;
  eyebrow?: string;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ w, h, accent, eyebrow, children, style }) => (
  <div
    style={{
      width: w,
      height: h,
      boxSizing: 'border-box',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${RULE}`,
      background: PANEL,
      padding: '26px 28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 12,
      ...style,
    }}
  >
    {eyebrow && (
      <span
        style={{
          fontSize: 21,
          letterSpacing: '0.06em',
          fontWeight: 600,
          color: accent ?? MUTED,
        }}
      >
        {eyebrow}
      </span>
    )}
    {children}
  </div>
);

const Callout: FC<{ children: ReactNode; w?: number; accent?: string }> = ({
  children,
  w,
  accent = AMBER,
}) => (
  <div
    style={{
      width: w ?? '100%',
      boxSizing: 'border-box',
      borderLeft: `4px solid ${accent}`,
      background: accent === ACCENT ? BLUE_SOFT : AMBER_SOFT,
      padding: '20px 28px',
      fontSize: 30,
      lineHeight: 1.5,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

const BigNum: FC<{ n: string; unit?: string; accent?: string; size?: number }> = ({
  n,
  unit,
  accent = ACCENT,
  size = 78,
}) => (
  <span
    style={{
      fontFamily: NUM,
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: accent,
      fontVariantNumeric: 'tabular-nums',
    }}
  >
    {n}
    {unit && (
      <span style={{ fontSize: 27, fontWeight: 600, marginLeft: 5, letterSpacing: 0 }}>{unit}</span>
    )}
  </span>
);

/* ================================================================== *
 * 01 · 封面
 * ================================================================== */

const P01: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
      padding: '96px 120px 88px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 52,
        border: `1px solid ${RULE}`,
        borderRadius: 20,
        pointerEvents: 'none',
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: NUM, fontSize: 38, fontWeight: 800, letterSpacing: '0.16em', color: ACCENT }}>
        VERIDEX
      </span>
      <span style={{ fontSize: 22, letterSpacing: '0.22em', color: MUTED, fontWeight: 600 }}>維學</span>
    </div>

    <div style={{ maxWidth: 1500 }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        把「学会」
        <br />
        变成一件可以被检验的事
      </h1>
      <p style={{ margin: '32px 0 0', fontSize: 34, lineHeight: 1.5, color: MUTED }}>
        你的第一个 AI 个人课堂
      </p>
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        fontSize: 24,
        color: MUTED,
        lineHeight: 1.6,
      }}
    >
      <span>
        呈：青年創業基金委員會
        <br />
        講者：黃浩然、黃羿捷
      </span>
      <span style={{ fontFamily: NUM, letterSpacing: '0.04em' }}>2026 · 10 · 16</span>
    </div>
  </div>
);

/* ================================================================== *
 * 02 · 开场
 * ================================================================== */

const P02: Page = () => (
  <Frame kicker="開場" title="AI 加速了所有行业" who="黃浩然">
    <div style={{ maxWidth: 1620, display: 'flex', flexDirection: 'column', gap: 38 }}>
      <Steps>
        <Step>
          <p style={{ margin: 0, fontSize: 50, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.01em' }}>
            醫生用 AI 看片子，律師用 AI 查案例，工程師用 AI 寫程式。
          </p>
        </Step>
        <Step>
          <p style={{ margin: 0, fontSize: 50, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.01em' }}>
            但每個人要學的東西，只有自己學。
            <br />
            <span style={{ color: ACCENT }}>AI 有沒有加速過一個人的學習？</span>
          </p>
        </Step>
        <Step>
          <div style={{ display: 'flex', gap: 28, paddingTop: 10 }}>
            <Card w={812} h={200} accent={ACCENT} eyebrow="有人說：有">
              <span style={{ fontSize: 30, lineHeight: 1.5, color: MUTED }}>
                找答案快了、講解快了、做題有人講了、講義變成閃卡了。
              </span>
            </Card>
            <Card w={812} h={200} accent={AMBER} eyebrow="也有人說：有害">
              <span style={{ fontSize: 30, lineHeight: 1.5, color: MUTED }}>
                答案太容易拿到，於是不再想；講解太容易聽懂，於是不再記。
              </span>
            </Card>
          </div>
        </Step>
        <Step>
          <Callout w={1620}>
            我們今天想回答的不是 AI 好不好用，而是——
            <br />
            <span style={{ color: AMBER }}>一個人學會一件事，到底需要經過什麼？</span>
          </Callout>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 03 · 学习的本质：一个循环
 * ================================================================== */

const StageBox: FC<{ w: number; label: string; desc: string; dim?: boolean }> = ({
  w,
  label,
  desc,
  dim,
}) => (
  <div
    style={{
      width: w,
      boxSizing: 'border-box',
      border: `1px solid ${dim ? RULE : BLUE_LINE}`,
      background: dim ? GREY_SOFT : PANEL,
      borderRadius: 12,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}
  >
    <span style={{ fontSize: 29, fontWeight: 800, color: dim ? MUTED : 'var(--osd-text)' }}>
      {label}
    </span>
    <span style={{ fontSize: 22, lineHeight: 1.4, color: DIM }}>{desc}</span>
  </div>
);

const P03: Page = () => (
  <Frame
    kicker="學習的本質"
    title="学习不是一条线，是一个循环"
    lead="如果它是一条线：听讲 → 理解 → 考好。但每个人都知道，那条线走不通。"
    who="黃浩然"
    note="WIDS《Learning is not Linear, it's Cyclical》：學習循環為動機 → 理解 → 練習 → 應用。加涅（R. M. Gagné）信息加工学习理论：学习过程分准备、操作、迁移三部分，以「反馈」阶段闭合循环。"
  >
    <div style={{ display: 'flex', gap: 40, alignItems: 'stretch' }}>
      <div
        style={{
          flex: 1,
          border: `1px solid ${RULE}`,
          borderRadius: 12,
          background: GREY_SOFT,
          padding: '30px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 600, color: MUTED }}>如果是一条线</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <StageBox w={132} label="听讲" dim />
          <span style={{ color: DIM, fontSize: 24 }}>→</span>
          <StageBox w={132} label="理解" dim />
          <span style={{ color: DIM, fontSize: 24 }}>→</span>
          <StageBox w={132} label="考好" dim />
          <span style={{ color: DIM, fontSize: 24 }}>✓</span>
        </div>
        <span style={{ fontSize: 24, lineHeight: 1.5, color: DIM, marginTop: 'auto' }}>
          走完就结束，没有下一步。
        </span>
      </div>

      <div
        style={{
          flex: 1,
          border: `1px solid ${BLUE_LINE}`,
          borderRadius: 12,
          background: BLUE_SOFT,
          padding: '30px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 600, color: ACCENT }}>实际是一个循环</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <StageBox w={132} label="动机" />
          <span style={{ color: ACCENT, fontSize: 24 }}>→</span>
          <StageBox w={132} label="理解" />
          <span style={{ color: ACCENT, fontSize: 24 }}>→</span>
          <StageBox w={132} label="练习" />
          <span style={{ color: ACCENT, fontSize: 24 }}>→</span>
          <StageBox w={132} label="应用" />
        </div>
        <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED, marginTop: 'auto' }}>
          用完之后，经验回到起点，驱动下一轮。WIDS 的原话是：
          <span style={{ fontWeight: 700, color: 'var(--osd-text)' }}>「我们需要在时间和重复中学习。」</span>
        </span>
      </div>
    </div>

    <div style={{ marginTop: 34 }}>
      <Callout w={1660} accent={ACCENT}>
        循环的第四格叫<span style={{ color: ACCENT }}>应用</span>——而它必须回头连回第一格。
        <br />
        这一格有没有人接，决定了整圈是循环，还是一条断掉的线。
      </Callout>
    </div>
  </Frame>
);

/* ================================================================== *
 * 04 · 循环在哪里断了
 * ================================================================== */

const P04: Page = () => (
  <Frame
    kicker="學習的本質 · 斷口"
    title="循环在哪里断了"
    lead="四格的前三格，行业都做得不错。断在回头的那一格。"
    who="黃浩然"
    note="斷口位置依 WIDS 學習循環與加涅信息加工学习理论的「反馈」阶段判定。下一页逐项对照行业现状。"
  >
    <div style={{ position: 'relative', height: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
        <StageBox w={360} label="动机" desc="为什么要学" />
        <span style={{ color: ACCENT, fontSize: 30 }}>→</span>
        <StageBox w={360} label="理解" desc="听懂了" />
        <span style={{ color: ACCENT, fontSize: 30 }}>→</span>
        <StageBox w={360} label="练习" desc="做过题" />
        <span style={{ color: AMBER, fontSize: 30 }}>→</span>
        <StageBox w={360} label="应用" desc="换个情境还做得出" />
      </div>

      <svg
        width={1660}
        height={180}
        viewBox="0 0 1660 180"
        style={{ position: 'absolute', left: 0, top: 230 }}
      >
        <defs>
          <marker id="brk" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
          </marker>
        </defs>
        {/* right leg + right run — stops short of the break */}
        <path d="M1414,4 L1414,70 Q1414,100 1384,100 L886,100" stroke={ACCENT} strokeWidth={3} fill="none" />
        {/* left run + left leg — arrow back into 动机 */}
        <path
          d="M774,100 L230,100 Q200,100 200,70 L200,6"
          stroke={ACCENT}
          strokeWidth={3}
          fill="none"
          markerEnd="url(#brk)"
        />
        {/* THE BREAK — two amber chevrons, unmistakable */}
        <path d="M884,82 L848,100 L884,118" stroke={AMBER} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M776,82 L812,100 L776,118" stroke={AMBER} strokeWidth={5} fill="none" strokeLinecap="round" />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 356,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 18,
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 800, color: AMBER }}>回头这一格，行业是空的</span>
        <span style={{ fontSize: 26, color: MUTED }}>
          用完之后，没有人告诉你这次到底学会了没有
        </span>
      </div>
    </div>

    <div style={{ marginTop: 26 }}>
      <Steps>
        <Step>
          <Callout w={1660} accent={ACCENT}>
            Veridex 做这一格：<span style={{ color: ACCENT }}>验完之后，判断下一次该学什么</span>。
          </Callout>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 05 · 传统课堂的问题
 * ================================================================== */

const ProblemRow: FC<{ n: string; title: string; desc: string }> = ({ n, title, desc }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
    <span style={{ fontFamily: NUM, fontSize: 24, fontWeight: 700, color: AMBER, paddingTop: 4, width: 30 }}>
      {n}
    </span>
    <div>
      <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>{title}</div>
      <div style={{ fontSize: 24, lineHeight: 1.45, color: MUTED, marginTop: 4 }}>{desc}</div>
    </div>
  </div>
);

const P05: Page = () => (
  <Frame
    kicker="現有的學習形式"
    title="四个已知的学习形式，都停在那一格之前"
    lead="问题不在「没有工具」，在每个形式都只覆盖循环的前半段。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 44 }}>
      <div
        style={{
          width: 560,
          flexShrink: 0,
          border: `1px solid ${RULE}`,
          borderRadius: 12,
          background: PANEL,
          padding: '28px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <span style={{ fontSize: 25, fontWeight: 700, color: MUTED, letterSpacing: '0.06em' }}>
          一對多的傳統課堂 · 效率最低
        </span>
        <ProblemRow n="1" title="老师精力分散" desc="一个班几十人，没法清楚掌握每个人到底会了什么" />
        <ProblemRow n="2" title="学生自己判断掌握情况" desc="学之外的认知负担，全压在学生自己身上" />
        <ProblemRow n="3" title="反馈不及时" desc="作业收上来要几天，问题早就忘了" />
        <ProblemRow n="4" title="进度只有一条" desc="每个人的节奏不一样，一条进度必然牺牲掉一部分人" />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card w={1076} h={148} accent={MUTED} eyebrow="自學 · 一對一">
          <span style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.35 }}>进度跟着你，反馈也快</span>
          <span style={{ fontSize: 24, lineHeight: 1.45, color: MUTED }}>
            唯一的代价：香港市场约每小时 400–600 港元，只有需要加速的人才买得起。
          </span>
        </Card>
        <Card w={1076} h={148} accent={MUTED} eyebrow="線上課 · 錄播">
          <span style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.35 }}>内容很好，但讲完就结束</span>
          <span style={{ fontSize: 24, lineHeight: 1.45, color: MUTED }}>
            没有人在你学完之后回来，问你到底会用没有。
          </span>
        </Card>
        <Card w={1076} h={148} accent={AMBER} eyebrow="AI 工具 · 2023 之后">
          <span style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.35, color: 'var(--osd-text)' }}>
            前三格几乎被填满了
          </span>
          <span style={{ fontSize: 24, lineHeight: 1.45, color: MUTED }}>
            找得到、讲得懂、出得了题。第四格——有没有人替你接上——几乎没人做。
          </span>
        </Card>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 06 · 行业逐项 + 致命问题
 * ================================================================== */

const Rival: FC<{ name: string; when: string; solved: string; stage: string; left: string }> = ({
  name,
  when,
  solved,
  stage,
  left,
}) => (
  <div
    style={{
      flex: 1,
      border: `1px solid ${RULE}`,
      borderRadius: 12,
      background: PANEL,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 30, fontWeight: 800 }}>{name}</span>
      <span style={{ fontFamily: NUM, fontSize: 21, color: DIM }}>{when}</span>
    </div>
    <div>
      <div style={{ fontSize: 19, color: DIM, marginBottom: 3 }}>解决了</div>
      <div style={{ fontSize: 24, lineHeight: 1.4 }}>{solved}</div>
    </div>
    <div>
      <div style={{ fontSize: 19, color: DIM, marginBottom: 3 }}>对应循环</div>
      <div style={{ fontSize: 24, lineHeight: 1.4, color: ACCENT, fontWeight: 600 }}>{stage}</div>
    </div>
    <div style={{ marginTop: 'auto', borderTop: `1px solid ${RULE}`, paddingTop: 12 }}>
      <div style={{ fontSize: 19, color: DIM, marginBottom: 3 }}>遗留</div>
      <div style={{ fontSize: 24, lineHeight: 1.4, color: MUTED }}>{left}</div>
    </div>
  </div>
);

const P06: Page = () => (
  <Frame
    kicker="行業 · 逐項"
    title="四家加起来，第四格还是空的"
    who="黃浩然"
    note="Hyperknow 公開評測記錄了「消息遺失、無法導出或重新生成、投影片輸出成 JSON、教學影片卡住」等問題。OpenMAIC 為清華大學 THU-MIC 團隊開源（AGPL-3.0）。"
  >
    <div style={{ display: 'flex', gap: 22 }}>
      <Rival
        name="DeepLearning.AI"
        when="2017"
        solved="把一项技能拆成能上线的短课"
        stage="理解"
        left="讲完即止，没有人知道你学没学"
      />
      <Rival
        name="ChatGPT"
        when="2022"
        solved="把提问成本降到零"
        stage="理解"
        left="你问什么它答什么，不知道你该问什么"
      />
      <Rival
        name="Hyperknow"
        when="2025"
        solved="讲义变测验闪卡，自动排学习日程"
        stage="理解 + 练习"
        left="测验测的是记得住，不是换情境还做得出"
      />
      <Rival
        name="OpenMAIC"
        when="2026"
        solved="多智能体互动课堂，清华校内 500 余人试用"
        stage="理解 + 练习"
        left="进度是它给的，不是你的；课后没有回访"
      />
    </div>

    <div style={{ marginTop: 34 }}>
      <Callout w={1660}>
        <span style={{ color: AMBER }}>致命问题：</span>
        四家把前三格越做越扎实，但没有任何一家在第四格站住——
        <br />
        没有人替你验完之后，<span style={{ color: AMBER }}>判断下一次该学什么</span>。
      </Callout>
    </div>
  </Frame>
);

/* ================================================================== *
 * 07 · 最小闭环 + Agent 角色
 * ================================================================== */

const Agent: FC<{ tag: string; role: string; does: string }> = ({ tag, role, does }) => (
  <div
    style={{
      flex: 1,
      border: `1px solid ${BLUE_LINE}`,
      borderRadius: 12,
      background: BLUE_SOFT,
      padding: '24px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <span style={{ fontFamily: NUM, fontSize: 20, fontWeight: 700, color: ACCENT }}>{tag}</span>
    <span style={{ fontSize: 30, fontWeight: 800 }}>{role}</span>
    <span style={{ fontSize: 24, lineHeight: 1.45, color: MUTED }}>{does}</span>
  </div>
);

const P07: Page = () => (
  <Frame
    kicker="產品 · 最小閉環"
    title="Veridex 的最小闭环"
    lead="一条链走完一圈：成课 → 上课 → 验收 → 没验过就回溯补教 → 验过才往下。"
    who="黃羿捷"
    handoff="講者：黃羿捷"
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            padding: '18px 26px', border: `1px solid ${BLUE_LINE}`, background: PANEL,
            borderRadius: 12, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap',
          }}
        >
          成课
        </div>
        <span style={{ color: DIM, fontSize: 26 }}>→</span>
        <div
          style={{
            padding: '18px 26px', border: `1px solid ${BLUE_LINE}`, background: PANEL,
            borderRadius: 12, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap',
          }}
        >
          上课
        </div>
        <span style={{ color: DIM, fontSize: 26 }}>→</span>
        <div
          style={{
            padding: '18px 26px', border: `1px solid ${BLUE_LINE}`, background: PANEL,
            borderRadius: 12, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap',
          }}
        >
          验收
        </div>
        <span style={{ color: DIM, fontSize: 26 }}>→</span>
        <div
          style={{
            padding: '18px 26px', border: `1px solid ${BLUE_LINE}`, background: PANEL,
            borderRadius: 12, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap',
          }}
        >
          回溯补教
        </div>
        <span style={{ color: DIM, fontSize: 26 }}>→</span>
        <div
          style={{
            padding: '18px 26px', border: `1px solid ${AMBER}`, background: AMBER_SOFT,
            borderRadius: 12, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap',
          }}
        >
          回到起点
        </div>
      </div>
      <span style={{ color: AMBER, fontSize: 26 }}>↺</span>
    </div>

    <div style={{ marginTop: 40 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginBottom: 14, letterSpacing: '0.06em' }}>
        三個 AI Agent，各自負責一段
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Agent tag="AGENT 01" role="成课 Agent" does="把你的资料或一句主题，拆成章节与知识点" />
        <Agent tag="AGENT 02" role="授课 Agent" does="1 对 1 讲解，随时可打断、追问、要求换一种讲法" />
        <Agent tag="AGENT 03" role="验收 Agent" does="出题、判卷，并指出你错在哪一步" />
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 08 · 成课与课堂
 * ================================================================== */

const P08: Page = () => (
  <Frame kicker="產品 · 入口與課堂" title="课从哪来，上课怎么上" who="黃羿捷">
    <div style={{ display: 'flex', gap: 44 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, letterSpacing: '0.06em' }}>
          三種方式進來
        </div>
        <Card w={780} h={130} eyebrow="說一句">
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>
            丢一个主题进去：「把中央極限定理講清楚。」
          </span>
        </Card>
        <Card w={780} h={130} eyebrow="傳一份資料">
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>讲义、笔记、作业，按你自己的材料成课。</span>
        </Card>
        <Card w={780} h={130} eyebrow="同步你已有的">
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>Notion、Google Drive、校园 LMS。</span>
        </Card>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, letterSpacing: '0.06em' }}>
          課上發生什麼
        </div>
        <Steps>
          <Step>
            <Card w={780} h={130} accent={ACCENT} eyebrow="01">
              <span style={{ fontSize: 27, lineHeight: 1.45 }}>AI 讲解，白板板书同步推。</span>
            </Card>
          </Step>
          <Step>
            <Card w={780} h={130} accent={ACCENT} eyebrow="02">
              <span style={{ fontSize: 27, lineHeight: 1.45 }}>
                随时打断、追问、要求换一种讲法。
              </span>
            </Card>
          </Step>
          <Step>
            <Card w={780} h={130} accent={AMBER} eyebrow="03">
              <span style={{ fontSize: 27, lineHeight: 1.45 }}>没验过，下一节不开。</span>
            </Card>
          </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 09 · 验收：三种形式
 * ================================================================== */

const P09: Page = () => (
  <Frame
    kicker="產品 · 驗收"
    title="三种验收，各抓一种「假装会了」"
    lead="第四格不是一个测验，是三种形式叠在一起。"
    who="黃羿捷"
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Card w={546} h={236} accent={ACCENT} eyebrow="讲出来">
        <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.3 }}>输出</span>
        <span style={{ fontSize: 25, lineHeight: 1.45, color: MUTED }}>
          能不能用自己的话讲清楚、讲给谁听。
        </span>
        <span style={{ fontSize: 23, lineHeight: 1.45, color: ACCENT, marginTop: 'auto' }}>
          抓：你只是背得很顺
        </span>
      </Card>
      <Card w={546} h={236} accent={ACCENT} eyebrow="练一遍">
        <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.3 }}>课后练习</span>
        <span style={{ fontSize: 25, lineHeight: 1.45, color: MUTED }}>
          过一遍，反馈带解释，不只给对错。
        </span>
        <span style={{ fontSize: 23, lineHeight: 1.45, color: ACCENT, marginTop: 'auto' }}>
          抓：记得住，但调不出来
        </span>
      </Card>
      <Card w={546} h={236} accent={ACCENT} eyebrow="做出来">
        <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.3 }}>项目</span>
        <span style={{ fontSize: 25, lineHeight: 1.45, color: MUTED }}>
          你自己做的项目，AI 按标准打分。
        </span>
        <span style={{ fontSize: 23, lineHeight: 1.45, color: ACCENT, marginTop: 'auto' }}>
          抓：原题会做，换情境就废
        </span>
      </Card>
    </div>

    <div style={{ marginTop: 38 }}>
      <Steps>
        <Step>
          <div style={{ display: 'flex', gap: 56, alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 32, lineHeight: 1.45, fontWeight: 700, flex: 1 }}>
              一个形式只能抓一种「装懂」。三种一起，「学会了」这个判断才站得住。
            </p>
            <div
              style={{
                flexShrink: 0,
                borderLeft: `4px solid ${AMBER}`,
                background: AMBER_SOFT,
                padding: '18px 26px',
                fontSize: 28,
                lineHeight: 1.45,
                fontWeight: 600,
              }}
            >
              30 天后，再来一次。
            </div>
          </div>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 10 · 追根溯源
 * ================================================================== */

const P10: Page = () => (
  <Frame
    kicker="產品 · 回溯"
    title="没验过，就往回找"
    lead="你错的不是这一题，是往下那几题。一直找到你真正不会的那一点。"
    who="黃羿捷"
    note="RPKT：递归前置知识追踪，实时回溯前置概念直至学习者的真实知识边界（IEEE FMLDS 2025）。"
  >
    <div style={{ display: 'flex', gap: 72, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 20,
            borderLeft: `3px solid ${BLUE_LINE}`, paddingLeft: 22, paddingVertical: 13,
          }}
        >
          <span style={{ fontSize: 29, fontWeight: 700 }}>第 3 章 · 中央極限定理</span>
          <span style={{ fontSize: 24, color: AMBER, fontWeight: 600 }}>← 你答錯的題</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', borderLeft: `3px solid ${BLUE_LINE}`, paddingLeft: 44, paddingVertical: 13 }}>
          <span style={{ fontSize: 29, fontWeight: 700, color: MUTED }}>前置 · 樣本平均與期望</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', borderLeft: `3px solid ${BLUE_LINE}`, paddingLeft: 66, paddingVertical: 13 }}>
          <span style={{ fontSize: 29, fontWeight: 700, color: MUTED }}>前置 · 分佈的加法</span>
        </div>
        <div
          style={{
            display: 'flex', alignItems: 'center',
            borderLeft: `3px solid ${AMBER}`, paddingLeft: 88, paddingVertical: 15,
            background: AMBER_SOFT, borderRadius: '0 10px 10px 0',
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 800 }}>真正的盲點 · 分式運算</span>
        </div>
      </div>

      <div style={{ width: 600, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 14 }}>
        <p style={{ margin: 0, fontSize: 29, lineHeight: 1.55, color: MUTED }}>
          線代學不好、機率學不好，源頭常常不在高深的概念上。
        </p>
        <div style={{ borderTop: `2px solid ${RULE}`, paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 33, fontWeight: 800 }}>只补那一点</span>
          <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
            不重讲全课。补完重验，验过了才往下走。
          </span>
        </div>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 11 · 验收引擎怎么判
 * ================================================================== */

const P11: Page = () => (
  <Frame kicker="產品 · 判定" title="判定不只给对错" who="黃羿捷">
    <div style={{ display: 'flex', gap: 52, alignItems: 'flex-start' }}>
      <ImagePlaceholder
        hint="Veridex 驗收頁截圖：判定錯誤、列出兩處需修正、給出正確思路、鎖定下一章"
        width={840}
        height={486}
        style={{ borderRadius: 14, flexShrink: 0 }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 6 }}>
        <Steps>
          <Step>
            <p style={{ margin: 0, fontSize: 29, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>01</span>
              告诉你错在哪一步
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 29, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>02</span>
              告诉你为什么会错
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 29, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>03</span>
              给你正确思路，不给答案
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 29, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>04</span>
              没验过，下一节锁住
            </p>
          </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 12 · 降低认知负担
 * ================================================================== */

const P12: Page = () => (
  <Frame
    kicker="產品 · 負擔"
    title="学习之外的活，不该由学生干"
    lead="这些事今天都要学生自己扛：决定学什么、判断自己懂了没有、记住什么时候该复习。"
    who="黃羿捷"
    note="认知负荷理论：Sweller (1988), Cognitive Science 12(2): 257–285；Sweller, van Merriënboer & Paas (2019), Educational Psychology Review 31: 261–292。"
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Card w={812} h={252} accent={MUTED} eyebrow="今天 · 學生要自己做">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>自己决定该学什么</span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>自己判断有没有听懂</span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>自己记住什么时候该复习</span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>自己排进日程</span>
        </div>
      </Card>

      <Card w={812} h={252} accent={ACCENT} eyebrow="Veridex · 接管这四件">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>
            <span style={{ color: ACCENT, fontWeight: 700 }}>成课 Agent</span>　按你的资料排出下一步
          </span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>
            <span style={{ color: ACCENT, fontWeight: 700 }}>验收 Agent</span>　判定代替自我评判
          </span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>
            <span style={{ color: ACCENT, fontWeight: 700 }}>间隔重复</span>　在快要忘掉时叫你
          </span>
          <span style={{ fontSize: 27, lineHeight: 1.45 }}>
            <span style={{ color: ACCENT, fontWeight: 700 }}>日程</span>　自动排，不用手动跟
          </span>
        </div>
      </Card>
    </div>

    <div style={{ marginTop: 36 }}>
      <Callout w={1660} accent={ACCENT}>
        学生的负担降到一件事：<span style={{ color: ACCENT }}>把它打开，做完，看结果</span>。
      </Callout>
    </div>
  </Frame>
);

/* ================================================================== *
 * 13 · 三个数字
 * ================================================================== */

const P13: Page = () => (
  <Frame
    kicker="承諾"
    title="三个数字"
    lead="我们承诺被这三个数字检验。这是承诺值，不是已经测出来的结果。"
    who="黃羿捷"
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Card w={546} h={210} accent={ACCENT} eyebrow="行為 · 14 天任務完成率">
        <BigNum n="≥ 50" unit="%" />
        <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>你到底做没做</span>
      </Card>
      <Card w={546} h={210} accent={ACCENT} eyebrow="成果 · 前測後測差異">
        <BigNum n="≥ 20" unit="%" />
        <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>学之前与学之后差多少</span>
      </Card>
      <Card w={546} h={210} accent={AMBER} eyebrow="延遲 · 30 天後回訪">
        <BigNum n="≥ 70" unit="%" accent={AMBER} />
        <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>一个月后还记得多少</span>
      </Card>
    </div>

    <div style={{ marginTop: 40 }}>
      <Steps>
        <Step>
          <Callout w={1660}>
            这些分不由我们打。
            <br />
            试点学校的<span style={{ color: AMBER }}>授课教师出题、评分</span>；我们只出系统、记过程、出报告。
          </Callout>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 14 · 你的资料
 * ================================================================== */

const P14: Page = () => (
  <Frame
    kicker="凭什么信你"
    title="你的资料，我们怎么保管"
    lead="你放进来的这三样，正好是你最不想交出去的三样。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Card w={812} h={372} eyebrow="我们接什么">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 6 }}>
          <div>
            <span style={{ fontSize: 31, fontWeight: 700 }}>校园 LMS</span>
            <span style={{ fontSize: 24, color: MUTED, marginLeft: 16 }}>课程材料与进度</span>
          </div>
          <div>
            <span style={{ fontSize: 31, fontWeight: 700 }}>本地资料</span>
            <span style={{ fontSize: 24, color: MUTED, marginLeft: 16 }}>讲义、笔记、作业</span>
          </div>
          <div>
            <span style={{ fontSize: 31, fontWeight: 700 }}>Notion · Google Drive</span>
            <span style={{ fontSize: 24, color: MUTED, marginLeft: 16 }}>你已经整理好的东西</span>
          </div>
        </div>
      </Card>

      <Card w={812} h={372} accent={ACCENT} eyebrow="我们怎么做">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 6 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 23, color: ACCENT, fontWeight: 700 }}>01</span>
            <span style={{ fontSize: 29, lineHeight: 1.4 }}>数据不出境</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 23, color: ACCENT, fontWeight: 700 }}>02</span>
            <span style={{ fontSize: 29, lineHeight: 1.4 }}>分户隔离，你只能看自己的</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 23, color: ACCENT, fontWeight: 700 }}>03</span>
            <span style={{ fontSize: 29, lineHeight: 1.4 }}>访问令牌有时效</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 23, color: ACCENT, fontWeight: 700 }}>04</span>
            <span style={{ fontSize: 29, lineHeight: 1.4 }}>每次导出留审计记录</span>
          </div>
        </div>
      </Card>
    </div>
  </Frame>
);

/* ================================================================== *
 * 15 · 面向人群
 * ================================================================== */

const P15: Page = () => (
  <Frame
    kicker="營收 · 面向人群"
    title="能力是泛的，付费意愿是分的"
    lead="AI 能服务任何人，但不会为所有人同样地付钱。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Card w={812} h={268} accent={MUTED} eyebrow="能力侧 · 不设限">
        <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>同一套系统可以服务</span>
        <span style={{ fontSize: 25, lineHeight: 1.6, color: MUTED }}>
          中学生 · 大学生 · 职场转行者 · 语言学习者
          <br />
          考试、考证、转行、兴趣——目标不同，机制一样。
        </span>
      </Card>

      <Card w={812} h={268} accent={AMBER} eyebrow="收费侧 · 我们只做一类">
        <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35, color: 'var(--osd-text)' }}>
          有明确目标 · 有截止日期 · 愿意为结果付钱
        </span>
        <span style={{ fontSize: 25, lineHeight: 1.6, color: MUTED }}>
          「随便学学」不收钱，也不值得收。收费产品的第一条筛子，
          <br />
          是对方自己有没有在赶一个日子。
        </span>
      </Card>
    </div>

    <div style={{ marginTop: 34 }}>
      <Callout w={1660} accent={ACCENT}>
        首年主攻<span style={{ color: ACCENT }}>香港与内地大学生</span>：目标最清晰、付费意愿最高、验证周期最短。
      </Callout>
    </div>
  </Frame>
);

/* ================================================================== *
 * 16 · 定价三版
 * ================================================================== */

const Bullet: FC<{ hot: boolean; children: ReactNode }> = ({ hot, children }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
    <span style={{ fontSize: 20, color: hot ? ACCENT : DIM }}>·</span>
    <span style={{ fontSize: 24, lineHeight: 1.4 }}>{children}</span>
  </div>
);

const Tier: FC<{
  name: string;
  price: string;
  per: string;
  tagline: string;
  hot?: boolean;
  children: ReactNode;
}> = ({ name, price, per, tagline, hot, children }) => (
  <div
    style={{
      width: 546,
      height: 480,
      boxSizing: 'border-box',
      border: `2px solid ${hot ? ACCENT : RULE}`,
      borderRadius: 14,
      background: hot ? BLUE_SOFT : PANEL,
      padding: '30px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 30, fontWeight: 800, color: hot ? ACCENT : 'var(--osd-text)' }}>{name}</span>
      {hot && (
        <span style={{ fontSize: 20, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em' }}>主力</span>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span
        style={{
          fontFamily: NUM,
          fontSize: 62,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: hot ? ACCENT : 'var(--osd-text)',
        }}
      >
        {price}
      </span>
      <span style={{ fontSize: 24, color: MUTED }}>{per}</span>
    </div>
    <div style={{ fontSize: 24, lineHeight: 1.45, color: hot ? ACCENT : MUTED, fontWeight: 600 }}>{tagline}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>{children}</div>
  </div>
);

const P16: Page = () => (
  <Frame
    kicker="營收 · 定價"
    title="三档：免费 · Pro · Max"
    lead="每档都有固定积分额度，额度按月重置。积分限制的是成本，不是功能。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 22 }}>
      <Tier
        name="免费"
        price="HK$0"
        per="/ 月"
        tagline="每月固定积分，够跑完一次完整验收"
      >
        <Bullet hot={false}>可以体验全部三种验收形式</Bullet>
        <Bullet hot={false}>可以上传自己的资料成课</Bullet>
        <Bullet hot={false}>不提供项目打分</Bullet>
        <Bullet hot={false}>不做 30 天延迟回访</Bullet>
      </Tier>
      <Tier
        name="Pro"
        price="HK$78"
        per="/ 月"
        tagline="日常学习：多门课在跑，验收随时可用"
        hot
      >
        <Bullet hot>积分约为免费版 6 倍</Bullet>
        <Bullet hot>解锁项目打分</Bullet>
        <Bullet hot>解锁 30 天延迟回访</Bullet>
        <Bullet hot>进度与 Notion / 日历同步</Bullet>
      </Tier>
      <Tier
        name="Max"
        price="HK$150"
        per="/ 月"
        tagline="重度与作品集：同时跑多门，用更重的模型"
      >
        <Bullet hot={false}>积分约为 Pro 的 2.5 倍</Bullet>
        <Bullet hot={false}>大模型优先，复杂题更准</Bullet>
        <Bullet hot={false}>课程数量不限</Bullet>
        <Bullet hot={false}>可导出学习记录与作品</Bullet>
      </Tier>
    </div>
  </Frame>
);

/* ================================================================== *
 * 17 · 为什么这样定价
 * ================================================================== */

const PriceRow: FC<{ name: string; price: string; us: boolean }> = ({ name, price, us }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '9px 0' }}>
    <span style={{ flex: 1, fontSize: 26 }}>{name}</span>
    <span
      style={{
        fontFamily: NUM,
        fontSize: 27,
        fontWeight: 600,
        color: us ? MUTED : ACCENT,
        width: 150,
        textAlign: 'right',
      }}
    >
      {price}
    </span>
  </div>
);

const P17: Page = () => (
  <Frame
    kicker="營收 · 定價理由"
    title="为什么这样切档"
    lead="定价不是算出来的，是从「别人卡在哪」倒推出来的。"
    who="黃浩然"
    note="竞品价格为其 2026 年公开定价：StudyFetch Free／US$7.99／US$11.99，Hyperknow Pro US$12，ChatGPT Go US$8／Plus US$20，Coursera 旁听 US$0／Plus US$59／年 US$399。按 US$1 ≈ HK$7.8 折算。"
  >
    <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: NUM, fontSize: 24, fontWeight: 700, color: ACCENT, paddingTop: 3 }}>01</span>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>免费版的边界，就是 Pro 的锚</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, color: MUTED, marginTop: 4 }}>
              同类产品的免费版常是一堵墙——有评测记录：StudyFetch 的免费额度
              「一次 30 分钟学习就会撞顶」。我们砍次数，不砍动作：免费也要能真跑完一次验收。
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: NUM, fontSize: 24, fontWeight: 700, color: ACCENT, paddingTop: 3 }}>02</span>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>积分限制的是成本，不是功能</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, color: MUTED, marginTop: 4 }}>
              不做无上限方案。模型路由让简单的题走小模型、难题才走大模型，
              所以积分是<b>可预测的</b>，而不是「用多少扣多少」。
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: NUM, fontSize: 24, fontWeight: 700, color: ACCENT, paddingTop: 3 }}>03</span>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>Max 是出口，不是升级诱饵</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, color: MUTED, marginTop: 4 }}>
              重度用户和作品集需求有出口，就不会把 Pro 的转化率压低，
              也不会让成本失控的人混在 Pro 里。
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: 620,
          flexShrink: 0,
          border: `1px solid ${RULE}`,
          borderRadius: 12,
          background: PANEL,
          padding: '24px 28px',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: MUTED, marginBottom: 10 }}>
          同檔位的公開價格（月費）
        </div>
        <PriceRow name="Coursera 旁聽" price="US$0" us />
        <PriceRow name="StudyFetch Base" price="US$7.99" us />
        <PriceRow name="** Veridex Pro **" price="HK$78" us={false} />
        <PriceRow name="StudyFetch Premium" price="US$11.99" us />
        <PriceRow name="Hyperknow Pro" price="US$12" us />
        <PriceRow name="ChatGPT Plus" price="US$20" us />
        <div style={{ borderTop: `2px solid ${AMBER}`, marginTop: 14, paddingTop: 16 }}>
          <div style={{ fontSize: 26, lineHeight: 1.45, fontWeight: 700 }}>
            便宜的能教会你，贵的也能教会你。
            <br />
            <span style={{ color: AMBER }}>没有一个价格，是按「你学会了」结算的。</span>
          </div>
        </div>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 18 · 我们的团队
 * ================================================================== */

const P18: Page = () => (
  <Frame kicker="凭什么信你们" title="我们的团队" who="黃浩然">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <Card w={812} h={240} accent={ACCENT} eyebrow="項目負責人 · 學習與語言端">
          <span style={{ fontSize: 38, fontWeight: 800 }}>黃浩然</span>
          <span style={{ fontSize: 25, lineHeight: 1.5, color: MUTED }}>
            中文學習痛點定義、訪談教師與學生、課程介面、對外簡報
          </span>
          <span
            style={{ marginTop: 'auto', borderTop: `1px solid ${RULE}`, paddingTop: 14, fontSize: 23, color: DIM }}
          >
            已交付物：<span style={{ color: AMBER, fontWeight: 700 }}>［待填］</span>
          </span>
        </Card>
        <Card w={812} h={240} accent={ACCENT} eyebrow="技術負責人 · AI 與數據端">
          <span style={{ fontSize: 38, fontWeight: 800 }}>黃羿捷</span>
          <span style={{ fontSize: 25, lineHeight: 1.5, color: MUTED }}>
            模型與提示工程、驗收引擎、校園試點部署、數據管線與私隱安全
          </span>
          <span
            style={{ marginTop: 'auto', borderTop: `1px solid ${RULE}`, paddingTop: 14, fontSize: 23, color: DIM }}
          >
            已交付物：<span style={{ color: AMBER, fontWeight: 700 }}>［待填］</span>
          </span>
        </Card>
      </div>

      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 18,
          borderTop: `2px solid ${RULE}`, paddingTop: 24,
        }}
      >
        <span style={{ fontSize: 26, fontWeight: 700, color: ACCENT }}>痛點訪談</span>
        <span style={{ fontSize: 24, color: DIM }}>→</span>
        <span style={{ fontSize: 26, fontWeight: 700 }}>課程介面</span>
        <span style={{ fontSize: 24, color: DIM }}>→</span>
        <span style={{ fontSize: 26, fontWeight: 700 }}>驗收引擎</span>
        <span style={{ fontSize: 24, color: DIM }}>→</span>
        <span style={{ fontSize: 26, fontWeight: 700 }}>校園試點</span>
        <span style={{ fontSize: 24, color: DIM }}>→</span>
        <span style={{ fontSize: 26, fontWeight: 700 }}>前後測數據</span>
        <span style={{ fontSize: 24, color: DIM }}>→ 回流</span>
      </div>

      <Steps>
        <Step>
          <p style={{ margin: 0, fontSize: 29, lineHeight: 1.5, color: MUTED }}>
            我们都还没做过生意。这条我们用顾问合作和校园试点补，不用假话补。
          </p>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 19 · 18 个月
 * ================================================================== */

const P19: Page = () => (
  <Frame
    kicker="要什么"
    title="18 个月，您会拿到这些"
    lead="每一个节点都有一件拿得出手的东西。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 22 }}>
      <Card w={398} h={330} accent={ACCENT} eyebrow="第 3 月">
        <span style={{ fontSize: 35, fontWeight: 700, lineHeight: 1.3 }}>可用原型</span>
        <span style={{ fontSize: 25, lineHeight: 1.55, color: MUTED }}>
          30–50 次深访
          <br />
          100 人等候名单
        </span>
      </Card>
      <Card w={398} h={330} accent={ACCENT} eyebrow="第 6 月">
        <span style={{ fontSize: 35, fontWeight: 700, lineHeight: 1.3 }}>封闭测试</span>
        <span style={{ fontSize: 25, lineHeight: 1.55, color: MUTED }}>100–200 人真实使用</span>
      </Card>
      <Card w={398} h={330} accent={ACCENT} eyebrow="第 12 月">
        <span style={{ fontSize: 35, fontWeight: 700, lineHeight: 1.3 }}>首批付费用户</span>
        <span style={{ fontSize: 25, lineHeight: 1.55, color: MUTED }}>首年目标 100–300 人</span>
      </Card>
      <Card w={398} h={330} accent={AMBER} eyebrow="第 18 月">
        <span style={{ fontSize: 35, fontWeight: 700, lineHeight: 1.3 }}>延迟回访数据</span>
        <span style={{ fontSize: 25, lineHeight: 1.55, color: MUTED }}>30 天数据齐备，决定是否自持</span>
      </Card>
    </div>
  </Frame>
);

/* ================================================================== *
 * 20 · 验证，才是终点
 * ================================================================== */

const P20: Page = () => (
  <Frame kicker="收束" title="验证，才是终点" who="黃浩然、黃羿捷">
    <div style={{ maxWidth: 1560, display: 'flex', flexDirection: 'column', gap: 40 }}>
      <p style={{ margin: 0, fontSize: 44, lineHeight: 1.45, fontWeight: 700 }}>
        循环的第四格，只能由验收关上。
      </p>
      <Steps>
        <Step>
          <Callout w={1620}>
            今天这 20 分钟只讲了一件事：
            <span style={{ color: AMBER }}>学完之后，没有人替你回头看一眼。</span>
            <br />
            我们补的就是这一眼。
          </Callout>
        </Step>
        <Step>
          <p style={{ margin: 0, fontSize: 30, lineHeight: 1.5, color: MUTED }}>
            如果各位只盯一个指标，我们希望它不是完成率，而是
            <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}> 30 天之后还记得多少</span>。
          </p>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 附录 A · 参考文献
 * ================================================================== */

const P21: Page = () => (
  <Frame kicker="附錄 A" title="参考文献与资料来源" who="—" handoff="答問背景板 · 不計時">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px 44px',
        fontSize: 22,
        lineHeight: 1.45,
        color: MUTED,
      }}
    >
      <span>WIDS. Learning is not Linear, it’s Cyclical. Worldwide Instructional Design System.</span>
      <span>HEPI (2026). Student Generative AI Survey 2026, Report 199.</span>
      <span>加涅 Gagné, R. M. 資訊加工學習理論：準備、操作、遷移三部分與八階段。</span>
      <span>Chuang &amp; Ho (2014). HarvardX / MITx completion study（工作論文）.</span>
      <span>Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science 12(2): 257–285.</span>
      <span>Roediger &amp; Karpicke (2006). Test-enhanced learning. Psychological Science 17(3): 249–255.</span>
      <span>Sweller, J., van Merriënboer, J. J. G., &amp; Paas, F. (2019). Cognitive Architecture and Instructional Design. Educational Psychology Review 31: 261–292.</span>
      <span>Pan &amp; Rickard (2018). Transfer of test-enhanced learning. Psychological Bulletin 144(7): 710–756.</span>
      <span>Bisra et al. (2018). Self-explanation. Educational Psychology Review 30(3): 703–725.</span>
      <span>Cepeda et al. (2006). Distributed practice. Psychological Bulletin 132(3): 354–380.</span>
      <span>Adesope, Trevisan &amp; Sundararajan (2017). Rethinking the use of tests. RER 87(3): 659–701.</span>
      <span>Cowan (2001). Working memory capacity. BBS 24(1): 79–95.</span>
      <span>Tang, Guo, Tang &amp; Shang (2025). RPKT: Recursive Prerequisite Knowledge Tracing. IEEE FMLDS 2025.</span>
      <span>OpenMAIC · 清华大学 THU-MIC 團隊 · AGPL-3.0 · github.com/THU-MAIC/OpenMAIC</span>
      <span>Hyperknow · hyperknow.io · Starter / Pro US$12 / Max</span>
      <span>StudyFetch · Free US$0 / Base US$7.99 / Premium US$11.99</span>
      <span>OpenAI · ChatGPT Go US$8、Plus US$20、Pro 起價 US$100（2026）</span>
      <span>Coursera · 旁聽 US$0、Plus US$59/月、US$399/年</span>
    </div>
  </Frame>
);

/* ================================================================== *
 * 附录 B · 答问准备
 * ================================================================== */

const QA: FC<{ q: string; a: ReactNode; h?: boolean }> = ({ q, a, h }) => (
  <div style={{ borderTop: `1px solid ${h ? AMBER : RULE}`, paddingTop: 14 }}>
    <div style={{ fontSize: 25, fontWeight: 700, marginBottom: 7, color: h ? AMBER : 'var(--osd-text)' }}>
      {q}
    </div>
    <div style={{ fontSize: 23, lineHeight: 1.5, color: MUTED }}>{a}</div>
  </div>
);

const P22: Page = () => (
  <Frame kicker="附錄 B" title="答问准备" who="—" handoff="答問背景板 · 不計時">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 44px' }}>
      <QA
        q="如果做不成怎么办？"
        h
        a="第 6 月激活率低于 25%，我们重做定位；第 12 月付费转化低于 3%，我们转向学校与机构采购。这两条我们事先写死了，不事后解释。"
      />
      <QA
        q="循环的第四格，真的能关上吗？"
        a="不保证。但三种验收叠在一起、加 30 天延迟回访，是目前能找到的最接近「关上」的设计——而且前四家公开产品都没在这一格上做过测量。"
      />
      <QA
        q="两个刚毕业的学生，做得成吗？"
        a="两人都计算机背景、中文母语，能在本校直接做试点。缺的是学习科学与商业经验——我们用顾问合作和校园试点补，不拿假话补。"
      />
      <QA
        q="Hyperknow 已经很好了，你们凭什么？"
        a="不用贬低它，它做得很认真，而且主动排程那一点确实比我们强。差别在第四格：它排的是课程什么时候上，我们排的是你卡在哪一步、为什么会卡。"
      />
      <QA
        q="用户为什么不直接用 ChatGPT？"
        a="可以用，而且它更便宜。但没有任何一个工具会告诉你「你到底学会了没有」——而那正是他付钱的理由。"
      />
      <QA
        q="为什么不做中小学？"
        a="能力上能做。首年不做是因为付费决策链太长、验证周期太长，我们 18 个月要看到的是 30 天延迟数据，不是招生数据。"
      />
    </div>
  </Frame>
);

/* ================================================================== *
 * Speaker notes · 逐页
 * ================================================================== */

export const notes: (string | undefined)[] = [
  `开场不要念。第一句就把问题抛出去：「AI 加速了所有行业，有没有加速过一个人的学习？」
两栏（有人说有／有人说有害）不要逐字念，各念一句关键词就好。
落点是最后那句：「我们今天不是讨论 AI 好不好用，是问一个人学会一件事要经过什么。」`,

  `不要投任何东西。让他们想。
三秒之后那句「不是你笨」要说得平——像陈述，不像安慰。
第二拍才给悖论：「AI 让人更快找到答案了，但它没让人学会。」说完停一拍再翻页。`,

  `这一页的目的只有一个：把「学习」从一条线变成一个环。
左边（线）先说「如果它是一条线，听讲、理解、考好，走完就结束」——他们会点头。
右边（环）给出来源：WIDS 的原话「我们需要在时间和重复中学习」，加涅的反馈阶段是闭合点。
不要念理论，只说：这一圈是有的，而且它会转很多次。
最后一句是本页的钩子：第四格叫应用，它必须回头连回第一格。`,

  `全场最重要的一页，讲慢一点。
四段一次讲完，不要分段揭示——他们需要同时看见整条链。
手指从左划到右（动机→理解→练习→应用），然后往下指那条回环箭头。
停在断口上不说话，让它自己成立。
落点：前面三格行业都做得不错，断在「回头」这一格。`,

  `这页是替第四页落地。左边传统课堂四条，右边三个形式各一句。
「一对多」是总因：老师精力分散 → 不掌握个别情况 → 学生自己评判 → 反馈不及时 → 进度只有一条。
这五条正好对上课程教的「学之外的认知负担」，第 12 页会呼应它。
最后一句最重要：四个已知形式，全都停在那第四格之前。`,

  `逐个念，每个三句话：解决了什么、对应哪一段、遗留什么。不要念年份。
念到 OpenMAIC 时要明确说它很强——清华校内 500 余人试用，不要贬低。
把四张卡指一遍之后，只说结论：四家加起来，第四格还是空的。
这一页是发布会式的转折点，念完停两秒再翻页。`,

  `【交接：交给黃羿捷】前一页结束前递话：「行业卡在哪讲完了，下面讲我们怎么补这一格。」
先讲五个环节的链条，指着「回到起点」那个箭头强调这是环不是线。
再讲三个 Agent 各自负责哪一段——成课、上课、验收。
这页不要展开功能，功能在后面两页。`,

  `三种入口快速念过，重点是最后一句：课从哪来，我们不比任何人强——AI 已经能做了。
右栏三条用 Steps 一条一条出，讲的时候要有「现场演示」的感觉。
第三条「没验过下一节不开」是第一次出现验收概念，说完停一拍。`,

  `三种形式要讲出「各抓一种装懂」的意思，不要变成功能罗列。
每张卡最后一行的红字是重点，逐条指。
最后那句「30 天后，再来一次」是延迟轴，讲的时候要停顿。`,

  `全场最能体现我们想过的地方。
从你答错的那题，一层层往下指，最后停在「分式运算」上——停住不说话，让它自己成立。
这是我们和「重讲一遍全课」的分界线，也是最难被抄走的一格。
RPKT 那篇放脚注就够，不要在台上念。`,

  `四条一句一条，不解释。手指向截图里「锁定」的那一栏——这是视觉落点。
第四句「没验过，下一节锁住」是这一页的封口。`,

  `这一页回应一个很实际的质疑：学生会不会更累。
左边四项是学生今天要自己扛的，右边四项是我们接手的，一一对应着念。
Sweller 的认知负荷理论在脚注，不用在台上说。
落点是那句：学生的负担降到一件事——打开、做完、看结果。`,

  `必须自己先说：「这是承诺值，不是已经测出来的结果。」不能等评委问。
然后讲那句最强的：这些分不由我们打，授课教师出题评分。
语气要平，不要用力推销。`,

  `从「你」开始，不要从「我们」开始。
先讲那三样是最不想交出去的，再讲我们怎么做。四条措施要快，快到显得是基本操作而不是承诺。`,

  `这页容易被问「你们到底做谁」，所以左右两栏的逻辑要讲清楚。
左边承认 AI 能力是泛的，右边说收费只做一类人。
落点：首年主攻大学生——目标最清晰、付费意愿最高、验证周期最短。`,

  `【交接：接回黃浩然】前一页结束前递话：「讲完做了什么，下面讲做给谁、收多少钱。」
三档并排，左中右。Pro 档是主力，用蓝色高亮。
每档只念最后一行的核心差异，不要逐条念四个功能点。`,

  `这一页是定价的论证，比上一页更重要。
左栏三条理由逐条念，01 最重要——同类产品的免费版是一堵墙，评测里记着「30 分钟就撞顶」。
02 讲积分是成本护栏不是功能限制，模型路由让积分可预测。
03 讲 Max 是出口不是升级诱饵。
右栏价格表从上往下指一遍，最后停在琥珀色那句。`,

  `两行分工念完就够，不逐条念职责。「已交付物」两格要提前填好，空着上台很致命。
最后那句「不用假话补」说完停一拍——这是诚实分。`,

  `四个节点横着指过去，每个一句。第 18 月那格是琥珀色，指到它时稍微停一下。
不要在这一页提「做不成怎么办」，那题在附录。`,

  `收尾讲慢。循环的第四格只能由验收关上——这是全场的回扣。
最后一句：如果你只盯一个指标，希望不是完成率，是 30 天后还记得多少。
说完停两秒，不要加「谢谢」。`,

  undefined,
  undefined,
];

/* ================================================================== *
 * Meta
 * ================================================================== */

export const meta: SlideMeta = {
  title: 'Veridex 維學 · 青年創業基金口頭報告',
  createdAt: '2026-09-30T07:09:08.449Z',
};

export default [
  P01, P02, P03, P04, P05, P06, P07, P08, P09, P10,
  P11, P12, P13, P14, P15, P16, P17, P18, P19, P20,
  P21, P22,
] satisfies Page[];
