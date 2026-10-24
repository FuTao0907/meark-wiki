# 架构决策记录

> meark-wiki · wiki.meark.cn · 个人知识库

本文记录项目的核心架构决策与理由，帮助你在任何一台电脑上继续开发时快速恢复上下文。

## 1. 技术栈

| 层 | 选型 | 理由 |
| --- | --- | --- |
| 框架 | Astro 5（SSG） | 静态输出，天然适配 GitHub Pages；内容即 Markdown，迁移零成本 |
| 内容管理 | Content Collections + Markdown | 文章以 `.md` 文件存放，纯文本可移植；schema 校验 frontmatter |
| 部署 | GitHub Pages + GitHub Actions | push 到 `main` 自动构建发布，无需服务器 |
| 依赖管理 | Yarn 1.22（`packageManager` 已标注） | 用户约定 |
| 设计体系 | design-taste（taste-skill v2）定制 | 反 AI 感、物件化设计（暗色书房 + 纸页） |

## 2. 为什么是 Astro 5 而不是 7

创建时云电脑 Node 版本为 22.23.2，Astro 7 要求 Node ≥ 22.23.4。Astro 5 支持 Node ≥ 22.0.0，且本站所需能力（Content Collections、动态路由、SSG）两者完全一致，故选用 Astro 5。若后续升级 Node，可平滑升级 Astro。

## 3. 内容架构

```
src/content/knowledge/<分类>/<文章名>.md
```

- **分类即目录名**：`hr`（人事行政）/ `frontend`（前端技术）/ `ai-tools`（AI 与工具）/ `general`（通用知识）
- 新增分类 = 新建目录 + 在 `src/lib/knowledge.ts` 的 `CATEGORIES` 登记
- 每篇 frontmatter（由 `src/content.config.ts` 校验）：

```yaml
---
title: 文章标题          # 必填
description: 一句话摘要   # 可选，列表页展示
pubDate: 2026-10-20     # 必填，发布日期
updatedDate: 2026-10-22 # 可选，更新日期
tags: [标签1, 标签2]     # 可选
---
```

## 4. 路由结构

| 路径 | 文件 | 说明 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 首页：hero 卡片 + 统计 + 分类 + 最近更新 |
| `/knowledge/` | `src/pages/knowledge/index.astro` | 全部文章，按分类分组 |
| `/knowledge/<分类>/` | `src/pages/knowledge/[category]/index.astro` | 分类页 |
| `/knowledge/<分类>/<文章>/` | `src/pages/knowledge/[category]/[slug].astro` | 文章详情（纸页排版） |

## 5. 设计系统（Walnut and tan）

方向来源：design-taste `page-is-the-object`（seed 420898044）。视觉隐喻：**知识库 = 暗色书房里的一张纸页**。

### 设计令牌（`src/layouts/Base.astro`）

```css
--bg: #2b2216;          /* 深核桃木（页面底色） */
--surface: #382d1e;     /* 次级表面 */
--ink: #e4e2da;         /* 骨白正文 */
--muted: #a39a8b;       /* 弱化文字 */
--accent: #bda38b;      /* tan 强调 */
--field: #cbb293;       /* 纸页色（卡片/列表底） */
--field-ink: #1c150d;   /* 纸页上的墨色 */
--field-muted: #45382a; /* 纸页上的弱化墨色 */
```

### 字体

- 标题/导航：系统黑体（`ui-sans-serif`，weight 800）——替代原方案的 Bebas Neue（不支持中文）
- 正文：衬线栈（Georgia / Noto Serif SC / 宋体）——替代 EB Garamond 的中文书卷感
- 规则：全站直角（`--radius: 0`），无渐变、无阴影、无玻璃、无 1px 发丝线

### 关键交互

- hero 卡片滚动后收缩为左下角"票根"（点击回到顶部）
- 区块进入视口时渐入（IntersectionObserver）
- hero 背景图缓慢缩放（Ken Burns）
- 所有动画均带 `prefers-reduced-motion` 降级

## 6. 图片素材

`public/images/` 下 5 张 AI 生成的"书房/纸页"氛围图（统一暗调暖光）：
hero-bookshelf（hero 背景）、paper-desk、index-cards、library-aisle、desk-writing。
后续可在 `brief.md`（`.creative-design/wiki-assets/`）基础上重新生成或替换，保持同一光线与色调。

## 7. 已知决策与待办

- 文章内容目前为示例（M4），发布前替换为真实知识
- GitHub Pages 需要在仓库 Settings 启用（Source: GitHub Actions），见 `deployment.md`
- Decap CMS 留待 v1.1 接入（详见 `development.md`）
