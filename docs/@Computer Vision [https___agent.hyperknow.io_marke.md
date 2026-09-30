<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# @Computer Vision [https://agent.hyperknow.io/marketplace](https://agent.hyperknow.io/marketplace) 你看一下资料库，明天我要撰写一份商业计划书，实际上就是编写计划书的提交表格。

目前我打算做一个类似于 Hyper 的 AI 教育平台，具体情况如下：

1. 竞争对手：
目前已有的竞争对手包括 Coursera、吴恩达创建的 DeepLearning.AI，以及其他一些竞争者。
2. 产品形态与理念：
我们的主体类似于 Hyper，以及清华大学开源的项目 OpenMAIC。产品的理念和形态与这两者有点像，主要就是 AI 媒体、AI 量身定制打造课程。
3. 盈利点：
(a) 与各高校合作。
(b) 面对普通用户推出 AI 积分套餐。
反正大多数和 AI 有关的产品，盈利来源都是 AI 的市场份额。

我想先探索一些机会，看看这个想法怎么样。你可以去搜索一下相关资料，然后来告诉我：
(a) 这是什么计划书？
(b) 还有其他需要注意什么？具体有哪些要求？

资料库里没有这份计划书。35 个文件都是计算机视觉讲义和笔记，没有表格、比赛简章或商业计划模板。你给的 [marketplace](https://agent.hyperknow.io/marketplace) 我也打不开，所以下面按公开资料和香港常见创业表格来判断。

## 这是什么计划书

它不是论文，也不是产品介绍。提交表格要求的是一份可评审的商业计划：说明你卖给谁、为什么现在能做成、钱从哪来、怎么花、团队凭什么做。

香港数码港孵化申请的固定栏目很接近这类表格：[公司背景、项目与市场、产品、收入与推广、实施里程碑、财务、核心团队](https://www.cyberport.hk/en/entrepreneurship/cyberport_incubation_programme_faq/)。[SUCCESS 的 ACCA 范本](https://www.success.tid.gov.hk/tc_chi/bus_sta_up_inf_ser/bus_plan/bus_plan.html)也是同一结构，用途是内部检讨或向银行、贷款机构和投资者说明业务，不保证能拿到钱。

评委会看的是：问题是否真实、方案是否可执行、数字是否自洽。空泛的“AI 会改变教育”通常过不了。

## 机会和硬伤

方向有市场，但形态已经很挤。

- [Hyperknow](https://www.hyperknow.io/) 已是“把课件变成测验、闪卡、摘要和讲解视频”的学习代理，并接入 Canvas。公开定价是免费、Pro 每月 18 美元、Max 每月 50 美元。
- [OpenMAIC](https://open.maic.chat/) 已把主题或 PDF 变成多代理课堂：AI 教师、助教、同学、课件、测验和白板。代码以 [AGPL-3.0](https://github.com/THU-MAIC/OpenMAIC) 开源，高校可自托管。
- Coursera、DeepLearning.AI 卖的是品牌课程和证书，不是同一战场。真正的对手是 Hyperknow、OpenMAIC，以及学校已有的 LMS 和 AI 插件。

“高校合作 + 用户积分”可以作为收入假设，但不能当商业模式本身。高校采购周期长、决策人多、试点往往不付钱；积分只是把模型调用成本转卖给用户。计划书必须写出：谁签约、客单价、销售周期、毛利，以及一个用户生成一节课要消耗多少 token。

更严重的是差异化。如果只是“像 Hyper，也像 OpenMAIC”，评委会直接问：为什么不用它们？需要一个可验证的切口，例如只做计算机视觉实验课、对接某校 LMS、或用课程学习数据做掌握度追踪。没有这个切口，不建议把“通用 AI 课程平台”写成主方案。

## 表格里必须写清

按常见提交表，至少准备这些栏，每栏用事实，不用愿景句。


| 栏目 | 要写什么 | 你现在的缺口 |
| :-- | :-- | :-- |
| 问题 | 谁、在什么场景、现在怎么学、痛点有多贵 | 还没有访谈或数据 |
| 方案 | 输入、生成物、交互、和 Hyper/OpenMAIC 的一个差异 | 形态重叠 |
| 客户 | 第一所试点校、院系、决策人、普通用户画像 | 未指定 |
| 市场 | 可服务市场，不要只贴全球 EdTech 大盘 | 数字未校准 |
| 竞争 | 至少 5 家，含替代方案：ChatGPT、学校 LMS | 只列了课程平台 |
| 收入 | 高校年费或试点费；积分单价、用量、毛利 | 只有方向 |
| 成本 | 模型 API、存储、人力、销售 | 未估算 |
| 里程碑 | 6 个月和 12 个月可验收结果 | 未写 |
| 团队 | 谁做模型、产品、高校关系 | 未写 |
| 风险 | 幻觉、版权、隐私、学术诚信、AGPL | 未写 |

财务不要编“三年做到多少亿”。用三档就够：保守、基准、进取。例如 1 所试点校、100 个付费学生、每生每月生成多少次，再乘客单价，减去 API 成本。数字对不上，比数字小更致命。

另外三件容易被忽略：

- 学生课件、作业和成绩属于个人资料。要写采集范围、保存期限、是否出境、学校 DPA，以及生成内容能否当成绩。
- 不要把 Coursera 或学校课件直接拿去训练或再分发。生成内容要能追溯到来源，并声明不能替代教师评分。
- OpenMAIC 是 AGPL-3.0。若改它的代码并以网络服务提供，通常要开源衍生作品；闭源商用要另谈授权。不要在计划书里写成“基于 OpenMAIC 闭源收费”而不提许可。

明天交表的话，先补三样：10 个目标用户的原话、一张和 Hyperknow / OpenMAIC / ChatGPT 的对比表、一份 12 个月现金流。没有这三样，表格可以填满，但站不住。

<span style="display:none">[^1_1][^1_10][^1_11][^1_12][^1_13][^1_14][^1_15][^1_16][^1_17][^1_18][^1_19][^1_2][^1_20][^1_21][^1_22][^1_23][^1_24][^1_25][^1_26][^1_27][^1_28][^1_29][^1_3][^1_30][^1_31][^1_32][^1_33][^1_34][^1_35][^1_36][^1_37][^1_38][^1_39][^1_4][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://www.tsinghua.edu.cn/en/info/1245/14044.htm

[^1_2]: https://github.com/THU-MAIC/OpenMAIC

[^1_3]: https://www.hyperknow.io/

[^1_4]: https://www.linkedin.com/posts/jharrod_openmaic-activity-7439962876825493504-v0_O

[^1_5]: https://agent.hyperknow.io/

[^1_6]: https://www.linkedin.com/company/hyper-know

[^1_7]: https://allclaw.org/blog/openmaic-open-source-ai-classroom

[^1_8]: https://agent.hyperknow.io/signup

[^1_9]: https://open.maic.chat/

[^1_10]: https://x.com/hyperknow_ai

[^1_11]: https://www.100user.com/blog/openmaic-revolutionizing-learning-ai-era

[^1_12]: https://www.linkedin.com/posts/hyper-know\_%F0%9D%90%93%F0%9D%90%A8%F0%9D%90%9D%F0%9D%90%9A%F0%9D%90%B2-%F0%9D%90%B0%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%A8%F0%9D%90%9F%F0%9D%90%9F%F0%9D%90%A2%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%9A%F0%9D%90%A5%F0%9D%90%A5%F0%9D%90%B2-activity-7393055584486363136-EZHV

[^1_13]: https://agent.hyperknow.io/response/d238425c-200b-4ad6-a995-c05603da45ea

[^1_14]: https://x.com/ai_for_success/status/2033184400452821131

[^1_15]: https://agent.hyperknow.io/signin

[^1_16]: https://www.success.tid.gov.hk/tc_chi/bus_sta_up_inf_ser/bus_plan/bus_plan.html

[^1_17]: https://www.youth.gov.hk/tc/startup/stories/e2ce9c80-4e4d-4d04-b5fd-98d6df615629

[^1_18]: https://www.instructure.com/products/canvas-tiers

[^1_19]: https://github.com/devexsolutions/openmaic

[^1_20]: https://openmaic.io/

[^1_21]: https://dev.to/aniruddhaadak/i-gave-an-ai-my-study-materials-and-it-planned-my-entire-learning-schedule-hyperknow-is-not-just-53g

[^1_22]: https://sic.hkfyg.org.hk/wp-content/uploads/sites/82/2017/10/ApplicationBooklet.pdf

[^1_23]: https://www.hyperknow.io/manifesto

[^1_24]: https://openmaic.io/openmaic-open-source-education.html

[^1_25]: https://www.hk01.com/開罐/60375095/2026香港創業基金-14大初創資助計劃一文睇清-10萬種子基金起步

[^1_26]: https://www.hyperknow.io/blogs/study-with-ai

[^1_27]: https://open.maic.chat/home

[^1_28]: https://www.smelink.gov.hk/en/web/sme-portal/w/cyberport-incubation-programme.html

[^1_29]: https://www.startmeup.hk/resources/cyberport-creative-micro-fund-ccmf/

[^1_30]: https://sa.hkbu.edu.hk/content/dam/sa-assets/cc-assets/document/Att-CIP CCMF programme leaflet.pdf

[^1_31]: https://icb.hku.hk/chs/innovalley/2026-innovalley-terms-and-conditions

[^1_32]: https://www.cyberport.hk/en/entrepreneurship/cyberport_incubation_programme/

[^1_33]: https://www.cyberport.hk/en/entrepreneurship/cyberport_incubation_programme_faq/

[^1_34]: https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-education-market-report

[^1_35]: https://www.fortunebusinessinsights.com/edtech-market-111377

[^1_36]: https://market.us/report/ai-in-k-12-education-market/

[^1_37]: https://ceie.eduhk.hk/zh/activities/other-activities-and-information/

[^1_38]: https://www.mordorintelligence.com/industry-reports/ai-in-education-market

[^1_39]: https://www.weventure.gov.hk/tc/plan_details/ngo/ngo_details.html?id=5


---

# 你还有什么想法？以后的教育趋势肯定是绝对的定制化、个人化教育吧。比如一些已经采用这种理念的私人教育机构，像 Alpha School 已经是这样了，所以 AI native 的教育肯定也是教育行业的一个大趋势吧。

我这份计划书明天就要提交了，应该怎么填写呢？第一个是商业计划表格，你有什么建议？能不能先做个深度的研究？

个性化是方向，但不是“绝对定制化”。明天的表格要把 Alpha School 写成市场信号和风险案例，不要写成你的产品已经成立的证据。资料库里仍然没有这份表格，下面按香港创业申请表的常见栏目来填。

## 趋势判断

教育会更个性化，但学校不会取消共同课标、考试和教师责任。能规模化的是掌握度驱动的自适应学习：先诊断会什么，再给下一道题或下一段讲解，而不是给每个人生成一门完全不同的课。

Alpha School 说明的是私立 K–12 学校，不是一套可直接复制的软件。学生上午约两小时用自适应系统学学术内容，下午由人类 Guide 带生活技能；多数校园学费在每年 4 万至 7.5 万美元。 它自称学生在阅读和数学的 MAP 测验上表现很强，但原始数据没有公开，外部研究者不能据此判断成绩是项目造成的，还是入学学生本身造成的。 2026 年还有调查称其 AI 教案和选择题质量有问题；学校否认这些指控。[^2_1][^2_2]

更硬的证据来自学习研究，不来自学校宣传。斯坦福 2026 年综述指出，K–12 里高质量因果研究仍然很少：学生在能使用 AI 时，练习成绩往往上升；拿掉 AI 再考，效果就不稳定。有教学护栏、只给提示而不直接给答案的工具，比通用聊天机器人更有希望。 《科学美国人》引述的哈佛物理课实验也只说明：教师训练过的自适应导师，可以比课堂主动学习带来更高的即时增益；作者同时警告，没有师生关系、只在同一条件下学习和考试，知识会变脆。[^2_3][^2_1]

所以计划书里可以写“个性化是趋势”，不能写“未来一定是绝对定制，因此我们会赢”。评委要的是：你个性化的是路径，还是连标准和评估也一起拆掉。

## 表格怎么填

把项目收成一句话：面向高校计算机课程的 AI 备课与自适应练习工具。学生上传课件后，系统生成讲解、测验和补救路径；教师保留大纲、评分和学术诚信控制。不要写成“下一个 Coursera”，也不要写成“大学版 Alpha School”。

Hyperknow 已经在做 Canvas 里的摘要、测验和讲解；OpenMAIC 已经能把 PDF 变成多代理课堂，而且 AGPL-3.0 开源。你的差异只能写一个可验证的点：掌握度追踪加教师闸门。系统不直接发答案，先出诊断题，错了才生成补救材料，教师能看到全班卡在哪一节。

收入不要写“占据 AI 市场份额”。写成两条，并标成假设：

- 高校：一学期试点费，或按活跃学生座位年费。决策人是课程负责教师和院系，不是“高校”这个抽象客户。
- 个人：按生成次数卖积分。积分价必须高于单次模型调用成本，否则用户越多越亏。

12 个月只承诺一个试点，不承诺全国铺开。例如：第 1–2 月做一门计算机视觉课的最小闭环；第 3–4 月找 20 名学生测完成率和测验提升；第 5–8 月给一位教师试用；第 9–12 月谈一所学校的付费试点。没有教师姓名就写“目标院系”，不要编已经签约。

## 可直接改的段落

项目概述可以这样写：

> 本项目做高校课程的 AI 原生学习工具。学生或教师上传课程材料后，系统生成讲解、练习和错题补救路径，并根据答题记录调整下一步，而不是为每人生成一套无标准的新课。首个场景是计算机视觉等结构化理工课程。与 Coursera 的区别是我们不先做内容平台；与通用聊天机器人的区别是不直接给答案，并把学习记录交回教师。

市场机会可以这样写：

> 个性化学习需求真实，但证据要求产品做成“有护栏的自适应”，不是无限制生成。Alpha School 证明高学费私立学校愿意为“两小时学术 + 人类导师”付费，但其成绩数据未经独立复核，且出现过生成内容质量争议。 学术证据显示，AI 能提高使用当时的练习表现，却不保证撤掉工具后仍会。 因此我们的机会不是替代学校，而是帮一门已有课程降低补习和重复讲解成本，并用测验证明学生是否真正掌握。[^2_2][^2_1][^2_3]

竞争可以列五行：Coursera / DeepLearning.AI 卖品牌证书；Hyperknow 卖学习代理；OpenMAIC 卖可自托管的多代理课堂；ChatGPT 是免费替代；学校现有 LMS 是采购时的默认选项。你的位置写成“LMS 旁的掌握度层”，不要写成“全面替代”。

财务用三档，数字今晚自己填，但公式写出来：收入 = 试点校数 × 座位费 + 付费人数 × 月积分。成本 = 每次生成的 API 费 × 次数 + 人力。毛利为负就明确写“试点期由自有资金覆盖，不把积分当利润”。没有真实用量时，写“待 20 人试用后校准”，比编一个漂亮的三年预测安全。

## 今晚别写的话

不要写“教育趋势是绝对定制化，所以市场必然属于我们”。这句既不符合证据，也会让评委认为你没看过 Alpha 的反例。

不要把 Alpha 的“两倍速度、顶尖百分位”写成行业事实。可以写“有学校在销售此主张，但独立验证不足”。[^2_1]

不要承诺 AI 自动出分、自动认定学业完成。高校最在意幻觉、课件版权、学生作业隐私和学术诚信。表格的风险栏写四条应对：生成内容可追溯到来源课件；默认不直接给答案；作业数据只在试点校协议范围内保存；评分权留在教师。

若表格有单独一栏问“为何现在做”，用这个判断就够：生成课程已经不稀缺，稀缺的是能测量、能被教师信任、撤掉 AI 后仍然记得的个性化。你的计划书卖的应是这后半句。

[https://www.scientificamerican.com/article/alpha-schools-ai-teaching-model-is-expanding-does-it-work/](https://www.scientificamerican.com/article/alpha-schools-ai-teaching-model-is-expanding-does-it-work/)[^2_1]
[https://www.wskg.org/2026-03-23/investigation-finds-faulty-lesson-plans-and-unhappy-students-at-an-ai-powered-private-school](https://www.wskg.org/2026-03-23/investigation-finds-faulty-lesson-plans-and-unhappy-students-at-an-ai-powered-private-school)[^2_2]
[https://scale.stanford.edu/sites/default/files/The%20Evidence%20Base%20on%20AI%20in%20K-12%20Report.pdf](https://scale.stanford.edu/sites/default/files/The%20Evidence%20Base%20on%20AI%20in%20K-12%20Report.pdf)[^2_3]

<span style="display:none">[^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_16][^2_17][^2_18][^2_19][^2_20][^2_21][^2_22][^2_23][^2_24][^2_25][^2_26][^2_27][^2_28][^2_29][^2_4][^2_5][^2_6][^2_7][^2_8][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://www.sciencedirect.com/science/article/pii/S2590291125008447

[^2_2]: https://www.wskg.org/2026-03-23/investigation-finds-faulty-lesson-plans-and-unhappy-students-at-an-ai-powered-private-school

[^2_3]: https://reports.weforum.org/docs/WEF_Shaping_the_Future_of_Learning_2026.pdf

[^2_4]: https://www.e-iji.net/dosyalar/iji_2026_1_29.pdf

[^2_5]: https://www.scientificamerican.com/article/alpha-schools-ai-teaching-model-is-expanding-does-it-work/

[^2_6]: https://scale.stanford.edu/sites/default/files/The Evidence Base on AI in K-12 Report.pdf

[^2_7]: https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1782626/full

[^2_8]: https://contently.com/case-studies/alpha-school/

[^2_9]: https://knowledgeworks.org/resources/artificial-intelligence-optimize-personalized-learning/

[^2_10]: https://www.linkedin.com/posts/patchfordham_aiineducation-futureoflearning-alphaschool-activity-7335258891296927744-o8Ts

[^2_11]: https://www.reddit.com/r/technology/comments/1r84pkg/students_are_being_treated_like_guinea_pigs/

[^2_12]: https://stormy.ai/blog/alpha-school-ai-education-business-model

[^2_13]: https://www.texaspolicy.com/alpha-school-isnt-an-ai-story-its-a-structural-indictment-and-employers-hr-should-pay-attention/

[^2_14]: https://www.aifunlab.io/learn/alpha-school-review-75k-ai-first-pros-cons-parent-guide

[^2_15]: https://schoolscambodia.com/what-is-alpha-school/

[^2_16]: https://www.dhl.com/discover/zh-hk/small-business-advice/starting-a-business/business-plan-advice

[^2_17]: https://en.wikipedia.org/wiki/Alpha_School

[^2_18]: https://www.businessgo.hsbc.com/zh-Hans/article/creating-business-plan-with-examples

[^2_19]: https://www.nova.com.hk/zh-hans/news-blog/how-to-write-a-business-plan-complete-business-plan-template/

[^2_20]: https://nepc.colorado.edu/blog/fprice-kids-pay

[^2_21]: https://alpha.school/resources/how-do-alpha-school-workshops-develop-personalized-learning-and-ai-tutoring/

[^2_22]: https://alpha.school/faq/

[^2_23]: https://cpo.eduhk.hk/zhs/entrepreneurship/business-resources/business-templates

[^2_24]: https://www.taiwanarena.tech/program-detail/BusinessPlan/

[^2_25]: https://beginnersinai.org/alpha-school-explained/

[^2_26]: https://nypost.com/2026/01/30/business/new-65k-private-school-uses-ai-to-teach-students-in-just-two-hours-a-day-in-silicon-valley-bid-to-shake-up-us-education/

[^2_27]: https://www.youth.gov.hk/tc/startup/stories/e2ce9c80-4e4d-4d04-b5fd-98d6df615629

[^2_28]: https://www.success.tid.gov.hk/tc_chi/bus_sta_up_inf_ser/bus_plan/bus_plan.html

[^2_29]: https://sic.hkfyg.org.hk/wp-content/uploads/sites/82/2017/10/ApplicationBooklet.pdf


---

# 我对整个产品的定位类似于 Hyper。比如，用户可以：

1. 上传一些本地文件；
2. 连接学校云端的 Canvas 或 MS 系统；
3. 直接利用 Agent 的能力生成一些课程，供用户自己学习。

它不是一定要面向某个特定专业的对应用户。你可以先 grill 我一下，问一下我的真实想法。一次问一个问题

先不谈专业和商业模式。如果 Hyper 明天就支持你说的这三步——上传本地文件、连接 Canvas 或 Microsoft 学校系统、用 Agent 生成课程——你的产品还解决什么它解决不了的问题？

---

# 没有，功能基本和他们一样，现在市面上AI产品都是差不多这个功能。当然我的还有连接器，比如连接到Notion或者其他APP，就是MCP

连接器本身不是产品。Notion、Canvas 和 ChatGPT 也都能接 MCP。连上之后，用户哪一件现在做不到的事，必须通过你才能完成？

---

# 创建课程啊。就像Hyperknow那样，AI授课，用户随时提问，AI解答，还配备课后习题和项目，并且还会开设通知等等，进行跨设备同步

这些 Hyperknow 现在就能做。学生已经有它，为什么要关掉它、改用你的？

---

# Cheaper。比如面向学生有优惠，比如可以自己选择模型，比如BYOK。

用户自己带 Key 后，模型费用不经过你。他每个月付给你的钱，具体是在买哪一件 Hyperknow 免费版做不到的事？

---

# ok我不会开设BYOK的功能

不开放 BYOK，模型费用就由你承担。你凭什么比 Hyperknow 更便宜，还不会在每次生成课程时亏钱？

---

# 我不知道。你去看看hyperknow是怎么做的，目前的模型路由app比如openrouter又是怎么做的

Hyperknow 卖的是带用量上限的月费，不是模型路由。OpenRouter 卖的是统一接口和充值手续费，也不是更便宜的课。

## 两家怎么赚钱

Hyperknow 公开的是三档订阅，不公开用哪家模型，也不让用户自带 Key。[^8_1]

- 免费档：能上传文件、生成测验和闪卡，但 Agent 用量有限，每次查询最多 10 个文件。
- Pro：每月 18 美元。用量是免费档的数倍，打开记忆，取消单次文件上限。
- Max：每月 50 美元。用量再提高数倍，面向重度生成课程的人，并写明“每积分成本最低”。

它的条款也写明是 freemium：免费用户有用量和处理上限，付费用户买的是更高额度、优先处理和更多功能。 所以它能看起来“不贵”，靠的是三件事：你选不了模型，它把便宜模型用在摘要、测验上，贵模型只用在难讲解上；多数学生用不满额度，重度用户被推到 50 美元；免费档用硬上限挡住亏损。[^8_2]

OpenRouter 是给开发者的模型市场，不是教育产品。官方说法是推理价格按供应商原价透传，不在 token 上加价；钱主要来自买积分时的手续费。[^8_3][^8_4]

- 免费：约 25 个免费模型，每天 50 次请求，没有自动路由。
- 标准按量付费：信用卡充值收 5.5%，最低 0.80 美元；加密货币充值收 5%。
- 商业版手续费是 8%。
- 自带 Key 不是免费功能：按量付费每月有 2.5 万美元标价额度，超出部分再收 5%。

路由的作用是稳定和挑便宜供应商。主模型失败、限流或拒答时，按你排好的顺序换下一个模型，并按最终跑成的那个模型计费。想要更便宜，可以指定按价格排序，而不是按质量排序。

## 对你意味着什么

你不能靠“比 Hyperknow 便宜”活下来，除非你接受更差的模型或更低的额度。18 美元买的不是无限授课，而是被封顶的用量。你若收 9 美元，又提供同样的课程生成、提问、习题和同步，平均每个付费用户的模型成本就必须低于 9 美元。这个数你现在没有。

OpenRouter 也不能当你的商业模式。学生不会为了“一个接口接很多模型”付你钱；那是开发者需求。你若自己接 OpenRouter，只是把供应商账单换成另一张账单，再加 5.5% 充值费。

明天表格里可以写的只有这句：收入是订阅或积分，成本是模型调用。免费档必须有硬上限。没有测出“生成一节课花多少钱”之前，不写“我们更便宜”。

<span style="display:none">[^8_10][^8_11][^8_12][^8_13][^8_14][^8_15][^8_16][^8_17][^8_18][^8_19][^8_20][^8_21][^8_22][^8_23][^8_24][^8_25][^8_26][^8_27][^8_28][^8_5][^8_6][^8_7][^8_8][^8_9]</span>

<div align="center">⁂</div>

[^8_1]: https://help.make.com/adjustments-to-plans-and-pricing

[^8_2]: https://www.canva.com/pricing/

[^8_3]: https://openrouter.ai/pricing

[^8_4]: https://openrouter.ai/docs/faq

[^8_5]: https://www.hyperknow.io/terms-of-service

[^8_6]: https://www.layer3labs.io/guides/openrouter-pricing

[^8_7]: https://ofox.ai/blog/openrouter-pricing-hidden-markup-breakdown-2026/

[^8_8]: https://www.edugenius.app/blog/comparing-ai-education-pricing-models

[^8_9]: https://checkthat.ai/brands/openrouter/pricing

[^8_10]: https://coworker.ai/blog/openrouter-pricing

[^8_11]: https://www.hyperknow.io/blogs/quizlet-alternative

[^8_12]: https://claude.com/product/overview

[^8_13]: https://www.fivetran.com/blog/gpt-vs-claude-whats-the-best-ai-model

[^8_14]: https://openrouter.ai/openrouter/free

[^8_15]: https://openrouter.ai/docs/guides/routing/model-fallbacks

[^8_16]: https://openrouter.ai/docs/guides/routing/routers/auto-router

[^8_17]: https://info.mammouth.ai/docs/model-self-awareness/

[^8_18]: https://github.com/openfreerouter/freerouter

[^8_19]: https://blog.devops.dev/how-gpt-and-claude-are-trained-the-three-stage-recipe-behind-modern-ai-9ae82233330c

[^8_20]: https://meingpt.com/en/docs/platform/models

[^8_21]: https://ooda.ai/models

[^8_22]: https://www.clickittech.com/ai/claude-vs-gpt/

[^8_23]: https://community.n8n.io/t/openrouter-fallback-model-not-used-when-free-primary-model-limit-hit/200772

[^8_24]: https://www.reddit.com/r/LocalLLaMA/comments/1rdbe7e/open_router_as_free_api_for_openclaw/

[^8_25]: https://www.hyperknow.io/

[^8_26]: https://www.hyperknow.io/manifesto

[^8_27]: https://dev.to/aniruddhaadak/i-gave-an-ai-my-study-materials-and-it-planned-my-entire-learning-schedule-hyperknow-is-not-just-53g

[^8_28]: https://www.linkedin.com/company/hyper-know


---

# 那你先做个深度调研，帮我想一个盈利方式，就是要做到既比学生直接使用 ChatGPT 更便宜，但同时又比 hyperknow 更贵。比如还可以实现这种阶梯式的套餐制度

这个比价不成立。Hyperknow Pro 是每月 18 美元，ChatGPT Plus 是每月 20 美元，中间只剩 19 美元，没有利润，也没有购买理由。 能写进计划书的，不是“月费夹在两者之间”，而是“月费高于 Hyperknow Pro，但完成一门课的模型成本远低于学生去买 ChatGPT Pro”。[^9_1][^9_2]

## 价格空档在哪

学生真正会买的 ChatGPT 不是一个价格。Go 是每月 8 美元，Plus 是 20 美元；重度使用要买 Pro，100 美元是 Plus 的 5 倍用量，200 美元是 20 倍。 Hyperknow 则是免费、Pro 18 美元、Max 50 美元，Max 明确面向每天大量生成课程的人。[^9_3][^9_1]

所以三句话只能成立两句：

- 可以比 Hyperknow Pro 贵。
- 可以比 ChatGPT Pro 便宜。
- 不能同时比 Hyperknow Pro 贵、又比学生常用的 Plus 便宜。

便宜只发生在单门课，不发生在月费贴纸上。按 OpenAI 现在的短上下文标价，中档 gpt-6-sol 是每百万 token 输入 2 美元、输出 10 美元；便宜档 gpt-6-luna 是输入 0.10 美元、输出 0.50 美元。 下面是估算，不是实测：一门课 8 节，课件缓存后重复使用，提问走中档，测验走便宜档，模型成本大约 1 美元。学生月费若定在 29 美元，毛利来自他用不满，不来自 token 本身很贵。[^9_4]

## 阶梯怎么卖

不要按“模型更聪明”分档。学生听不懂，你也控不住成本。按一门课的次数和同步范围分档，旗舰模型单独扣积分。


| 套餐 | 月费 | 包含 | 对照 |
| :-- | :-- | :-- | :-- |
| 试用 | 0 美元 | 1 门短课，仅便宜模型，无学校同步 | 获客，硬上限 |
| 课程 | 29 美元 | 4 门课，或 80 次中档授课；可接 Canvas | 高于 Hyperknow Pro 的 18 美元，也高于 Plus 的 20 美元 |
| 学期 | 39 美元 | 12 门课，项目草稿，到期通知 | 低于 Hyperknow Max 的 50 美元，远低于 ChatGPT Pro 的 100 美元 |
| 加油包 | 8 美元 / 1 门课 | 额度用完才卖 | 真正的高毛利 |

29 美元这一档必须在表格里写明购买理由：学生买到的是课件、提问、习题、项目和截止日期同步，不是无限聊天。若只写“比 ChatGPT 便宜”，评委一对 Plus 的 20 美元就会判你数字错。

积分规则也要写死。便宜模型的测验和摘要计 0.2 积分，中档授课计 1 积分，旗舰模型计 5 积分。用户不能在 29 美元里无限调用最贵模型。否则一个重度用户的账单会超过 ChatGPT Pro，你却只收了 Hyperknow 的价格。

## 表格里怎么写

收入假设用三档，不要写市占率。保守：100 个付费学生，八成买 29 美元，两成买 39 美元，月收入约 3100 美元。基准再加 20% 的人每月买一个 8 美元加油包。成本按每个付费用户每月 4 到 8 美元模型费估算，毛利才站得住；这个 4 到 8 美元必须在 20 人试用后改成实测，现在只能标成假设。

高校合作不要和这套个人价格混写。学校若按学期替学生付钱，学生侧可以低于 Plus；你的发票则按座位卖，不按“更便宜”卖。个人套餐故意比 Hyperknow Pro 贵，高校座位才承担“比学生自己买 ChatGPT 便宜”。两条收入，两个价格，不要合成一句。

<span style="display:none">[^9_10][^9_11][^9_12][^9_13][^9_14][^9_15][^9_16][^9_17][^9_18][^9_19][^9_20][^9_21][^9_22][^9_23][^9_24][^9_25][^9_26][^9_27][^9_28][^9_29][^9_5][^9_6][^9_7][^9_8][^9_9]</span>

<div align="center">⁂</div>

[^9_1]: https://developers.openai.com/api/docs/pricing

[^9_2]: https://developers.openai.com/api/docs/models/gpt-4o-mini

[^9_3]: https://azure.microsoft.com/en-us/pricing/details/azure-openai/

[^9_4]: https://openrouter.ai/openai/gpt-4o-mini

[^9_5]: https://krater.ai/blog/chatgpt-plus-student-discount

[^9_6]: https://chatgpt.com/pricing/

[^9_7]: https://familypro.io/en/blog/chatgpt-price-for-students

[^9_8]: https://www.glbgpt.com/hub/chatgpt-back-to-school-deals-2026-no-official-discount-get-50-off-with-globalgpt/

[^9_9]: https://dotlane.ai/blog/chatgpt-plus-student-discount-alternative

[^9_10]: https://hyperknow.com/

[^9_11]: https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus

[^9_12]: https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers

[^9_13]: https://learn.chatgpt.com/docs/pricing

[^9_14]: https://zapier.com/blog/chatgpt-plus/

[^9_15]: https://wise.com/gb/blog/chatgpt-pricing

[^9_16]: https://zapier.com/blog/chatgpt-pro/

[^9_17]: https://chatgpt.com/plans/pro/

[^9_18]: https://opentherank.com/ai-pricing/chatgpt/

[^9_19]: https://userjot.com/blog/chatgpt-pricing-2025-plus-pro-team-costs

[^9_20]: https://techjacksolutions.com/ai-tools/chatgpt/chatgpt-pricing/

[^9_21]: https://www.gamsgo.com/blog/chatgpt-plus-free

[^9_22]: https://www.cloudzero.com/blog/how-much-does-chatgpt-cost/

[^9_23]: https://suprmind.ai/hub/chatgpt/pricing/

[^9_24]: https://chatgpt.com/plans/plus/

[^9_25]: https://www.hyperknow.io/

[^9_26]: https://www.hyperknow.io/terms-of-service

[^9_27]: https://www.hyperknow.io/blogs/study-with-ai

[^9_28]: https://www.linkedin.com/company/hyper-know

[^9_29]: https://www.hyperknow.io/manifesto


---

# 所以，这个套餐阶梯到底该怎么设置？用户应该享有哪些权利：

1. 连接器的权利。
2. 开设课程的上限。
3. 储存文件的上限。
4. AI 模型的强大程度，以及 AI 积分的上限。

关于 AI 积分，它可以去微调课程，也可以去生成课程。但是你现在需要 8 美元或者有积分才能生成课程，这个设定有点不太合理。我感觉这个加油包价格是真的有点太离谱了，88美元一门课。我用 Hyperknow 里面用积分开这门课，好像肯定也不用88美元，88美元可能太贵了，它只是消耗积分。 所以，这个套餐阶梯到底该怎么设置？用户应该享哪些权利： 首先肯定是连接器的权利。 还有就是开设课程的上限， 还有就是储存文件的上限， 还有就是AI模型的强大，以及AI积分的一个上限。 就AI积分的话，它可以去微调课程，也可以去生成课程。但是你现在是88美元才能生成课程，积分才能够生成课程这个东西，你现在这个有点不太合理。

上一档写的是 8 美元，不是 88 美元。即便是 8 美元，把它当成“付钱才准开课”也不对。开课、改课都只扣套餐里的积分，加油包只是积分用完后的补充。

## 先改规则

用户买的是五类权利，不是买“开课许可证”。

- 连接器决定能接几个系统。
- 开课上限决定这个月最多留下几门课。
- 存储决定课件和生成结果能放多少。
- 模型上限决定最强能用到哪一档。
- 积分决定生成和修改一共能做多少次。

生成一门课、改一节、重出习题，都从同一本积分里扣。积分够就能做，不另收开课费。开课上限只防止把积分全部拿去无限开新课。

## 三档权利

Hyperknow 公开的是免费、Pro 每月 18 美元、Max 每月 50 美元，没有公开“一门课等于多少积分”。下面的数字是你自己的套餐，不是它的标价。


| 权利 | 免费 | 课程档，每月 24 美元 | 学期档，每月 39 美元 |
| :-- | :-- | :-- | :-- |
| 连接器 | 无，只能上传本地文件 | 1 个，Canvas、Notion、Microsoft 三选一 | 3 个都可接 |
| 开课上限 | 1 门短课 | 4 门 | 12 门 |
| 存储 | 200 MB | 5 GB | 20 GB |
| 模型 | 只可用轻量 | 轻量和标准 | 标准为主，另含 30 次旗舰 |
| 月积分 | 30 | 200 | 600 |
| 通知和跨设备同步 | 无 | 有 | 有 |

24 美元高于 Hyperknow Pro 的 18 美元，也高于 ChatGPT Plus 的 20 美元。购买理由是连接器和完整课程，不是月费更低。39 美元仍低于 Hyperknow Max 的 50 美元，也低于 ChatGPT Pro 的 100 美元。

## 积分怎么扣

先把 1 积分定成一次标准模型的短操作。实际扣费按这个表：

- 生成一门标准课：40 积分。含讲解、习题和项目提纲。
- 改一节或重出一组题：2 积分。
- 整门课重做：20 积分。因为课件已在存储里，不再按首次生成计。
- 轻量模型按上表的一半扣，旗舰模型按 3 倍扣。

课程档的 200 积分正好是 4 次首次生成，共 160 积分，剩下 40 积分用来改课。学期档 600 积分同样够 12 门新课，并留下修改余地。免费档 30 积分只够一门缩水短课，不够再改一轮。

这样用户不会遇到“有套餐却要再付一笔才能开课”。积分用完，才需要加油或升级。

## 加油包

只卖给付费档，每 40 积分 4 美元。这 40 积分可以新开一门，也可以改 20 节，由用户自己分。它不提高开课上限、存储和连接器数量；要更多课，必须升级套餐。

不要把加油包定成 8 美元一门，更不要定成 88 美元。你的模型成本大约是一门课 1 美元，4 美元已经是成本的 4 倍。再高，用户会回到 Hyperknow 用它自己的积分开课。

<span style="display:none">[^10_1][^10_10][^10_11][^10_12][^10_13][^10_14][^10_15][^10_2][^10_3][^10_4][^10_5][^10_6][^10_7][^10_8][^10_9]</span>

<div align="center">⁂</div>

[^10_1]: https://support.google.com/gemini/thread/364157085/request-for-unlimited-daily-video-generation-quota-in-gemini-veo-3?hl=en

[^10_2]: https://help.figma.com/hc/en-us/articles/33459875669015-How-AI-credits-work

[^10_3]: https://azure.microsoft.com/en-us/pricing/details/storage/blobs/

[^10_4]: https://claude.com/pricing

[^10_5]: https://help.heygen.com/en/articles/15125761-heygen-credit-based-pricing-plans-subscriptions-explained

[^10_6]: https://www.reddit.com/r/cloudstorage/comments/1ajmvcd/i_made_a_massive_cloud_storage_comparison_table/

[^10_7]: https://kingy.ai/ai-limits/

[^10_8]: https://www.cloudwards.net/understanding-cloud-storage-pricing/

[^10_9]: https://www.reddit.com/r/DataHoarder/comments/1aketpm/i_made_a_huge_comparison_table_to_help_you_find/

[^10_10]: https://commandcode.ai/docs/resources/pricing-limits

[^10_11]: https://www.hyperknow.io/

[^10_12]: https://www.hyperknow.io/terms-of-service

[^10_13]: https://agent.hyperknow.io/signin

[^10_14]: https://www.hyperknow.io/blogs/study-with-ai

[^10_15]: https://www.hyperknow.io/manifesto


---

# 我是否可以这样设置：因为每个课程的大小长短都不一样，所以我不给课程设上限。但是，对于免费用户，就只上线一门短课；一旦是普通会员或更高级会员，就不设课程上限了。

免费用户的积分应该比较少。所以，免费用户和购买套餐的用户之间的区别，主要体现在积分、连接器以及储存的数据上限等方面。其中最核心的是积分，我们整个项目的获利应该都是来源于这个积分的。

那么，这个积分应该怎么算？怎么才能合理地去路由呢？因为你的上游肯定就是那些模型提供厂商，比如 DeepSeek、Anthropic 或 OpenAI。所以，这个积分制到底该怎么设置，才能从积分当中获利？你先去搜索一下，看看其他类似平台的他们是怎么通过积分获利的

付费用户不设开课上限，这个判断是对的。课有长有短，按“一门”收费一定会在长课上亏、在短课上多收。免费用户仍要限 1 门短课。付费用户的刹车不是课程数，而是积分。

## 别人怎么赚钱

同类平台都不把积分当成“一门课的门票”。积分是上游账单的加价版。

Cursor 的付费档送出一块按美元计的用量池，调用哪个模型、用了多少 token，就扣多少。它的 Auto 模式会自己选便宜模型，输入大约每百万 token 1.25 美元，输出大约 6 美元。个人超额按原价继续计，不靠超额罚钱。团队版才在第三方模型上再加每百万 token 0.25 美元。 所以它的利润主要来自两处：很多人用不完额度，以及自动路由比用户自己乱点旗舰模型更便宜。[^11_1][^11_2]

Poe 用 compute points。便宜模型一条消息可能只扣十几分，前沿模型扣几百到几千分，上下文变长，分数继续涨。19.99 美元的套餐大约给 66 万点，不是无限聊天。 模型越贵、对话越长，点就掉得越快。[^11_3]

OpenRouter 只在充值时收大约 5.5% 手续费，token 原价透传。那是开发者工具的薄利，不够支撑你的连接器、存储和授课界面。

你能从积分里赚到的，只有三笔：扣费高于上游成本、用户用不完月积分、系统用便宜模型完成却按标准动作扣费。三笔都要有，不能只靠最后一笔。

## 积分公式

不要让用户看见 token。内部按这个公式扣：

积分 = 向上取整(本次上游美元成本 ÷ 0.01 × 系数)

1 积分对应 1 美分上游成本。系数是你的毛利。

- 自动路由：1.8
- 用户指定标准模型：2.2
- 用户指定旗舰：3.0

一门课若上游花 1 美元，自动路由扣 180 积分，指定旗舰扣 300 积分。用户看到的不是这公式，而是生成前的估价：“这门课大约 25 到 40 积分”。估价按长度分档，不按“一门”打包。


| 动作 | 自动路由 | 指定标准模型 | 指定旗舰 |
| :-- | :-- | :-- | :-- |
| 10 分钟短课 | 8 | 15 | 40 |
| 1 小时标准课 | 25 | 50 | 120 |
| 长课，每多 1 万输出 token | 再加 6 | 再加 12 | 再加 30 |
| 改一节 | 2 | 4 | 10 |
| 带着课件提问一次 | 1 | 2 | 5 |

改课和提问比首次生成便宜，因为课件已经在缓存里。上游的缓存命中价通常只有原价的一小部分，你只把一部分让给用户，剩下的留在系数里。

## 路由规则

默认不许用户选厂商。系统按任务分三档：

- 测验、摘要、通知、改字：走 DeepSeek 便宜档，或 OpenAI 的轻量档。OpenAI 的 gpt-6-luna 大约是输入 0.10 美元、输出 0.50 美元每百万 token。[^11_4]
- 讲解和答疑：走 DeepSeek 高一档，或 Anthropic Sonnet、OpenAI 中档。Sonnet 这一档大约是输入 2 美元、输出 10 美元每百万 token。[^11_5]
- 只有用户点“深入讲解”或做项目设计，才走 Anthropic、OpenAI 的旗舰。旗舰输出可以到每百万 token 25 到 50 美元。[^11_5]

免费用户锁死在第一档。付费用户默认第二档，旗舰要手动打开，并按 3 倍系数扣。主模型失败时才降级，不在用户没同意时偷偷换成更差的模型。

## 套餐只差积分

| 档 | 月费 | 月积分 | 连接器 | 存储 | 模型 |
| :-- | :-- | :-- | :-- | :-- | :-- |
| 免费 | 0 | 40 | 无 | 200 MB | 只可用轻量，且只限 1 门短课 |
| 课程 | 24 美元 | 300 | 1 个 | 5 GB | 自动路由和标准模型 |
| 学期 | 39 美元 | 800 | 3 个 | 20 GB | 可开旗舰，按 3 倍扣 |
| 加油包 | 6 美元 | 60 | 不增加 | 不增加 | 沿用当前档 |

24 美元买 300 积分，每积分 0.08 美元。自动路由的目标成本是每积分不超过 0.025 美元。用户把 300 积分用完，模型成本约 7.5 美元，毛利仍在。若四成用户用不完，实际毛利更高。加油包是 60 积分 6 美元，单价 0.10 美元，比套餐略贵，但不再是“付钱才准开课”。

免费档的 40 积分大约够 1 门短课和几次修改，成本控制在 1 美元以内。它是获客成本，不是利润来源。

<span style="display:none">[^11_10][^11_11][^11_12][^11_13][^11_14][^11_15][^11_16][^11_17][^11_18][^11_19][^11_20][^11_21][^11_22][^11_23][^11_24][^11_25][^11_26][^11_27][^11_28][^11_29][^11_30][^11_6][^11_7][^11_8][^11_9]</span>

<div align="center">⁂</div>

[^11_1]: https://cursor.com/docs/models-and-pricing

[^11_2]: https://www.flexera.com/blog/ai/ai-consumption-tokens-credits-saas-pricing/

[^11_3]: https://go-cloud.io/cursor-pricing-2026/

[^11_4]: https://www.solvimon.com/glossary/ai-token-pricing

[^11_5]: https://credyt.ai/blog/ai-credit-system

[^11_6]: https://aidetectplus.com/blog/poe-com-review

[^11_7]: https://www.afternoon.co/blog/token-based-pricing-guide

[^11_8]: https://skywork.ai/skypage/en/Poe.com-In-Depth-2025-Review-My-Hands-On-Guide-to-the-All-in-One-AI-Platform/1974362346907955200

[^11_9]: https://www.reddit.com/r/PoeAI/comments/1sw2ajj/is_the_poe_subscription_flat_out_better_than/

[^11_10]: https://yourgpt.ai/blog/comparison/poe-ai

[^11_11]: https://vitara.ai/cursor-pricing-explained/

[^11_12]: https://www.g2.com/products/poe/reviews

[^11_13]: https://www.vantage.sh/blog/cursor-pricing-explained

[^11_14]: https://insighto.ai/blog/poe-ai-guide/

[^11_15]: https://www.jetadmin.io/blog/cursor-pricing-explained-plans-credit-system-and-real-costs-in-2026/

[^11_16]: https://www.voiceflow.com/blog/poe-ai

[^11_17]: https://www.reddit.com/r/PoeAI/comments/1gzxitk/thanks_for_the_service_poe_but_this_new_point/

[^11_18]: https://ofox.ai/blog/deepseek-api-pricing-guide-2026/

[^11_19]: https://benchlm.ai/anthropic/api-pricing

[^11_20]: https://intuitionlabs.ai/articles/claude-pricing-plans-api-costs

[^11_21]: https://carletontorpin.com/ai/poe-ai-compute-points-explained/

[^11_22]: https://www.swfte.com/api-pricing/deepseek

[^11_23]: https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration

[^11_24]: https://aisotools.com/deepseek-api-pricing

[^11_25]: https://www.reddit.com/r/ClaudeAI/comments/1vbvdzl/200_subscription_vs_7470_of_api_usage/

[^11_26]: https://www.usagepricing.com/blueprint/poe

[^11_27]: https://felloai.com/deepseek-pricing/

[^11_28]: https://costgoat.com/pricing/claude-api

[^11_29]: https://www.therundown.ai/tools/poe

[^11_30]: https://claude.com/pricing


---

# 做一份深度的研究报告，具体要求如下：

1. 资料参考：
查看已上传资料库中的信息，明确这份商业计划书的报告填表应该怎么撰写。
2. 核心内容：
研究我们这个知识 AI native 的教育平台应该怎样进行设计，具体包括：
(a) 运营
(b) 管理
(c) 努力
(d) 宣传
(e) 面向的客户对象
3. 产出目标：
对上述内容进行深度研究并产出一份报告，报告越 robust 越好。

已完成《知识型 AI-Native 教育平台商业计划深度研究报告》。报告围绕**运营、管理、执行投入、宣传推广、目标客户**展开，并加入产品架构、商业模式、18 个月路线图、财务框架、风险治理、核心指标及申请表逐栏写法；整体对齐数码港商业计划要求与 HKSTP 对团队、创新、研发及商业潜力的评审标准。[^12_1][^12_2]

需要注意：当前项目资料库中的 35 份可检索文件主要是计算机视觉、OpenCV 和 PyTorch 学习资料，未检索到“何为商业计划书”原文件。因此，报告结合此前已确认的课程要求、香港官方商业计划框架及最新教育 AI 研究撰写；正式填表前，仍应按实际申请表的栏位和字数限制作最后校准。

<span style="display:none">[^12_10][^12_100][^12_101][^12_102][^12_103][^12_104][^12_105][^12_106][^12_107][^12_108][^12_109][^12_11][^12_110][^12_111][^12_112][^12_113][^12_114][^12_115][^12_116][^12_117][^12_118][^12_119][^12_12][^12_120][^12_121][^12_122][^12_123][^12_124][^12_125][^12_126][^12_127][^12_128][^12_129][^12_13][^12_130][^12_131][^12_132][^12_133][^12_134][^12_135][^12_136][^12_137][^12_138][^12_139][^12_14][^12_140][^12_141][^12_142][^12_143][^12_144][^12_145][^12_146][^12_147][^12_148][^12_149][^12_15][^12_150][^12_151][^12_152][^12_153][^12_154][^12_155][^12_156][^12_157][^12_158][^12_159][^12_16][^12_160][^12_161][^12_162][^12_163][^12_164][^12_165][^12_166][^12_167][^12_168][^12_169][^12_17][^12_170][^12_171][^12_172][^12_173][^12_174][^12_175][^12_176][^12_177][^12_178][^12_179][^12_18][^12_180][^12_181][^12_182][^12_183][^12_184][^12_185][^12_186][^12_187][^12_188][^12_189][^12_19][^12_190][^12_191][^12_192][^12_193][^12_194][^12_195][^12_196][^12_197][^12_198][^12_199][^12_20][^12_200][^12_201][^12_202][^12_203][^12_204][^12_205][^12_206][^12_207][^12_208][^12_209][^12_21][^12_210][^12_211][^12_212][^12_22][^12_23][^12_24][^12_25][^12_26][^12_27][^12_28][^12_29][^12_3][^12_30][^12_31][^12_32][^12_33][^12_34][^12_35][^12_36][^12_37][^12_38][^12_39][^12_4][^12_40][^12_41][^12_42][^12_43][^12_44][^12_45][^12_46][^12_47][^12_48][^12_49][^12_5][^12_50][^12_51][^12_52][^12_53][^12_54][^12_55][^12_56][^12_57][^12_58][^12_59][^12_6][^12_60][^12_61][^12_62][^12_63][^12_64][^12_65][^12_66][^12_67][^12_68][^12_69][^12_7][^12_70][^12_71][^12_72][^12_73][^12_74][^12_75][^12_76][^12_77][^12_78][^12_79][^12_8][^12_80][^12_81][^12_82][^12_83][^12_84][^12_85][^12_86][^12_87][^12_88][^12_89][^12_9][^12_90][^12_91][^12_92][^12_93][^12_94][^12_95][^12_96][^12_97][^12_98][^12_99]</span>

<div align="center">⁂</div>

[^12_1]: https://www.hepi.ac.uk/reports/student-generative-ai-survey-2026/

[^12_2]: https://www.hkstp.org/en/programmes/ideation

[^12_3]: https://www.cyberport.hk/en/entrepreneurship/cyberport_incubation_programme_faq/

[^12_4]: https://www.perplexity.ai/search/8b682e70-88bf-4b9b-bab9-92a5ea30811a

[^12_5]: https://www.success.tid.gov.hk/tc_chi/bus_sta_up_inf_ser/bus_plan/bus_plan.html

[^12_6]: https://www.cyberport.hk/wp-content/uploads/Note_for_submitting_the_online_application_form_of_Cyberport_Incubation_Programme.pdf

[^12_7]: https://www.nature.com/articles/s44159-022-00089-1

[^12_8]: https://www.ipd.gov.hk/en/copyright/what-is-copyright/index.html

[^12_9]: https://developers.google.com/workspace/calendar/api/guides/overview

[^12_10]: https://developers.google.com/workspace/calendar

[^12_11]: https://developers.notion.com/reference/capabilities

[^12_12]: https://docs.github.com/en/apps/overview

[^12_13]: https://www.info.gov.hk/gia/general/202607/06/P2026070300679.htm

[^12_14]: https://www.studyfetch.com/

[^12_15]: https://app.mindgrasp.ai/pick-plan

[^12_16]: opencv/OpenCV 是什么.md

[^12_17]: pytorch/卷积神经网络/CNN 图像分类模型结构.md

[^12_18]: https://www.hyperknow.io/

[^12_19]: https://github.com/THU-MAIC/OpenMAIC

[^12_20]: https://investor.coursera.com/news/news-details/2026/Coursera-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results/default.aspx

[^12_21]: https://www.hyperknow.io/blogs/study-with-ai

[^12_22]: https://dev.to/aniruddhaadak/i-gave-an-ai-my-study-materials-and-it-planned-my-entire-learning-schedule-hyperknow-is-not-just-53g

[^12_23]: https://open.maic.chat/

[^12_24]: https://www.sec.gov/Archives/edgar/data/1651562/000165156226000015/cour-20251231.htm

[^12_25]: https://www.hyperknow.io/manifesto

[^12_26]: https://www.coddykit.com/pages/blog-detail?id=513049\&slug=openmaic-the-open-source-ai-classroom-with-30-000-github-stars-that-turns-any-to

[^12_27]: https://s27.q4cdn.com/928340662/files/doc_financials/2025/q2/COUR_Shareholder-Letter_Q2-2025.pdf

[^12_28]: https://www.linkedin.com/posts/hyper-know\_%F0%9D%90%93%F0%9D%90%A8%F0%9D%90%9D%F0%9D%90%9A%F0%9D%90%B2-%F0%9D%90%B0%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%A8%F0%9D%90%9F%F0%9D%90%9F%F0%9D%90%A2%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%9A%F0%9D%90%A5%F0%9D%90%A5%F0%9D%90%B2-activity-7393055584486363136-EZHV

[^12_29]: https://github.com/THU-MAIC

[^12_30]: https://sqmagazine.co.uk/coursera-statistics/

[^12_31]: https://www.hyperknow.io/terms-of-service

[^12_32]: https://landscape.jimmysong.io/projects/openmaic/

[^12_33]: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research

[^12_34]: https://blog.definedlearning.com/why-the-human-in-the-loop-model-is-key-to-ethical-ai-in-k-12-education/

[^12_35]: https://www.nature.com/articles/s41539-025-00320-7

[^12_36]: https://policycommons.net/artifacts/6942367/guidance-for-generative-ai-in-education-and-research/7852269/

[^12_37]: https://school-education.ec.europa.eu/en/discover/publications/guidance-generative-ai-education-and-research

[^12_38]: https://www.brookings.edu/articles/making-ai-work-for-schools/

[^12_39]: https://summit.sfu.ca/item/17246

[^12_40]: https://www.unesco.org/en/articles/what-you-need-know-about-ai-and-right-education

[^12_41]: https://ciddl.org/foundations-for-ai-and-the-future-of-teaching-and-learning-from-the-us-department-of-educational-technology/

[^12_42]: https://www.academia.edu/121191688/Intelligent_tutoring_systems_and_learning_outcomes_A_meta_analysis

[^12_43]: https://discovery.ucl.ac.uk/id/eprint/10176438/

[^12_44]: https://edustaff.org/blog/artificial-intelligence-and-the-future-of-teaching-and-learning/

[^12_45]: https://www.sciencedirect.com/org/science/article/pii/S1539310025000031

[^12_46]: https://www.scirp.org/reference/referencespapers?referenceid=3846909

[^12_47]: https://edtechhub.org/2025/10/03/teachers-shaping-the-role-of-ai-in-education/

[^12_48]: https://developerdocs.instructure.com/services/canvas

[^12_49]: https://learn.microsoft.com/en-us/graph/education-concept-overview

[^12_50]: https://developers.notion.com/guides/get-started/authorization

[^12_51]: https://lms.au.af.edu/doc/api/index.html

[^12_52]: https://canvas.donga.edu.vn/doc/api/oauth.html

[^12_53]: https://learn.microsoft.com/en-us/graph/connect-to-assignments-and-grades

[^12_54]: https://developers.notion.com/workers/guides/oauth

[^12_55]: https://apis.io/security/canvas-lms/canvas-lms-authentication/

[^12_56]: https://learn.microsoft.com/en-us/graph/api/resources/educationassignment?view=graph-rest-1.0

[^12_57]: https://developers.notion.com/guides/get-started/overview

[^12_58]: https://stackoverflow.com/questions/62092994/using-lti-which-uses-oauth2-how-to-initiate-a-query-to-canvas-lms-api

[^12_59]: https://learn.microsoft.com/en-us/answers/questions/2147489/i-want-to-make-my-tool-to-get-grade-back-etc-with

[^12_60]: https://developers.notion.com/reference/authentication

[^12_61]: https://github.com/instructure/canvas-lms/blob/master/app/controllers/developer_keys_controller.rb

[^12_62]: https://github.com/microsoftgraph/microsoft-graph-docs-contrib/blob/main/api-reference/beta/resources/education-overview.md

[^12_63]: https://developers.openai.com/api/docs/pricing

[^12_64]: https://kunavo.com/guides/claude-api-pricing-2026

[^12_65]: https://api-docs.deepseek.com/quick_start/pricing/

[^12_66]: https://www.morphllm.com/openai-api-pricing

[^12_67]: https://www.cloudzero.com/blog/openai-pricing/

[^12_68]: https://platform.claude.com/docs/en/about-claude/pricing

[^12_69]: https://www.reddit.com/r/DeepSeek/comments/1vn81do/deepseek_just_massively_increased_their_api/

[^12_70]: https://community.openai.com/t/can-batch-api-work-with-prompt-caching/1044983

[^12_71]: https://www.aipricing.guru/anthropic-pricing/

[^12_72]: https://www.morphllm.com/deepseek-api

[^12_73]: https://chatgpt.com/pricing/

[^12_74]: https://www.finout.io/blog/anthropic-api-pricing

[^12_75]: https://coworker.ai/blog/deepseek-api-pricing

[^12_76]: https://aicostbudget.com/en/blog/openai-api-pricing-change-2026

[^12_77]: https://developer.puter.com/tutorials/claude-api-pricing/

[^12_78]: https://www.reddit.com/r/PoeAI/comments/1dvc2yk/how_do_i_buy_more_compute_points/

[^12_79]: https://cursor.com/docs/models-and-pricing

[^12_80]: https://openrouter.ai/docs/guides/overview/auth/byok

[^12_81]: https://carletontorpin.com/ai/poe-ai-compute-points-explained/

[^12_82]: https://www.usagepricing.com/blueprint/poe

[^12_83]: https://cursor.com/help/models-and-usage/usage-limits

[^12_84]: https://openrouter.ai/pricing

[^12_85]: https://www.voiceflow.com/blog/poe-ai

[^12_86]: https://cursor.com/docs

[^12_87]: https://openrouter.ai/blog/announcements/1-million-free-byok-requests-per-month/

[^12_88]: https://omidsaffari.com/blog/poe-pricing

[^12_89]: https://flexprice.io/blog/cursor-pricing-guide

[^12_90]: https://openrouter.ai/docs/faq

[^12_91]: https://www.nxcode.io/resources/news/cursor-ai-pricing-plans-guide-2026

[^12_92]: https://ofox.ai/blog/openrouter-pricing-hidden-markup-breakdown-2026/

[^12_93]: https://studentprivacy.ed.gov/audience/education-technology-vendors

[^12_94]: https://gdpr-info.eu/art-5-gdpr/

[^12_95]: https://www.pcpd.org.hk/english/news_events/media_statements/press_20240611.html

[^12_96]: https://studentprivacy.ed.gov/sites/default/files/resource_document/file/Vendor%20FAQ.pdf

[^12_97]: https://www.nationgraph.com/glossary/ferpa

[^12_98]: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en

[^12_99]: https://www.pcpd.org.hk/english/resources_centre/publications/files/ai_protection_framework.pdf

[^12_100]: https://blog.promise.legal/startup-central/edtech-student-data-privacy-compliance/

[^12_101]: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/

[^12_102]: https://www.mayerbrown.com/en/insights/publications/2024/06/hong-kong-pcpd-issues-model-personal-data-protection-ai-framework

[^12_103]: https://blog.promise.legal/ferpa-edtech-vendors-compliance-gaps/

[^12_104]: http://www.dataprotection.ie/en/individuals/data-protection-basics/principles-data-protection

[^12_105]: https://www.twobirds.com/en/insights/2024/china/setting-the-scene-hong-kong-privacy-commissioner-publishes-first-comprehensive-ai-specific-guidance

[^12_106]: https://odedistrict.oregon.gov/DataPrivacySecurity/Documents/Vetting Apps - October 2022.pdf

[^12_107]: https://gdpr.eu/what-is-gdpr/

[^12_108]: https://tamtotarget.com/higher-education-procurement-intelligence/

[^12_109]: https://www.educause.edu/research-and-publications/research/analytics-services/surveys/2025/educause-student-survey

[^12_110]: https://www.digitaleducationcouncil.com/resource-library-items/beyond-the-pilot-a-higher-education-ai-roadmap-and-action-guide

[^12_111]: https://newmarketpitch.com/blogs/news/edtech-market-report

[^12_112]: https://thecroreport.com/blog/vp-sales-edtech/

[^12_113]: https://www.hepi.ac.uk/reports/student-generative-ai-survey-2025/

[^12_114]: https://www.bccresearch.com/pressroom/ait/ai-in-higher-education-reaches-inflection-point

[^12_115]: https://www.osercomm.com/edtech-sales-cycles-trade-publications-shorten-timelines/

[^12_116]: https://jeannebealaw.substack.com/p/the-educause-2025-students-and-technology

[^12_117]: https://lp.ellucian.com/rs/085-MHT-312/images/Ellucian_2026-AI-Report.pdf

[^12_118]: https://www.raysolute.com/edtech-b2b-sales-strategy-schools.html

[^12_119]: https://library.educause.edu/resources/2025/4/2025-educause-students-and-technology-report

[^12_120]: https://www.bccresearch.com/market-research/artificial-intelligence-technology/ai-in-higher-education-market.html

[^12_121]: https://digitalpromise.org/edtech-procurement-framework/tools-and-resources/

[^12_122]: https://www.hepi.ac.uk/wp-content/uploads/2025/02/HEPI-Kortext-Student-Generative-AI-Survey-2025.pdf

[^12_123]: https://alpha.school/the-program/

[^12_124]: https://www.astralcodexten.com/p/your-review-alpha-school

[^12_125]: https://www.khanmigo.ai/

[^12_126]: https://2hourlearning.com/

[^12_127]: https://www.reddit.com/r/edtech/comments/1nsd1ch/aifirst_schools_2hrs_of_academics_a_day/

[^12_128]: https://www.linkedin.com/posts/paulkirschner_alpha-school-may-be-efficient-but-is-it-activity-7484701396697661440-b5xC

[^12_129]: https://www.nber.org/papers/w35620

[^12_130]: https://michaelbhorn.substack.com/p/the-ai-behind-alpha-school

[^12_131]: https://www.scientificamerican.com/article/alpha-schools-ai-teaching-model-is-expanding-does-it-work/

[^12_132]: https://www.khanmigo.ai/pricing

[^12_133]: https://en.wikipedia.org/wiki/Alpha_School

[^12_134]: https://www.aifunlab.io/learn/is-alpha-school-legitimate-curriculum-reviews

[^12_135]: https://www.edusageai.com/blogs/how-much-does-khanmigo-cost-pricing-for-teachers-and-schools-in-2026

[^12_136]: https://www.forbes.com/sites/rayravaglia/2025/02/10/alpha-school-using-ai-to-unleash-students-and-transform-teaching/

[^12_137]: https://www.reddit.com/r/technology/comments/1r84pkg/students_are_being_treated_like_guinea_pigs/

[^12_138]: https://www.cyberport.hk/en/entrepreneurship/cyberport_incubation_programme/

[^12_139]: https://www.smelink.gov.hk/en/web/sme-portal/w/cyberport-incubation-programme.html

[^12_140]: https://www.smelink.gov.hk/en/web/sme-portal/w/hkstp-ideation.html

[^12_141]: https://www.businessgo.hsbc.com/zh-Hans/article/creating-business-plan-with-examples

[^12_142]: https://ec.hkust.edu.hk/hkustxhkstp-co-ideation-program

[^12_143]: https://sic.hkfyg.org.hk/wp-content/uploads/sites/82/2017/10/ApplicationBooklet.pdf

[^12_144]: https://www.fundfluent.io/funding-programs/hk-cyberport-incubation-programme-cip

[^12_145]: https://www.startmeup.hk/resources/ideation/

[^12_146]: https://www.youth.gov.hk/tc/startup/stories/e2ce9c80-4e4d-4d04-b5fd-98d6df615629

[^12_147]: https://sa.hkbu.edu.hk/content/dam/sa-assets/cc-assets/document/Att-CIP CCMF programme leaflet.pdf

[^12_148]: https://www.hkstp.org/en/programmes

[^12_149]: https://one.google.com/intl/en_hk/about/google-ai-plans/

[^12_150]: https://play.google.com/store/apps/details?id=com.studyfetch.mobile.v2

[^12_151]: https://apps.apple.com/us/app/studyfetch-ai-tutor/id6663574866

[^12_152]: https://whisprinote.com/blog/mindgrasp-ai-review-everything-you-need-to-know-in-2025

[^12_153]: https://notebooklm.google/plans

[^12_154]: https://www.studyfetch.com/questions/uncategorized/how-much-does-it-cost-to-produce-an-additional-unit

[^12_155]: https://www.mindgrasp.ai/

[^12_156]: https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/

[^12_157]: https://dupple.com/reviews/study-fetch

[^12_158]: https://www.reddit.com/r/studytips/comments/1jguu3y/which_tool_is_better_studyfecth_or_mindgrasp/

[^12_159]: https://www.elite.cloud/post/notebooklm-pricing-2025-free-plan-vs-paid-plan-which-one-actually-saves-you-time/

[^12_160]: https://skywork.ai/skypage/en/Study-Fetch-AI-Review-(2025)-My-Hands-On-Test-of-the-Ultimate-AI-Study-Buddy/1974516892577755136

[^12_161]: https://www.fahimai.com/mindgrasp-ai

[^12_162]: https://www.unesco.org/en/articles/ai-competency-framework-students

[^12_163]: https://advance-he.org/knowledge-hub/higher-education-policy-institute-hepi-student-generative-ai/

[^12_164]: https://aiinhe.org/results/

[^12_165]: https://www.unesco.org/en/articles/ai-competency-framework-teachers

[^12_166]: https://evidencebased.education/resource/retrieval-and-spaced-practice-study-strategies-that-must-be-combined/

[^12_167]: https://genain3.ie/student-generative-ai-survey-2026/

[^12_168]: https://www.cedefop.europa.eu/en/tools/vet-toolkit-tackling-early-leaving/resources/unesco-ai-competency-framework-teachers

[^12_169]: https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication

[^12_170]: https://www.linkedin.com/posts/kortext_hepi-aiineducation-highereducation-activity-7438154406883262465-kOoh

[^12_171]: https://en.ichei.org/en/news/information/924.html

[^12_172]: https://www.teachertoolkit.co.uk/wp-content/uploads/2022/10/s44159-022-00089-1.pdf

[^12_173]: https://crl.acrl.org/index.php/crl/article/view/27271/35064

[^12_174]: https://cit.bnu.edu.cn/docs/2024-09/352fd46ca7d04bbc9b6052023f287556.pdf

[^12_175]: https://investors.duolingo.com/static-files/961ce633-3cee-49d0-bd7a-2c63731d45fb

[^12_176]: https://www.marketsandmarkets.com/Market-Reports/ai-in-education-market-200371366.html

[^12_177]: https://www.coursera.org/explore/learner-outcomes

[^12_178]: https://sqmagazine.co.uk/duolingo-statistics/

[^12_179]: https://www.precedenceresearch.com/ai-in-education-market

[^12_180]: https://investors.duolingo.com/static-files/c9bf5861-b19d-4396-b060-c0dbeefd34f5

[^12_181]: https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-education-market-report

[^12_182]: https://www.sec.gov/Archives/edgar/data/1562088/000162828026012246/q4fy25duolingo12-31x25shar.htm

[^12_183]: https://www.mordorintelligence.com/industry-reports/ai-in-education-market

[^12_184]: https://www.annualreports.com/Company/coursera-inc

[^12_185]: https://www.sec.gov/Archives/edgar/data/1562088/000162828026029790/q1fy26duolingo3-31x26share.htm

[^12_186]: https://www.pcpd.org.hk/english/artificial_intelligence/index.html

[^12_187]: https://www.fsdc.org.hk/en/hyperlink-policy/

[^12_188]: https://www.consumer.org.hk/en/press-release/p-585-telecommunications-services-complaints

[^12_189]: https://www.kingandwood.com/hk/en/insights/latest-thinking/privacy-commissioner-issues-deepfake-toolkit-for-schools-and-parents--what-hong-kong-education-providers-need-to-know.html

[^12_190]: https://www.judiciary.hk/en/other_information/disclaimer.html

[^12_191]: https://harperjames.co.uk/article/customer-auto-renewal-provisions/

[^12_192]: https://www.pcpd.org.hk/spec_event/spec_event104.php

[^12_193]: https://www.ofca.gov.hk/en/consumer_focus/guide/help_for_consumers/services_contracts/fixed_service/index.html

[^12_194]: https://www.linkedin.com/posts/hong-kong-productivity-council_digitalpolicyoffice-ai-technicaladvice-activity-7480204578010095616-DIjR

[^12_195]: https://www.gov.hk/en/about/copyright.htm

[^12_196]: https://hkgoodlawyer.com/guides/en/telecom-contract-auto-renewal-hong-kong

[^12_197]: https://www.thestandard.com.hk/news/article/319538/Privacy-watchdog-urges-caution-in-sharing-childrens-photos-amid-rising-deepfake-concerns

[^12_198]: https://www.lib.cuhk.edu.hk/en/research/copyright/basics/

[^12_199]: https://docs.github.com/en/rest/apps

[^12_200]: https://www.notion.com/connections

[^12_201]: https://www.notion.com/help/create-integrations-with-the-notion-api

[^12_202]: https://docs.github.com/en/apps

[^12_203]: https://console.cloud.google.com/marketplace/product/google/calendar-json.googleapis.com

[^12_204]: https://apix-drive.com/en/blog/other/notion-api-integration

[^12_205]: https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps

[^12_206]: https://www.unipile.com/guide-to-google-calendar-api-integration/

[^12_207]: https://www.notion.vip/insights/notion-explained-the-api-debut

[^12_208]: https://docs.github.com/en/rest

[^12_209]: https://www.perplexity.ai/search/54bbc485-7e3e-4e6b-a614-ea688cf4b510

[^12_210]: https://www.perplexity.ai/search/6bf60b67-e16a-41e6-9867-a3dc8a8619c4

[^12_211]: https://www.perplexity.ai/search/932a4537-56ec-43de-8d41-d90071c4b501

[^12_212]: https://www.perplexity.ai/search/dd40b7bf-8083-48f9-8009-0e2ebb1740d4

