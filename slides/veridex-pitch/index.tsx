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
  typeScale: { hero: 128, body: 33 },
  radius: 14,
};

/* ------------------------------------------------------------------ *
 * Tokens outside the DesignSystem shape
 * ------------------------------------------------------------------ */

const CANVAS = '#0B0F1A'; // dark page ground
const INK = '#0F172A';
const BLUE = '#2F6BFF';
const BLUE_SOFT = 'rgba(47,107,255,0.10)';
const BLUE_LINE = 'rgba(47,107,255,0.32)';
const AMBER = '#C87F1A'; // status only: 未通过 / 待补教 / 要重讲
const AMBER_SOFT = 'rgba(200,127,26,0.12)';
const MUTED = '#5A6675';
const DIM = '#8A94A3';
const RULE = '#DFE3E9';
const HAIR = '#EAEDF1';
const PANEL = '#FFFFFF';
const ON_DARK = '#F2F5FA';
const ON_DARK_MUTED = '#8B97A8';

const CN =
  '"PingFang SC","Microsoft JhengHei UI","Microsoft JhengHei","Noto Sans CJK TC","Noto Sans SC","Heiti TC",-apple-system,"Segoe UI",sans-serif';
const NUM = '"Inter","SF Pro Display","Segoe UI",system-ui,-apple-system,sans-serif';

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

/* ------------------------------------------------------------------ *
 * Motion — one vocabulary, three actions only
 * ------------------------------------------------------------------ */

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

type Tone = 'light' | 'dark';

const Foot: FC<{ who: string; tone: Tone; handoff?: string }> = ({
  who,
  tone,
  handoff,
}) => {
  const { current, total } = useSlidePageNumber();
  const ink = tone === 'dark' ? ON_DARK_MUTED : DIM;
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
        color: ink,
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ fontWeight: 600 }}>{handoff ?? `講者：${who}`}</span>
      <span style={{ fontFamily: NUM, fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Frame: FC<{
  tone?: Tone;
  kicker: string;
  title: ReactNode;
  lead?: string;
  who: string;
  handoff?: string;
  note?: string;
  children: ReactNode;
}> = ({ tone = 'light', kicker, title, lead, who, handoff, note, children }) => {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: dark ? CANVAS : 'var(--osd-bg)',
        color: dark ? ON_DARK : 'var(--osd-text)',
        fontFamily: 'var(--osd-font-body)',
        padding: '88px 120px 96px',
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
          color: dark ? ON_DARK_MUTED : MUTED,
          fontWeight: 600,
        }}
      >
        <span style={{ color: BLUE, letterSpacing: '0.22em' }}>{kicker}</span>
        <span style={{ letterSpacing: '0.04em' }}>{who}</span>
      </div>

      <h2
        style={{
          margin: '26px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 66,
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          maxWidth: 1500,
        }}
      >
        {title}
      </h2>

      {lead && (
        <p
          style={{
            margin: '18px 0 0',
            fontSize: 33,
            lineHeight: 1.5,
            color: dark ? ON_DARK_MUTED : MUTED,
            maxWidth: 1340,
          }}
        >
          {lead}
        </p>
      )}

      <div style={{ marginTop: 46 }}>{children}</div>

      {note && (
        <div
          style={{
            position: 'absolute',
            left: 120,
            bottom: 84,
            fontSize: 20,
            lineHeight: 1.45,
            color: dark ? 'rgba(139,151,168,0.85)' : DIM,
            maxWidth: 1400,
          }}
        >
          {note}
        </div>
      )}

      <Foot who={who} tone={tone} handoff={handoff} />
    </div>
  );
};

/** A titled card. Repeated cards are written as explicit instances, never mapped. */
const Card: FC<{
  w: number;
  h: number;
  tone?: Tone;
  accent?: string;
  eyebrow?: string;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ w, h, tone = 'light', accent, eyebrow, children, style }) => {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        width: w,
        height: h,
        boxSizing: 'border-box',
        borderRadius: 'var(--osd-radius)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : RULE}`,
        background: dark ? 'rgba(255,255,255,0.035)' : PANEL,
        padding: accent ? '26px 28px' : '30px 32px',
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
            color: accent ?? (dark ? ON_DARK_MUTED : MUTED),
          }}
        >
          {eyebrow}
        </span>
      )}
      {children}
    </div>
  );
};

const BigNum: FC<{ n: string; unit?: string; tone?: Tone; accent?: string }> = ({
  n,
  unit,
  tone = 'light',
  accent = BLUE,
}) => (
  <span
    style={{
      fontFamily: NUM,
      fontSize: 92,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: accent,
      fontVariantNumeric: 'tabular-nums',
    }}
  >
    {n}
    {unit && (
      <span style={{ fontSize: 30, fontWeight: 600, marginLeft: 6, letterSpacing: 0 }}>
        {unit}
      </span>
    )}
  </span>
);

const Callout: FC<{ tone?: Tone; children: ReactNode; w?: number }> = ({
  tone = 'light',
  children,
  w,
}) => {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        width: w ?? '100%',
        boxSizing: 'border-box',
        borderLeft: `4px solid ${AMBER}`,
        background: dark ? 'rgba(200,127,26,0.10)' : AMBER_SOFT,
        padding: '22px 30px',
        fontSize: 31,
        lineHeight: 1.5,
        fontWeight: 600,
        color: dark ? ON_DARK : INK,
      }}
    >
      {children}
    </div>
  );
};

/* ================================================================== *
 * 01 · 封面
 * ================================================================== */

const P01: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: CANVAS,
      color: ON_DARK,
      fontFamily: 'var(--osd-font-body)',
      padding: '100px 120px 96px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 56,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        pointerEvents: 'none',
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span
        style={{
          fontFamily: NUM,
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: '0.16em',
          color: BLUE,
        }}
      >
        VERIDEX
      </span>
      <span style={{ fontSize: 22, letterSpacing: '0.22em', color: ON_DARK_MUTED, fontWeight: 600 }}>
        維學
      </span>
    </div>

    <div style={{ maxWidth: 1440 }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
        }}
      >
        把「学会」
        <br />
        变成一件可以被检验的事
      </h1>
      <p style={{ margin: '34px 0 0', fontSize: 36, lineHeight: 1.5, color: ON_DARK_MUTED }}>
        你的第一个 AI 个人课堂
      </p>
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        fontSize: 24,
        color: ON_DARK_MUTED,
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
 * 02 · 开场：那一秒的空白
 * ================================================================== */

const P02: Page = () => (
  <Frame
    kicker="開場"
    title="那天晚上的空白"
    who="黃浩然"
    note="開場不投影片內容，讓他們想。三秒之後那句「不是你笨」要說得平，不要用力。"
  >
    <div style={{ maxWidth: 1560, display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Steps>
        <Step>
          <p style={{ margin: 0, fontSize: 52, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.01em' }}>
            「请各位现在想一件你上周学过、但现在一点都想不起来的事。」
          </p>
        </Step>
        <Step>
          <p style={{ margin: 0, fontSize: 52, lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.01em' }}>
            各位脸上那一秒的空白，
            <br />
            <span style={{ color: BLUE }}>不是你笨</span>，是从来没有人检查过你到底会不会。
          </p>
        </Step>
        <Step>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 8 }}>
            <p style={{ margin: 0, fontSize: 34, lineHeight: 1.5, color: MUTED, maxWidth: 1240 }}>
              同一份 AI 工具，同一年，把所有人变快，也把同样多的人掏空。
            </p>
            <Callout w={1340}>AI 让人更快找到答案了，但它没让人学会。</Callout>
          </div>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 03 · 为什么是现在
 * ================================================================== */

const P03: Page = () => (
  <Frame
    kicker="为什么是现在"
    title="一对一的价格结构，刚刚崩了"
    lead="有三件事，过去必须有一个人在场才做得到。"
    who="黃浩然"
    note="价格：OpenMAIC 公开数据，一整套课约 30 分钟、成本不到 2 美元。家教价格按香港市场每小时 400–600 港元估算。"
  >
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 28 }}>
          <Card w={546} h={188} eyebrow="01">
            <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>随时打断、追问、换一种讲法</span>
            <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
              过去要等下一次上课，或在 office hour 排队的最后十分钟。
            </span>
          </Card>
          <Card w={546} h={188} eyebrow="02">
            <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>
              针对你这一步的错，给出解释
            </span>
            <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
              老师批改给全班同一份评语——你错在哪，他看不见。
            </span>
          </Card>
          <Card w={546} h={188} eyebrow="03">
            <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>出题贴着你的边界</span>
            <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
              过去靠老师经验，因人而异，而且不可复制。
            </span>
          </Card>
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingTop: 42 }}>
          <p style={{ margin: 0, fontSize: 38, lineHeight: 1.4, fontWeight: 700, maxWidth: 1400 }}>
            这三件事的瓶颈，从来不是「会不会做」，
            <br />
            是「有没有人对我说」。
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
            <div
              style={{
                flex: 1,
                borderTop: `2px solid ${RULE}`,
                paddingTop: 22,
              }}
            >
              <div style={{ fontSize: 24, color: MUTED, marginBottom: 8 }}>以前这叫家教</div>
              <div style={{ fontFamily: NUM, fontSize: 46, fontWeight: 800, letterSpacing: '-0.02em' }}>
                HK$400–600
                <span style={{ fontSize: 24, fontWeight: 600, marginLeft: 8 }}>/ 小时</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, color: DIM }}>→</div>
            <div style={{ flex: 1, borderTop: `2px solid ${BLUE}`, paddingTop: 22 }}>
              <div style={{ fontSize: 24, color: BLUE, marginBottom: 8, fontWeight: 600 }}>
                现在 · 生成一整套课
              </div>
              <div style={{ fontFamily: NUM, fontSize: 46, fontWeight: 800, letterSpacing: '-0.02em', color: BLUE }}>
                30 分钟 · 不到 US$2
              </div>
            </div>
          </div>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 04 · 学习的闭环（承重墙）
 * ================================================================== */

const P04: Page = () => (
  <Frame
    tone="dark"
    kicker="学习方法"
    title="把「学」拆成三段"
    lead="拆完之后，问题就清楚了：卡在哪一段，是可以看见的。"
    who="黃浩然"
  >
    <div style={{ position: 'relative', height: 520 }}>
      <svg
        width={1680}
        height={520}
        viewBox="0 0 1680 520"
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <defs>
          <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="rgba(139,151,168,0.7)" />
          </marker>
        </defs>
        <path
          d="M510,260 C545,260 545,260 580,260"
          stroke="rgba(139,151,168,0.55)"
          strokeWidth={2}
          fill="none"
          markerEnd="url(#ah)"
        />
        <path
          d="M1100,260 C1135,260 1135,260 1170,260"
          stroke="rgba(139,151,168,0.55)"
          strokeWidth={2}
          fill="none"
          markerEnd="url(#ah)"
        />
      </svg>

      <div style={{ display: 'flex', gap: 90, alignItems: 'stretch' }}>
        <Card w={500} h={520} tone="dark" accent={BLUE} eyebrow="第一段">
          <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.01em' }}>找到</span>
          <span style={{ fontSize: 29, lineHeight: 1.55, color: ON_DARK_MUTED }}>
            在一大堆东西里，挑出你现在该学的那一部分。
          </span>
          <span
            style={{
              marginTop: 'auto',
              fontSize: 25,
              color: BLUE,
              fontWeight: 600,
              borderTop: '1px solid rgba(255,255,255,0.10)',
              paddingTop: 20,
            }}
          >
            AI 已经很会做
          </span>
        </Card>

        <Card w={500} h={520} tone="dark" accent={BLUE} eyebrow="第二段">
          <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.01em' }}>学会</span>
          <span style={{ fontSize: 29, lineHeight: 1.55, color: ON_DARK_MUTED }}>
            从「看过了」，变成「这是我的，随时调得出来」。
          </span>
          <span
            style={{
              marginTop: 'auto',
              fontSize: 25,
              color: BLUE,
              fontWeight: 600,
              borderTop: '1px solid rgba(255,255,255,0.10)',
              paddingTop: 20,
            }}
          >
            AI 已经能教
          </span>
        </Card>

        <Card w={500} h={520} tone="dark" accent={AMBER} eyebrow="第三段">
          <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.01em' }}>用起来</span>
          <span style={{ fontSize: 29, lineHeight: 1.55, color: ON_DARK_MUTED }}>
            题目一换面目，还是做不出来——那就还不算学会。
          </span>
          <span
            style={{
              marginTop: 'auto',
              fontSize: 25,
              color: AMBER,
              fontWeight: 600,
              borderTop: '1px solid rgba(255,255,255,0.10)',
              paddingTop: 20,
            }}
          >
            还没有人做好
          </span>
        </Card>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 05 · 卡在「学会」
 * ================================================================== */

const P05: Page = () => (
  <Frame
    kicker="第二段 · 为什么卡住"
    title="学不会，不是输入不够"
    lead="学习的时间不主要花在输入上，而在提取和迁移上。"
    who="黃浩然"
    note="来源：Roediger & Karpicke (2006), Psychological Science 17(3): 249–255；Cowan (2001), BBS 24(1)。"
  >
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 22 }}>
          <Card w={408} h={214} accent={BLUE} eyebrow="01 · 输入">
            <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>资料进来了吗</span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>感觉记忆 → 工作记忆</span>
          </Card>
          <Card w={408} h={214} accent={BLUE} eyebrow="02 · 处理">
            <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>理解到什么程度</span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>
              一次大约只能同时处理四五块
            </span>
          </Card>
          <Card w={408} h={214} accent={BLUE} eyebrow="03 · 提取">
            <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>能从记忆里取出来吗</span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>合上书，还记得多少</span>
          </Card>
          <Card w={408} h={214} accent={AMBER} eyebrow="04 · 迁移">
            <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.35 }}>能用到没见过的题上吗</span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: MUTED }}>换个说法，还会吗</span>
          </Card>
        </div>
      </Step>
      <Step>
        <div style={{ paddingTop: 44 }}>
          <Callout w={1660}>
            反复重读的人，五分钟内考得最好。一周之后，他落后 21 个百分点——
            <br />
            而他的信心，是三组里最高的。他不知道自己落后了。
          </Callout>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 06 · 卡在「用起来」
 * ================================================================== */

const P06: Page = () => (
  <Frame
    kicker="第三段 · 为什么卡住"
    title="学完了，和学会了，差很远"
    lead="这一段不是能力问题，是没有人去量它。"
    who="黃浩然"
    handoff="講者：黃浩然　｜　接：黃羿捷"
    note="来源：Chuang & Ho (2014) HarvardX / MITx 完成率研究（工作论文）。研究引述见附录。"
  >
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 28 }}>
          <Card w={812} h={192} eyebrow="我们在问的">
            <span style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.3 }}>「我学完了吗？」</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              完课率、拿证书、学时够不够。回答的是：你有没有看。
            </span>
          </Card>
          <Card w={812} h={192} accent={AMBER} eyebrow="该问的">
            <span style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.3, color: INK }}>
              「我会用了吗？」
            </span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              换个题目、换个场景，你还做不做得出来。回答的是：你会不会。
            </span>
          </Card>
        </div>
      </Step>
      <Step>
        <div style={{ paddingTop: 42, display: 'flex', gap: 24, alignItems: 'center' }}>
          <BigNum n="841,687" unit="人注册" />
          <span style={{ fontSize: 30, color: DIM }}>→</span>
          <BigNum n="5%" unit="拿到证书" accent={AMBER} />
          <span style={{ fontSize: 30, color: DIM }}>·</span>
          <BigNum n="35%" unit="从未看过任何内容" accent={AMBER} />
        </div>
      </Step>
      <Step>
        <div style={{ paddingTop: 40 }}>
          <p
            style={{
              margin: 0,
              fontSize: 38,
              lineHeight: 1.5,
              fontWeight: 700,
              maxWidth: 1500,
              borderLeft: `4px solid ${BLUE}`,
              paddingLeft: 28,
            }}
          >
            依赖 AI 而没有人监督的医学生，考试表现最差，信心却最高。
            <br />
            <span style={{ color: MUTED, fontWeight: 500, fontSize: 33 }}>
              研究者形容：发了跑车，却没学过开车。
            </span>
          </p>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 07 · 课从哪来
 * ================================================================== */

const P07: Page = () => (
  <Frame
    kicker="产品 · 环节一"
    title="课从哪来"
    lead="三种方式进来。这三样是入场券，不是我们的优势——AI 已经能做了。"
    who="黃羿捷"
    note="连接源：校园 LMS、本地资料、Notion、Google Drive。"
  >
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 28 }}>
          <Card w={546} h={228} eyebrow="方式一">
            <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>说一句话</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              丢一个主题进去：「帮我把中央極限定理講清楚。」
            </span>
          </Card>
          <Card w={546} h={228} eyebrow="方式二">
            <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>传一份资料</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              讲义、PDF、课堂笔记，按你自己的材料成课。
            </span>
          </Card>
          <Card w={546} h={228} eyebrow="方式三">
            <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>同步你已有的</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              Notion、Google Drive、校园 LMS，不用搬家。
            </span>
          </Card>
        </div>
      </Step>
      <Step>
        <div style={{ paddingTop: 46 }}>
          <p style={{ margin: 0, fontSize: 36, lineHeight: 1.5, fontWeight: 700 }}>
            课怎么来，我们不比任何人强。我们的战场在接下来。
          </p>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 08 · 课上发生什么
 * ================================================================== */

const P08: Page = () => (
  <Frame
    kicker="产品 · 环节二"
    title="课上：1 对 1，不是播放"
    who="黃羿捷"
  >
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      <ImagePlaceholder
        hint="Veridex 課程頁截圖：AI 語音講解 + 白板板書同步、章節按驗收解鎖"
        width={880}
        height={508}
        style={{ borderRadius: 14, flexShrink: 0 }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 26, paddingTop: 10 }}>
        <Steps>
          <Step>
            <div style={{ display: 'flex', gap: 18 }}>
              <span style={{ fontFamily: NUM, fontSize: 26, color: BLUE, fontWeight: 700, paddingTop: 6 }}>
                01
              </span>
              <p style={{ margin: 0, fontSize: 30, lineHeight: 1.5 }}>
                AI 负责讲解，白板板书同步推上去，跟得上老师写的那一行。
              </p>
            </div>
          </Step>
          <Step>
            <div style={{ display: 'flex', gap: 18 }}>
              <span style={{ fontFamily: NUM, fontSize: 26, color: BLUE, fontWeight: 700, paddingTop: 6 }}>
                02
              </span>
              <p style={{ margin: 0, fontSize: 30, lineHeight: 1.5 }}>
                随时打断、追问、要求换一种讲法——这一堂只对着你一个人。
              </p>
            </div>
          </Step>
          <Step>
            <div style={{ display: 'flex', gap: 18 }}>
              <span style={{ fontFamily: NUM, fontSize: 26, color: AMBER, fontWeight: 700, paddingTop: 6 }}>
                03
              </span>
              <p style={{ margin: 0, fontSize: 30, lineHeight: 1.5 }}>
                章节按验收结果解锁。没验过，下一节不开。
              </p>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 09 · 下课之后才开始
 * ================================================================== */

const P09: Page = () => (
  <Frame
    kicker="产品 · 环节三"
    title="下课之后，才开始"
    lead="三种验收，各抓一种「假装会了」。"
    who="黃羿捷"
  >
    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 28 }}>
          <Card w={546} h={230} accent={BLUE} eyebrow="讲出来">
            <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>输出</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              能不能用自己的话讲清楚、讲给谁听。
            </span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: BLUE, marginTop: 'auto' }}>
              抓「你只是背得很顺」
            </span>
          </Card>
          <Card w={546} h={230} accent={BLUE} eyebrow="练一遍">
            <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>课后练习</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              过一遍，反馈带解释，不是只给对错。
            </span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: BLUE, marginTop: 'auto' }}>
              抓「记得住，但调不出来」
            </span>
          </Card>
          <Card w={546} h={230} accent={BLUE} eyebrow="做出来">
            <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>项目</span>
            <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
              你自己做的项目，AI 按标准打分。
            </span>
            <span style={{ fontSize: 24, lineHeight: 1.5, color: BLUE, marginTop: 'auto' }}>
              抓「原题会做，换个情境就废」
            </span>
          </Card>
        </div>
      </Step>
      <Step>
        <div style={{ paddingTop: 44, display: 'flex', gap: 56, alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: 34, lineHeight: 1.45, fontWeight: 700, flex: 1 }}>
            一个形式只能抓一种「装懂」。三种一起，「学会了」这个判断才站得住。
          </p>
          <div
            style={{
              flexShrink: 0,
              borderLeft: `4px solid ${AMBER}`,
              background: AMBER_SOFT,
              padding: '20px 28px',
              fontSize: 29,
              lineHeight: 1.45,
              fontWeight: 600,
            }}
          >
            30 天后，再来一次。
          </div>
        </div>
      </Step>
    </Steps>
  </Frame>
);

/* ================================================================== *
 * 10 · 追根溯源
 * ================================================================== */

const P10: Page = () => (
  <Frame
    kicker="产品 · 环节四"
    title="没验过，就往回找"
    lead="你错的不是这一题，是往下那几题。一直找到你真正不会的那一点。"
    who="黃羿捷"
    note="RPKT：递归前置知识追踪，实时回溯前置概念直至学习者的真实知识边界（IEEE FMLDS 2025）。"
  >
    <div style={{ display: 'flex', gap: 72, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            borderLeft: `3px solid ${BLUE_LINE}`,
            paddingLeft: 24,
            paddingVertical: 14,
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 700 }}>第 3 章 · 中央極限定理</span>
          <span style={{ fontSize: 25, color: AMBER, fontWeight: 600 }}>← 你答錯的題</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            borderLeft: `3px solid ${BLUE_LINE}`,
            paddingLeft: 46,
            paddingVertical: 14,
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 700, color: MUTED }}>前置 · 樣本平均與期望</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            borderLeft: `3px solid ${BLUE_LINE}`,
            paddingLeft: 68,
            paddingVertical: 14,
          }}
        >
          <span style={{ fontSize: 30, fontWeight: 700, color: MUTED }}>前置 · 分佈的加法</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            borderLeft: `3px solid ${AMBER}`,
            paddingLeft: 90,
            paddingVertical: 16,
            background: AMBER_SOFT,
            borderRadius: '0 10px 10px 0',
          }}
        >
          <span style={{ fontSize: 31, fontWeight: 800, color: INK }}>真正的盲点 · 分式運算</span>
        </div>
      </div>

      <div style={{ width: 640, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 16 }}>
        <p style={{ margin: 0, fontSize: 31, lineHeight: 1.55, color: MUTED }}>
          線代學不好、機率學不好，源頭常常不在高深的概念上。
        </p>
        <div
          style={{
            borderTop: `2px solid ${RULE}`,
            paddingTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 34, fontWeight: 700 }}>只补那一点</span>
          <span style={{ fontSize: 28, lineHeight: 1.5, color: MUTED }}>
            不重讲全课。补完重验，过了才往下走。
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
  <Frame kicker="产品 · 环节五" title="判定不只给对错" who="黃羿捷">
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      <ImagePlaceholder
        hint="Veridex 驗收頁截圖：判定錯誤、列出兩處需修正、給出正確思路、鎖定下一章"
        width={880}
        height={508}
        style={{ borderRadius: 14, flexShrink: 0 }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 6 }}>
        <Steps>
          <Step>
            <p style={{ margin: 0, fontSize: 30, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>01</span>
              告诉你错在哪一步
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 30, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>02</span>
              告诉你为什么会错
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 30, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>03</span>
              给你正确思路，不给答案
            </p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 30, lineHeight: 1.45 }}>
              <span style={{ fontFamily: NUM, color: AMBER, fontWeight: 700, marginRight: 14 }}>04</span>
              没验过，下一节锁住
            </p>
          </Step>
        </Steps>
        <p style={{ margin: '14px 0 0', fontSize: 26, lineHeight: 1.5, color: DIM }}>
          这一页是全场唯一一张产品实景图，讲话时把手指向锁住的那一栏。
        </p>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 12 · 三个数字 + 评分权
 * ================================================================== */

const P12: Page = () => (
  <Frame
    kicker="承诺"
    title="三个数字"
    lead="我们承诺被这三个数字检验。这是承诺值，不是已经测出来的结果。"
    who="黃羿捷"
  >
    <div style={{ display: 'flex', gap: 28 }}>
      <Card w={546} h={214} accent={BLUE} eyebrow="行为 · 14 天任务完成率">
        <BigNum n="≥ 50" unit="%" />
        <span style={{ fontSize: 25, lineHeight: 1.5, color: MUTED }}>你到底做没做</span>
      </Card>
      <Card w={546} h={214} accent={BLUE} eyebrow="成果 · 前测后测差异">
        <BigNum n="≥ 20" unit="%" />
        <span style={{ fontSize: 25, lineHeight: 1.5, color: MUTED }}>学之前与学之后差多少</span>
      </Card>
      <Card w={546} h={214} accent={AMBER} eyebrow="延迟 · 30 天后回访">
        <BigNum n="≥ 70" unit="%" accent={AMBER} />
        <span style={{ fontSize: 25, lineHeight: 1.5, color: MUTED }}>一个月后还记得多少</span>
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
 * 13 · 五代工具
 * ================================================================== */

const ToolNode: FC<{
  left: number;
  top: number;
  name: string;
  what: string;
  when: string;
  stage: string;
  hot?: boolean;
}> = ({ left, top, name, what, when, stage, hot }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 300,
      height: 150,
      boxSizing: 'border-box',
      borderRadius: 12,
      border: `1px solid ${hot ? BLUE : RULE}`,
      background: hot ? BLUE_SOFT : PANEL,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
    }}
  >
    <span style={{ fontSize: 27, fontWeight: 800, color: hot ? BLUE : INK }}>{name}</span>
    <span style={{ fontSize: 21, lineHeight: 1.4, color: MUTED }}>{what}</span>
    <span
      style={{
        marginTop: 'auto',
        fontSize: 19,
        color: hot ? BLUE : DIM,
        fontFamily: NUM,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontFamily: 'var(--osd-font-body)' }}>{stage}</span>
      <span>{when}</span>
    </span>
  </div>
);

const P13: Page = () => (
  <Frame
    kicker="定位"
    title="五代工具，一条线"
    lead="每一代都在把 AI 的能力往前推——找得到、讲得懂、出得了题。"
    who="黃羿捷"
    note="OpenMAIC：清华大学 THU-MIC 团队开源，AGPL-3.0，2026。完成率数据：Chuang & Ho (2014)。"
  >
    <div style={{ position: 'relative', height: 360, marginTop: 12 }}>
      <svg width={1680} height={360} style={{ position: 'absolute', left: 0, top: 0 }}>
        <g stroke="rgba(47,107,255,0.28)" strokeWidth={2} fill="none">
          <path d="M310,70 C385,70 385,200 450,200" />
          <path d="M310,270 C385,270 385,200 450,200" />
          <path d="M770,200 C845,200 845,70 910,70" />
          <path d="M770,200 C845,200 845,270 910,270" />
          <path d="M1230,70 C1280,70 1280,200 1320,200" />
          <path d="M1230,270 C1280,270 1280,200 1320,200" />
        </g>
      </svg>

      <ToolNode left={0} top={0} name="Coursera" what="把大学课放上线" when="2012" stage="第一段 · 找到" />
      <ToolNode left={0} top={200} name="DeepLearning.AI" what="把技能拆成短课" when="2017" stage="第一段 · 找到" />
      <ToolNode left={460} top={130} name="ChatGPT" what="把提问成本降到零" when="2022" stage="第一段 · 推到底" />
      <ToolNode left={920} top={0} name="Hyperknow" what="讲义变测验与闪卡" when="2025" stage="第二段 · 讲" />
      <ToolNode left={920} top={200} name="OpenMAIC" what="多智能体互动课堂" when="2026" stage="第二段 · 讲" />
      <ToolNode left={1330} top={130} name="Veridex" what="验收到会用为止" when="2026" stage="第三段 · 用起来" hot />
    </div>

    <div style={{ marginTop: 24 }}>
      <Callout w={1660}>
        五代人都在回答「AI 怎么让人学得更快」。
        <br />
        <span style={{ color: AMBER }}>没有一代问过：AI 怎么让人学会。</span>
      </Callout>
    </div>
  </Frame>
);

/* ================================================================== *
 * 14 · 逐段对账
 * ================================================================== */

const P14: Page = () => (
  <Frame
    kicker="定位 · 逐段对账"
    title="逐段对账"
    lead="把每一段单独摆出来，差别在哪一目了然。"
    who="黃羿捷"
    handoff="講者：黃羿捷　｜　接：黃浩然"
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', gap: 24, padding: '0 0 8px 0' }}>
        <span style={{ width: 300, fontSize: 24, color: DIM, fontWeight: 600 }}>段</span>
        <span style={{ width: 620, fontSize: 24, color: DIM, fontWeight: 600 }}>行业已经做到的</span>
        <span style={{ flex: 1, fontSize: 24, color: DIM, fontWeight: 600 }}>我们多做的那一步</span>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <div style={{ width: 300, display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 800 }}>
          找到
        </div>
        <div
          style={{
            width: 620,
            boxSizing: 'border-box',
            border: `1px solid ${RULE}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            color: MUTED,
            background: PANEL,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          检索、排程、成课 —— 已经白给
        </div>
        <div
          style={{
            flex: 1,
            boxSizing: 'border-box',
            border: `1px solid ${RULE}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            background: PANEL,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          不在这一段竞争，只求接得上
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <div style={{ width: 300, display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 800 }}>
          学会
        </div>
        <div
          style={{
            width: 620,
            boxSizing: 'border-box',
            border: `1px solid ${RULE}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            color: MUTED,
            background: PANEL,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          1 对 1 讲解、随时追问 —— 已经白给
        </div>
        <div
          style={{
            flex: 1,
            boxSizing: 'border-box',
            border: `1px solid ${RULE}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            background: PANEL,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          改的不是节奏，是<span style={{ fontWeight: 700 }}>这次要教的那一个点</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <div style={{ width: 300, display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 800, color: AMBER }}>
          用起来
        </div>
        <div
          style={{
            width: 620,
            boxSizing: 'border-box',
            border: `1px solid ${RULE}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            color: MUTED,
            background: PANEL,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          没有人做
        </div>
        <div
          style={{
            flex: 1,
            boxSizing: 'border-box',
            border: `1px solid ${AMBER}`,
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 27,
            lineHeight: 1.45,
            background: AMBER_SOFT,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
          }}
        >
          三种验收 · 追根溯源 · 只补缺口
        </div>
      </div>
    </div>

    <div style={{ marginTop: 34 }}>
      <p style={{ margin: 0, fontSize: 32, lineHeight: 1.45, color: MUTED }}>
        我们的产品现在还在 v0。今天想请各位投资的，是第三段。
      </p>
    </div>
  </Frame>
);

/* ================================================================== *
 * 15 · 我们的团队
 * ================================================================== */

const P15: Page = () => (
  <Frame
    kicker="凭什么信你们"
    title="我们的团队"
    who="黃浩然"
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', gap: 28 }}>
        <Card w={812} h={250} accent={BLUE} eyebrow="項目負責人 · 學習與語言端">
          <span style={{ fontSize: 40, fontWeight: 800 }}>黃浩然</span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
            中文學習痛點定義、訪談教師與學生、課程介面、對外簡報
          </span>
          <span
            style={{
              marginTop: 'auto',
              borderTop: `1px solid ${RULE}`,
              paddingTop: 16,
              fontSize: 24,
              color: DIM,
            }}
          >
            已交付物：<span style={{ color: AMBER, fontWeight: 700 }}>［待填］</span>
          </span>
        </Card>
        <Card w={812} h={250} accent={BLUE} eyebrow="技術負責人 · AI 與數據端">
          <span style={{ fontSize: 40, fontWeight: 800 }}>黃羿捷</span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
            模型與提示工程、驗收引擎、校園試點部署、數據管線與私隱安全
          </span>
          <span
            style={{
              marginTop: 'auto',
              borderTop: `1px solid ${RULE}`,
              paddingTop: 16,
              fontSize: 24,
              color: DIM,
            }}
          >
            已交付物：<span style={{ color: AMBER, fontWeight: 700 }}>［待填］</span>
          </span>
        </Card>
      </div>

      <Steps>
        <Step>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              borderTop: `2px solid ${RULE}`,
              paddingTop: 26,
            }}
          >
            <span style={{ fontSize: 27, fontWeight: 700, color: BLUE }}>痛點訪談</span>
            <span style={{ fontSize: 26, color: DIM }}>→</span>
            <span style={{ fontSize: 27, fontWeight: 700 }}>課程介面</span>
            <span style={{ fontSize: 26, color: DIM }}>→</span>
            <span style={{ fontSize: 27, fontWeight: 700 }}>驗收引擎</span>
            <span style={{ fontSize: 26, color: DIM }}>→</span>
            <span style={{ fontSize: 27, fontWeight: 700 }}>校園試點</span>
            <span style={{ fontSize: 26, color: DIM }}>→</span>
            <span style={{ fontSize: 27, fontWeight: 700 }}>前後測數據</span>
            <span style={{ fontSize: 26, color: DIM }}>→ 回流</span>
          </div>
        </Step>
        <Step>
          <p style={{ margin: '8px 0 0', fontSize: 30, lineHeight: 1.5, color: MUTED }}>
            我们都还没做过生意。这条我们用顾问合作和校园试点补，不用假话补。
          </p>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 16 · 我们的边界
 * ================================================================== */

const P16: Page = () => (
  <Frame kicker="凭什么信你们" title="我们的边界" who="黃浩然">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', gap: 28 }}>
        <Card w={546} h={210} accent={BLUE} eyebrow="不做">
          <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>不为库存生产课程</span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
            我们只为一个人生成一整套课，以及这一整套的验收。
          </span>
        </Card>
        <Card w={546} h={210} accent={BLUE} eyebrow="不做">
          <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>不给自己打分</span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
            评分权在授课教师手里。我们交出这个权力。
          </span>
        </Card>
        <Card w={546} h={210} eyebrow="首年不做">
          <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>不碰中小学市场</span>
          <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
            先把大学生这条路走通，再谈别的。
          </span>
        </Card>
      </div>
      <Steps>
        <Step>
          <p style={{ margin: '12px 0 0', fontSize: 34, lineHeight: 1.45, fontWeight: 700 }}>
            知道自己不做什么，比多列十个功能更可信。
          </p>
        </Step>
      </Steps>
    </div>
  </Frame>
);

/* ================================================================== *
 * 17 · 你的资料
 * ================================================================== */

const P17: Page = () => (
  <Frame
    kicker="凭什么信你们"
    title="你的资料，我们怎么保管"
    lead="你放进来的这三样，正好是你最不想交出去的三样。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 28 }}>
      <Card w={812} h={380} eyebrow="我们接什么">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 8 }}>
          <div>
            <span style={{ fontSize: 32, fontWeight: 700 }}>校园 LMS</span>
            <span style={{ fontSize: 25, color: MUTED, marginLeft: 16 }}>课程材料与进度</span>
          </div>
          <div>
            <span style={{ fontSize: 32, fontWeight: 700 }}>本地资料</span>
            <span style={{ fontSize: 25, color: MUTED, marginLeft: 16 }}>讲义、笔记、作业</span>
          </div>
          <div>
            <span style={{ fontSize: 32, fontWeight: 700 }}>Notion · Google Drive</span>
            <span style={{ fontSize: 25, color: MUTED, marginLeft: 16 }}>你已经整理好的东西</span>
          </div>
        </div>
      </Card>

      <Card w={812} h={380} accent={BLUE} eyebrow="我们怎么做">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 24, color: BLUE, fontWeight: 700 }}>01</span>
            <span style={{ fontSize: 30, lineHeight: 1.4 }}>数据不出境</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 24, color: BLUE, fontWeight: 700 }}>02</span>
            <span style={{ fontSize: 30, lineHeight: 1.4 }}>分户隔离，你只能看自己的</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 24, color: BLUE, fontWeight: 700 }}>03</span>
            <span style={{ fontSize: 30, lineHeight: 1.4 }}>访问令牌有时效</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontFamily: NUM, fontSize: 24, color: BLUE, fontWeight: 700 }}>04</span>
            <span style={{ fontSize: 30, lineHeight: 1.4 }}>每次导出留审计记录</span>
          </div>
        </div>
      </Card>
    </div>
  </Frame>
);

/* ================================================================== *
 * 18 · 18 个月
 * ================================================================== */

const P18: Page = () => (
  <Frame
    kicker="要什么"
    title="18 个月，您会拿到这些"
    lead="每一个节点都有一件拿得出手的东西。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
      <Card w={398} h={330} accent={BLUE} eyebrow="第 3 月">
        <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>可用原型</span>
        <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>
          30–50 次深访
          <br />100 人等候名单
        </span>
      </Card>
      <Card w={398} h={330} accent={BLUE} eyebrow="第 6 月">
        <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>封闭测试</span>
        <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>100–200 人真实使用</span>
      </Card>
      <Card w={398} h={330} accent={BLUE} eyebrow="第 12 月">
        <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>首批付费用户</span>
        <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>首年目标 100–300 人</span>
      </Card>
      <Card w={398} h={330} accent={AMBER} eyebrow="第 18 月">
        <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>延迟回访数据</span>
        <span style={{ fontSize: 26, lineHeight: 1.5, color: MUTED }}>30 天数据齐备，决定是否自持</span>
      </Card>
    </div>
  </Frame>
);

/* ================================================================== *
 * 19 · 谁付钱
 * ================================================================== */

const P19: Page = () => (
  <Frame
    kicker="要什么"
    title="谁付钱"
    lead="两笔完全不同的生意。先做左边，右边才有意义。"
    who="黃浩然"
  >
    <div style={{ display: 'flex', gap: 32, alignItems: 'stretch' }}>
      <Card w={812} h={372} accent={BLUE} eyebrow="先做 · 个人用户">
        <span style={{ fontSize: 40, fontWeight: 800 }}>先学后付，积分制</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
          <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
            按月订阅，用量走积分，不做无上限
          </span>
          <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
            赌的是：学生愿不愿意为「确定学会了」再付一个月
          </span>
        </div>
        <span
          style={{
            marginTop: 'auto',
            borderTop: `1px solid ${RULE}`,
            paddingTop: 18,
            fontSize: 26,
            color: BLUE,
            fontWeight: 600,
          }}
        >
          验证：完成率 与 付费意愿
        </span>
      </Card>

      <Card w={812} h={372} eyebrow="第二市场 · 学校">
        <span style={{ fontSize: 40, fontWeight: 800 }}>按教师或人头结算</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
          <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED }}>
            要走采购、要教师配合、要看课程数据
          </span>
          <span style={{ fontSize: 27, lineHeight: 1.5, color: MUTED, color: AMBER, fontWeight: 600 }}>
            我们还没谈到一份合同，这是事实
          </span>
        </div>
        <span
          style={{
            marginTop: 'auto',
            borderTop: `1px solid ${RULE}`,
            paddingTop: 18,
            fontSize: 26,
            color: MUTED,
            fontWeight: 600,
          }}
        >
          验证：愿不愿意进采购流程
        </span>
      </Card>
    </div>
  </Frame>
);

/* ================================================================== *
 * 20 · 定价
 * ================================================================== */

const P20: Page = () => (
  <Frame
    tone="dark"
    kicker="要什么"
    title="我们的定价"
    who="黃浩然"
    note="价格核对：ChatGPT Go / Plus、Hyperknow Pro、Coursera Plus 均为公开定价（2026）。"
  >
    <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
      <div style={{ width: 760, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: NUM, fontSize: 150, fontWeight: 800, letterSpacing: '-0.04em', color: BLUE, lineHeight: 1 }}>
            HK$78
          </span>
          <span style={{ fontSize: 32, color: ON_DARK_MUTED }}>/ 月 · 积分制</span>
        </div>
        <div
          style={{
            marginTop: 44,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <span style={{ fontSize: 30, lineHeight: 1.5 }}>
            <span style={{ color: ON_DARK_MUTED }}>模型路由</span>　简单的题走小模型，难题才走大模型
          </span>
          <span style={{ fontSize: 30, lineHeight: 1.5 }}>
            <span style={{ color: ON_DARK_MUTED }}>成本</span>　积分可预测，不做无上限方案
          </span>
          <span style={{ fontSize: 30, lineHeight: 1.5 }}>
            <span style={{ color: ON_DARK_MUTED }}>对照</span>　78 港元，大约是两顿平价午餐
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ flex: 1, fontSize: 24, color: ON_DARK_MUTED }}>同样一笔钱，别人卖给你</span>
          <span style={{ width: 180, textAlign: 'right', fontSize: 24, color: ON_DARK_MUTED }}>月费</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
          <span style={{ flex: 1, fontSize: 27 }}>Coursera 旁听</span>
          <span style={{ width: 180, textAlign: 'right', fontFamily: NUM, fontSize: 27, color: ON_DARK_MUTED }}>US$0</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
          <span style={{ flex: 1, fontSize: 27 }}>ChatGPT Go</span>
          <span style={{ width: 180, textAlign: 'right', fontFamily: NUM, fontSize: 27, color: ON_DARK_MUTED }}>US$8</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
          <span style={{ flex: 1, fontSize: 27 }}>Hyperknow Pro</span>
          <span style={{ width: 180, textAlign: 'right', fontFamily: NUM, fontSize: 27, color: ON_DARK_MUTED }}>US$12</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
          <span style={{ flex: 1, fontSize: 27 }}>ChatGPT Plus</span>
          <span style={{ width: 180, textAlign: 'right', fontFamily: NUM, fontSize: 27, color: ON_DARK_MUTED }}>US$20</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
          <span style={{ flex: 1, fontSize: 27 }}>Coursera Plus</span>
          <span style={{ width: 180, textAlign: 'right', fontFamily: NUM, fontSize: 27, color: ON_DARK_MUTED }}>US$59</span>
        </div>
        <div
          style={{
            marginTop: 14,
            borderTop: `3px solid ${AMBER}`,
            paddingTop: 24,
            fontSize: 31,
            lineHeight: 1.45,
            fontWeight: 700,
          }}
        >
          便宜的能教会你，贵的也能教会你。
          <br />
          区别是：<span style={{ color: AMBER }}>没有一个价格，是按「你学会了」结算的。</span>
        </div>
      </div>
    </div>
  </Frame>
);

/* ================================================================== *
 * 附录 A · 参考文献
 * ================================================================== */

const P21: Page = () => (
  <Frame
    kicker="附錄 A"
    title="参考文献与资料来源"
    who="—"
    handoff="答問背景板 · 不計時"
    note="本頁與下一頁為答問背景板，不列入 20 分鐘正片之計時。"
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 48px', fontSize: 24, lineHeight: 1.6, color: MUTED }}>
      <span>HEPI (2026). Student Generative AI Survey 2026, Report 199.</span>
      <span>Rowland (2014). The effect of testing versus restudy. Psychological Bulletin 140(6): 1434–1454.</span>
      <span>Chuang &amp; Ho (2014). HarvardX / MITx completion study（工作論文）.</span>
      <span>Bisra et al. (2018). Self-explanation. Educational Psychology Review 30(3): 703–725.</span>
      <span>Roediger &amp; Karpicke (2006). Test-enhanced learning. Psychological Science 17(3): 249–255.</span>
      <span>Pan &amp; Rickard (2018). Transfer of test-enhanced learning. Psychological Bulletin 144(7): 710–756.</span>
      <span>Karpicke &amp; Blunt (2011). Retrieval practice. Science 331(6018): 772–775.</span>
      <span>Cepeda et al. (2006). Distributed practice. Psychological Bulletin 132(3): 354–380.</span>
      <span>Cowan (2001). Working memory capacity. BBS 24(1): 79–95.</span>
      <span>Adesope, Trevisan &amp; Sundararajan (2017). RER 87(3): 659–701.</span>
      <span>Tang, Guo, Tang &amp; Shang (2025). RPKT: Recursive Prerequisite Knowledge Tracing. IEEE FMLDS 2025.</span>
      <span>OpenMAIC · 清华大学 THU-MAIC 團隊 · AGPL-3.0 · github.com/THU-MAIC/OpenMAIC</span>
      <span>Hyperknow · hyperknow.io · 公開定價 Free / Pro US$12</span>
      <span>Coursera · 公開定價 Plus US$59/月、US$399/年、旁聽 US$0</span>
      <span>OpenAI · ChatGPT Go US$8、Plus US$20、Pro 起價 US$100（2026）</span>
    </div>
  </Frame>
);

/* ================================================================== *
 * 附录 B · 答问准备
 * ================================================================== */

const QA: FC<{ q: string; a: ReactNode; h?: boolean }> = ({ q, a, h }) => (
  <div style={{ borderTop: `1px solid ${h ? AMBER : RULE}`, paddingTop: 16 }}>
    <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: h ? AMBER : INK }}>{q}</div>
    <div style={{ fontSize: 24, lineHeight: 1.55, color: MUTED }}>{a}</div>
  </div>
);

const P22: Page = () => (
  <Frame kicker="附錄 B" title="答问准备" who="—" handoff="答問背景板 · 不計時">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px 48px' }}>
      <QA
        q="如果做不成怎么办？"
        h
        a="第 6 月激活率低于 25%，我们重做定位；第 12 月付费转化低于 3%，我们转向学校与机构采购。这两条我们事先写死了，不事后解释。"
      />
      <QA
        q="两个刚毕业的学生，做得成吗？"
        a="两人都计算机背景、中文母语，能在本校直接做试点。缺的是学习科学与商业经验——我们用顾问合作和校园试点补，不拿假话补。"
      />
      <QA
        q="Hyperknow 已经很好了，你们凭什么？"
        a="不用贬低它，它做得很认真。差别在第三段：它排的是课程什么时候上，我们排的是你卡在哪一步、为什么会卡。"
      />
      <QA
        q="用户为什么不直接用 ChatGPT？"
        a="可以用。但没有任何一个工具会告诉你「你到底学会了没有」——而那正是他付钱的理由。"
      />
      <QA
        q="学生资料会不会出事？"
        a="数据不出境、分户隔离、令牌有时效、每次导出留审计记录。另外这些分不由我们打，由授课教师出题评分。"
      />
      <QA
        q="这 20 分钟要我们记住什么？"
        a="请各位只盯一件事：第三段「用起来」。我们其余所有设计，都是为了把这一段补上。"
      />
    </div>
  </Frame>
);

/* ================================================================== *
 * Speaker notes · 逐页
 * ================================================================== */

export const notes: (string | undefined)[] = [
  `封面停三秒再开口。第一句：「我们想请各位看一个动作——判断你有没有学会。」
二十页，二十分钟连问答，实际讲话约十四分钟，每页 40 到 50 秒。附录两页不计入。`,

  `不要念投影片。让他们低头想三秒，然后抬头。
三秒之后那句「不是你笨」要说得平——像陈述，不像安慰。
第二拍才给悖论：「AI 让人更快找到答案了，但它没让人学会。」说完停一拍再翻页。`,

  `这一页的目的只有一个：把「一对一」从奢侈品变成可负担。
数字是两个，不要念文献名。家教 400 到 600 是香港市场行情；30 分钟不到 2 美元是 OpenMAIC 的公开数据。
讲到这里可以停一下，让他们自己得出「门槛塌了」。`,

  `全场最重要的一页，讲慢一点。
三段一次讲完，不要分段揭示——他们需要同时看见整把尺。
落点只有一句：前两段 AI 已经很会做，第三段还没有人做好。说完停两秒。`,

  `这一页是在回应「是不是我们不够努力」。不是。
重读组那个例子是全场最有杀伤力的一个数据，讲的时候把「而且他不知道自己落后了」单独说一遍。
不要提效应量 g，也不要提期刊名。`,

  `问句，不是陈述句。
先左边后右边，最后用 84 万／5%／35% 把落差砸下来。
跑车那句是引用不是我们的观点，说的时候要交代来源是研究者，不是我们下的判断。`,

  `【交接：交给黃羿捷】递话：「问题拆完了。接下来我讲我们怎么拆。」
交接后你走到一侧，把中间让给他。
这一页最重要的是最后那句「课怎么来，我们不比任何人强」——主动让出第一段，评委才会相信你在第三段的说法。`,

  `讲互动，不要念功能。左手指向原型截图的板书位置，右手指向章节锁。
这三件事是你们全部的差异载体，答辩时被追问也答在这里。
原型截图这一页要说实话：如果当时截图还没做，就说「这是我们要补的一张图」，别含糊。`,

  `这一页要讲出「每种形式抓一种装懂」的意思，不要变成功能罗列。
三种形式的名字按顺序念一遍，评委就懂了。
最后那句「30 天后，再来一次」是延迟轴，讲的时候要停顿，这是全场唯一的两个数字型收尾之一。`,

  `这一页是全场最能体现我们想过的地方。
线性代数那条链要慢慢指：從你答錯的那題，一层层往下，最后停在「分式運算」。
停在那一条上不说话，让它自己成立。
RPKT 那篇放进脚注就够了，不要在台上念。`,

  `讲四条，一条一句，不解释。
手指向截图里「鎖定」的那一栏——这是视觉上的落点，也是態勢語的落点。
最后一句「没验过，下一节锁住」是这一页的封口。`,

  `先说「这是承诺值，不是已经测出来的结果」——这句必须自己先说，不能等评委问。
然后讲那句最强的：这些分不由我们打，授课教师出题评分。
这一页是全场最便宜的一张可信度牌，讲的时候语气要平，不要用力推销。`,

  `先讲别人，再讲结论。不要带任何贬义。
ChatGPT 在第一段是「推到底」，Hyperknow 和 OpenMAIC 在第二段是「讲」——承认他们做得好。
结论句单独一句，说完停一拍：没有一代问过 AI 怎么让人学会。`,

  `三行一次讲完，用手指横着扫过去。
重点是第二行的右栏：改的不是节奏，是这次要教的那一个点。
最后那句 v0 要主动说，不要等评委问出来。`,

  `【交接：接回黃浩然】前一页结束前递话：「方案讲完了，下面说我们是谁、我们要什么。」
两行分工念完就够，不逐条念职责。
「已交付物」两格要提前填好，空着上会很致命。
最后那句「不用假话补」说完停一拍——这是诚实分。`,

  `这一页短，讲三十秒就够。
三张卡念完，最后一句「知道自己不做什么，比多列十个功能更可信」是唯一要强调的。
不要在这里展开商业模式，商业模式在第 19 页。`,

  `这一页从「你」开始，不要从「我们」开始。
先讲那三样是最不想交出去的，再讲我们怎么做。
四条措施要快，快到显得这些是基本操作而不是承诺。`,

  `四个节点横着指过去，每个一句。
第 18 月那一格是琥珀色，指到它的时候稍微停一下——那是全场最远的一个承诺。
不要在这页提「做不成怎么办」，那题在附录。`,

  `诚实是关键。右边那格明说「我们还没谈到一份合同，这是事实」。
主动交出一个短板，比两个都声称有优势可信得多。
讲完左边验证什么、右边验证什么，节奏要对称。`,

  `收尾页，讲慢。
先给数字，再给成本结构，然后对照表从上往下念一遍。
最后一句是全场落点：没有一个价格是按「你学会了」结算的。说完停两秒，不要加「谢谢」。
留给他们的最后一件事是这个句子，不是你的结束语。`,
  undefined,
  undefined,
];

/* ================================================================== *
 * Meta
 * ================================================================== */

export const meta: SlideMeta = {
  title: 'Veridex 維學 · 青年創業基金口頭報告',
  createdAt: '2026-09-30T02:36:49.835Z',
};

export default [
  P01,
  P02,
  P03,
  P04,
  P05,
  P06,
  P07,
  P08,
  P09,
  P10,
  P11,
  P12,
  P13,
  P14,
  P15,
  P16,
  P17,
  P18,
  P19,
  P20,
  P21,
  P22,
] satisfies Page[];
