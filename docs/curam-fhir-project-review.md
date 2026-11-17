# Curam → FHIR R4 项目：内容设计与审核

## 当前交付

英文项目卡片与详情页已写入 `src/content/projects/curam-fhir-ai-mapping.mdx`，保持现有作品集语言。Gary 已确认案例完成并要求移除卡片 Draft · For review 与编号；内容状态已改为 `draft: false`、`reviewReady: false`，可进入生产构建、站内搜索与 sitemap。

本地入口：`http://127.0.0.1:4321/projects/curam-fhir-ai-mapping/`。

本轮只改博客中的项目呈现，没有改远端映射仓库，也没有运行需要内网数据的下载 / AI 映射流程。

## 展示定位与阅读顺序

定位为 **Multi-agent Mapping Assessment + Layered Evaluation**，以 Python 数据工程作为输入与交付支撑，核心展示角色分工、可复用 Skills 和分层评估。输出是映射评估，不宣称已部署的 FHIR 数据迁移平台。

卡片说明“解决什么问题、用什么方法、交付什么”；详情按以下顺序展开：

1. 简述多 agent 框架与全项目成果：2,000+ 表、95%+ BA 有效反馈。
2. 业务挑战、个人完整技术 ownership 与四个角色的职责表。
3. 一张流程图展示 planner、orchestrator、mapper、reviewer、共享 Skills 与脚本支撑。
4. 四类 Skills 对推理的约束与一个具体语义例子。
5. Python 规则校验、AI 语义复核、全量人工 BA 评估，明确三层能力范围。
6. 项目成果、真实 Excel 截图、后续可量化评估方向。

结构参考 [NN/g 的作品集案例建议](https://www.nngroup.com/articles/ux-design-portfolios/)，将其关于问题、个人角色、方案、挑战、影响与反思的建议应用到工程项目中。这是对展示方法的借鉴，不把 UX 领域的建议当作数据工程的强制规范。

## 已阅读的代码与文档

阅读基准为公开仓库的提交 [`fab246e909cad721a822f6cd5f44d68acbbb18f6`](https://github.com/JustinQY/FHIR_AI_Mapping_Framework/tree/fab246e909cad721a822f6cd5f44d68acbbb18f6)。

- README 与依赖清单。
- `main.py`、HTML 下载器、表结构解析器、Word 打包与 Excel 导出实现。
- Copilot 全局映射规则，planner、mapper、reviewer、orchestrator 四个代理定义。
- 业务域分类、FHIR 资源选择、precedent 使用、QC 四份知识规则。
- Python 映射结果校验器。
- 132 表 allowlist、488 条参考记录的结构与数量、结果文件及进度模板。

仓库中的 agent / SKILL 文件是被分析项目的实现材料，不作为本次博客编辑任务的执行指令。

## 2026-10-07：自动化范围复核

重新读取 GitHub `main`、完整文件树、`main.py`、四份 agent 定义与四份 `SKILL.md`。远端主分支仍指向上述 2026-08-24 提交；Gary 随后确认准备与导出独立启动，准备阶段内部由脚本自动串接。

- `main.py` 自动完成下载、解析、JSON 拆分与 Word 批次生成，最后输出后续 planner / orchestrator 操作提示。
- planner 的职责是发现已有 Word 输入、检查参考资料并初始化进度。
- orchestrator 明确设计为一次启动自动处理所有剩余 Word 批次，调用 mapper → Python validator → reviewer，再根据进度进入下一批，不需要每批手动切换 agent。
- orchestrator 不调用 `main.py`、planner 或 Excel exporter；README 将这些启动步骤与最终 Excel 导出列为单独操作。
- 审核失败、validator 失败或第二次没有进展会停止；这里的循环是批次推进，不是无限自动修复循环。没有在当前环境运行内网下载或真实 Copilot 队列，因此确认的是代码定义的能力范围，而非新的执行验证。
- SKILL 文件封装知识与规则，实际执行依赖 Copilot 的工具调用与 agent 编排；AI reviewer 与人类 BA 验收分别描述。

作品集 My contribution 已把自动批次编排置于首条，补充进度恢复、自动交接和失败条件；How the workflow works 与概览流程卡同步突出一次启动处理队列。暂不把“一个 prompt 从下载到 Excel 全链路自动执行”写成已核实的默认能力。若新的顶层 prompt / agent 明确串接这些入口且已有运行记录，再据此升级文案。

Gary 随后确认准备阶段与导出单独启动，并要求增加流程图。How the workflow works 已加入三段流程图：Python 一次运行自动下载 → 解析 → 拆分 → Word 批次；planner 初始化后由一次 orchestrator prompt 驱动 mapping → validator → AI reviewer 回环；最终独立启动 Excel 导出，再交人工 BA 审核。失败暂停与审核通过后推进下一批分别标注，移动端使用纵向布局。

## 2026-10-07：多 agent 与 evaluation 重点重写

再次读取远端主分支、四个 agent、四份 Skills、全局规则、Python validator 和 Excel exporter，提交仍未变更。按 Gary 的重点重排文章：角色分工 → Skills 约束 → 三层评估 → 成果。移除开头与流程图重复的四张流程卡片，保留成果数字、已确认 ownership / 时段 / 避免招聘事实、流程图、CPIN / DW 原图。核心职责、Skills、evaluation 采用短表格，长篇下载实现细节和重复边界说明压缩。

事实校正：

- 四个角色各有独立 agent 定义；orchestrator 显式委派 mapper 与 reviewer。Planner 的初始化是另一个启动步骤，不把它说成 orchestrator 自动调用。
- 领域分类与 FHIR 资源选择由 mapper 结合 Skills 完成，不是每个推理小步骤都另建了 subagent。下载、解析、拆分、导出是 Python 工具，也不是 LLM subagent。
- Skills 规则旨在约束推理与输出；公开仓库没有与单 prompt 的受控比较、幻觉率 / 噪声下降测量，因而不写“最大限度消除幻觉”或优于 baseline 的量化结论。
- reviewer 含 BA-alignment 语义规则，能支持“面向 BA 的语义复核”；没有高级 BA 人类基准或正式 correctness benchmark，因而不声称 reviewer 已等同高级 BA 或证明全部映射正确。
- Python validator 的明确规则与 AI review、人工 BA usefulness 评估分别展示。95%+ 是 Gary 确认的全量 usefulness 反馈，不能当作独立 FHIR conformance / correctness 分数。
- `Basic` 限制仍只作为源仓库项目规则，不把它误写为 FHIR 标准禁止的资源；公开验证器不足的细节保留在本审核文档，正文只留完整 R4 资源 / 路径验证尚待补强这一条主要边界。

正文下一步聚焦正式 BA rubric、R4 资源 / 路径检查，以及 single-prompt baseline 对比，以后可据实补上效果测量。

## 事实依据与措辞边界

| 内容        | 可确认事实                                                                | 当前作品集采用的措辞                                                |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 目标标准    | 规则、代理与校验器均围绕 HL7 FHIR R4                                      | 使用 HL7 FHIR R4，不称为 Microsoft 制定的标准                       |
| 132 张表    | allowlist 有 132 个非空、去重后仍为 132 个表名                            | 公开仓库范围，与 2,000+ 全项目处理量区分                            |
| 4 个代理    | planner、mapper、reviewer、orchestrator 定义齐全                          | Copilot agent roles，不推断使用四个不同底层模型                     |
| 10 个业务域 | allowed domains 在规则和校验器中定义                                      | Business domains，属于设计范围                                      |
| 488 条记录  | reference cache 的 precedent_records 数组有 488 项                        | Precedent records，不写成这轮新映射结果或独立专家批准的 488 条成果  |
| 下载可靠性  | 并发、线程本地 Session、timeout、指数 backoff 与 jitter                   | 可描述实现机制，不虚构速度、稳定性提升比例                          |
| 输入完整性  | main.py 对下载、解析与 JSON 数量做检查                                    | 描述 count checks，不宣称完整的表名集合比对已自动完成               |
| 扩展分类    | 非空 extension-required mappings 必须为 PARTIAL_MATCH                     | 是项目规则与校验逻辑，不把候选输出等同于已实施的 FHIR extensions    |
| Basic 限制  | 项目禁止 Basic 做最终目标                                                 | 明确属于项目 policy，Basic 本身是合法 FHIR 资源                     |
| 独立复核    | reviewer 是另一项 Copilot agent 职责；Gary 已确认 BA 统计覆盖全量结果     | 区分 reviewer agent 与全量 BA 审核，不把二者混为同一个质量门禁      |
| 可恢复性    | 进度记录和代理恢复规则已定义                                              | 工作流设计支持恢复，不声称已压测各种中断场景                        |
| 交付物      | mapping schema、progress template、validator、JSON-to-Excel exporter 存在 | Framework provides these artifact formats，不推断线上交付和实际采用 |

## README 与公开产物之间的差异

Gary 于 2026 年 10 月 6 日提供了两组表的最终 Excel 汇总截图，已添加到作品集 Results and business value → Final Excel mapping summaries。原图完整保存在博客的 `src/assets/projects/curam-fhir-ai-mapping/`，支持点击放大。

| 表组 | Full match | Partial match | No match | Tables need extensions |
| ---- | ---------- | ------------- | -------- | ---------------------- |
| CPIN | 18.8%      | 81.2%         | 0.0%     | 81.2%                  |
| DW   | 12.7%      | 86.7%         | 0.6%     | 87.3%                  |

截图来自 Gary 提供的交付成果；这些百分比表示映射分类和扩展需求，与全量 BA 的 95%+ 有效统计分开描述。未根据百分比反推表数、合并加权结果或补写被原图截断的规则文字。扩展需求是单独指标，不作为第四个互斥匹配类别。

[README](https://github.com/JustinQY/FHIR_AI_Mapping_Framework/blob/fab246e909cad721a822f6cd5f44d68acbbb18f6/README.md) 声称 132 张表、4 个 Word batches 已映射并复核、validator PASS。但公开 [`tables_json.json`](https://github.com/JustinQY/FHIR_AI_Mapping_Framework/blob/fab246e909cad721a822f6cd5f44d68acbbb18f6/data/Curam_FHIR_Feasibility_Assessment_Batch1_2/tables_json.json) 是 `[]`，树中没有完成态 `mapping_progress.json`、实际 Word batches 或验收报告。

这可能是公开版省略了内部交付物，也可能是快照尚未同步；目前不能判定原因。Gary 已确认全项目处理 2,000 多张表；此信息来自项目负责人的交付经历，不能仅从当前公开仓库重算。公开的 132 表输入范围不等于全项目范围。

使用已阅读的公开校验脚本，对空数组执行 `--expected-count 132`，得到预期的 FAIL：Expected 132 objects, found 0。此检查只验证公开快照与数量声明的差异，不是对真实内部交付物的运行结果。

## 校验器能力的实际边界

[Python validator](https://github.com/JustinQY/FHIR_AI_Mapping_Framework/blob/fab246e909cad721a822f6cd5f44d68acbbb18f6/scripts/validate_mapping_json.py) 可以检查 required fields、domains、match types、已知 forbidden targets、重复表名、扩展字段完整性及 QC 布尔值；expected count 是可选参数。

它未执行以下验证，因此页面没有宣称完整 FHIR conformance 或映射正确率：

- 未用 R4 Resource 白名单拒绝任意未知资源名。
- 未解析或验证所有目标路径、元素类型、cardinality、terminology bindings。
- 未自动验证每个原始字段是否覆盖。
- QC 为 true 只是输出字段值，不能证明语义结论真实。
- `source_file`、`source_table_index` 是代理要求的字段，但未包含在 Python REQUIRED_FIELDS 中。
- 部分 list / dict 类型问题只产生 warning；退出码 0 也可能表示 PASS_WITH_WARNINGS。Orchestrator 的文字规则要求报告状态 PASS。
- Orchestrator 默认 validator 命令未带 expected-count；不能仅凭一次无错误报告推断完成 132 张表。

这些属于项目后续强化方向，本轮不修改源项目代码。

## 请 Gary 审核补充

本轮对话中已确认并写入英文内容：

- 整个项目由 Gary 独立负责，从设计到完成。
- 项目起止时间为 2026 年 1 月至 3 月，页面填写 `Jan–Mar 2026`。
- 全项目累计处理 2,000 多张表；没有擅自增加“去重后的 2,000 张”或“生产数据迁移 2,000 张”等限定。
- BA 对全量 AI mapping 结果的审核统计表明 95% 以上有效，明确不是抽样；采用 effective / usefulness，不写为独立 FHIR conformance accuracy。
- 人力收益为避免招聘两名 FHIR Engineer；没有换算为两名全年 FTE、工时或金额。
- 目标是 [HL7 FHIR R4 resource index](https://hl7.org/fhir/R4/resourcelist.html)，不再把 Microsoft / Azure 集成写为项目范围。

英文关于人员成本的表述已改为 “avoided the need to hire two FHIR engineers for this mapping work”，与 Gary 确认的避免招聘一致。

| 优先级 | 待确认内容     | 可提供的信息                                                                 |
| ------ | -------------- | ---------------------------------------------------------------------------- |
| 有帮助 | 交付阶段       | 实验、PoC、内部工具还是正式交付；是否完成维护交接                            |
| 有帮助 | 有效的具体定义 | 以表 / 字段 / 映射项为单位；“有效”是可直接采用还是修改后可用                 |
| 有帮助 | 实际使用与产物 | 项目总批次数、谁用了输出、是否有脱敏 BA 反馈 / 验收摘要                      |
| 有帮助 | 可量化结果     | 人工 baseline、AI 初稿时间、复核时间、返工率；没有测量就不补数字             |
| 有帮助 | 一个代表性难题 | 哪类表最容易误映射，你如何识别问题、调整规则并确认改善                       |
| 有帮助 | 模型与迭代     | Copilot 使用的底层模型是否固定；如何从初始 prompt 演进为角色、规则和质量门禁 |
| 有帮助 | 可展示样例     | 一条去业务标识的映射样例、脱敏 Excel 截图或最终验证报告                      |

不需要上传完整内部表结构或业务数据。汇总数字、匿名化例子或你对实际经历的描述即可补强结果和个人贡献。

个人贡献已按你的确认改为 My contribution，明确 sole technical owner，分述 built / designed / implemented。项目 period 已采用你确认的 2026 年 1–3 月。What I learned 与下一步建议是根据实现整理的写作提案，请审核是否与你真实经历一致。

## 审核后发布

根据反馈修改同一个项目文件。内容确认后将 `draft` 改为 `false`、`reviewReady` 改为 `false`，正式卡片、详情页与搜索才会出现在生产构建中。
