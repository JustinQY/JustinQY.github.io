# Projects 作品集维护指南

作品集继续使用现有 Astro 内容集合，无需数据库或 CMS。页面为英文，保持站点现有语言和视觉风格。

后续案例统一参考 [作品集文章结构与表达指南](portfolio-case-study-guide.md)。该指南总结 Curam → FHIR 案例的结构、表达、评估证据与视觉设计，并说明如何适配 iOS 等项目。

## 文件与页面

- `src/pages/projects/index.astro`：作品集入口，按经历分组。
- `src/data/portfolio.ts`：分组介绍和预留卡片数量；政府项目暂留 3 个，iOS 暂留 2 个，可随时调整。
- `src/components/projects/ProjectCard.astro`：独立项目卡片。
- `src/components/projects/ProjectOverview.astro`：详情页的职责、机构、时间、成果和外部链接。
- `src/content/projects/`：每个项目一个 Markdown / MDX 文件，文件名决定 `/projects/文件名/` 路径。

## 逐个完成项目

1. 从 `government-project-01.md` 或 `ios-project-01.md` 草稿开始；也可以复制后使用新的文件名。
2. 先收集项目背景、个人职责、技术栈、关键难点、实际结果及可展示材料。
3. 把标题和描述改成项目的真实名称与一句话摘要；补充适用的元数据和正文。
4. 检查后把 `draft` 改成 `false`，项目会自动出现在相应分组并生成详情页。草稿不生成页面，也不会参与站内搜索。
5. 正式项目会自动替换一个预留卡片；超过预留数量也会全部展示，不需要改页面代码。

预留卡片只是页面框架，不是已完成项目，不可点击且不进入站内搜索。QA 定位的旧占位文件保留为草稿；原有 RAG / LangChain 页面保留在 Explorations & Notes 中。

需要先审核的项目可以保持 `draft: true` 并设置 `reviewReady: true`。只有本地开发模式会展示这类卡片和详情页，生产构建、搜索和 sitemap 仍然排除。审核完成后改为 `draft: false`；其余普通草稿继续隐藏。

已完成的 case-study 卡片隐藏顶部编号和状态行；未完成的预留卡片保留 Coming soon。技术 notes 继续显示 Project notes。Curam → FHIR 案例已按用户确认标记为完成，使用 `draft: false`、`reviewReady: false`。

## 项目元数据示例

以下是字段格式示例，其中括号内容都需要替换为真实信息。

```yaml
title: '[项目名称]'
description: '[解决的问题与方案的一句话摘要]'
date: '2026-10-05' # 文章创建日期；实际项目时间写在 period 中
draft: true
track: government # government / ios / side-project
order: 1 # 分组内数字越小越靠前；相同数字按文章日期倒序
format: case-study # case-study / notes
organization: '[机构或公司，可省略]'
role: '[实际职位或职责，可省略]'
period: '[实际项目时间，可省略]'
outcome: '[一项有依据的成果，可省略]'
tags: ['[技术栈]']
links:
  - label: '[Repository / Demo / 相关材料]'
    href: 'https://example.com'
showHeroImage: false
comments: false
sidebar:
  enable: true
  toc: true
  relatedPosts: false
```

`organization`、`role`、`period`、`outcome`、`links` 均可省略，没有链接的工作项目同样可以正常展示。不确定的信息先留空，不把计划或团队整体成果写成个人已完成成果。

## 内容组织

卡片展示标题、摘要、技术栈，以及有内容时的职责、时间和核心成果。详情页按写作指南展开业务任务、痛点、个人贡献、流程、核心设计、评估、结果和反思。两个草稿可作为元数据起点，正式正文以新指南为准；不适用的小节可以调整。

政府项目可以使用业务中性名称与脱敏架构图；无需公开内部数据或源码。职位名称先以真实记录为准，数据工程作为项目方向展示。

## 本地查看

运行 `bun run dev`，打开 `/projects/`。发布前运行 `bun run build`，确认页面和站内搜索正常生成。
