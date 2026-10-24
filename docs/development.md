# 开发手册

> 给任何接手这台机器（或 clone 到本地）的人：如何在 meark-wiki 上继续开发。

## 0. 环境要求

- Node.js ≥ 22.0.0（当前开发机为 v22.23.2）
- Yarn 1.x（`package.json` 已声明 `"packageManager": "yarn@1.22.22"`）
- Git

## 1. 常用命令

```bash
yarn install        # 安装依赖（如提示 lockfile 变更，正常提交 yarn.lock）
yarn dev            # 本地开发，默认 http://localhost:4321
yarn build          # 构建静态产物到 dist/
yarn preview        # 本地预览构建产物
```

> 云电脑上跑 `yarn dev` 时建议后台运行：`yarn dev --background`（见项目 AGENTS.md）。

## 2. 项目结构

```
meark-wiki/
├── src/
│   ├── content.config.ts      # Content Collections schema（frontmatter 校验）
│   ├── lib/knowledge.ts       # 分类登记 CATEGORIES + 工具函数
│   ├── layouts/Base.astro     # 全局布局：设计令牌、导航、footer
│   └── pages/
│       ├── index.astro                    # 首页
│       └── knowledge/                     # 知识库路由
│           ├── index.astro                # /knowledge/ 全部文章
│           ├── [category]/index.astro     # 分类页
│           └── [category]/[slug].astro    # 文章页
├── src/content/knowledge/     # 文章本体（Markdown，按分类分目录）
├── public/
│   ├── images/                # 氛围图（hero-bookshelf 等 5 张）
│   ├── CNAME                  # wiki.meark.cn（Pages 自定义域名）
│   └── favicon.svg
├── .github/workflows/deploy.yml   # Pages 自动部署
├── docs/                          # 本文档
└── package.json
```

## 3. 日常操作

### 3.1 写一篇新文章

1. 在 `src/content/knowledge/<分类>/` 下新建 `xxx.md`
2. 填 frontmatter（title / description / pubDate 必填，tags 可选）
3. 正文用 Markdown（标题、列表、代码块、引用均可）
4. `yarn dev` 本地预览 → push 后自动发布

示例：

```markdown
---
title: 如何做好一场面试开场自我介绍
description: 30 秒自我介绍的框架与注意事项
pubDate: 2026-10-24
tags: [面试, 自我介绍]
---

## 结构

三句话：我是谁 → 我能提供什么 → 为什么想来这里。
```

### 3.2 新增一个分类

1. 在 `src/content/knowledge/` 下新建目录，如 `reading/`
2. 在 `src/lib/knowledge.ts` 的 `CATEGORIES` 数组追加：

```ts
{ key: 'reading', name: '读书笔记', description: '读完的书与笔记' },
```

分类页、总览页、首页会自动出现新分类。

### 3.3 替换首页氛围图

- 图片放在 `public/images/`，然后改 `src/pages/index.astro` 中对应的 `<img>` 引用
- 建议沿用"暗调暖光书房"统一风格（参考 `.creative-design/wiki-assets/brief.md`）
- 上传前压缩：`convert in.jpg -resize '1920x1080>' -quality 82 -strip out.jpg`

## 4. UI 修改守则（design-taste）

项目 UI 遵循 design-taste v2 的规则，改样式前请通读
`.user_skills/design-taste-frontend/SKILL.md` 与 `references/`，重点红线：

- **禁用**：渐变、阴影、玻璃拟态、胶囊按钮、1px 发丝线、小写英文标签、索引数字装饰
- **字体**：标题用系统黑体 800，正文用衬线栈；不要引入外联字体
- **容器**：优先开放排版；需要容器时用纸面（`--field`）直角块，同页一个主家族
- **动效**：transform/opacity 实现，配 `prefers-reduced-motion` 降级
- **配色**：只用 `Base.astro` 中的设计令牌，不写散落的裸色值

### 检查门禁（改动后必跑）

```bash
# lint（仓库根）
node ~/.doubao/agent_mode/workspace/.user_skills/design-taste-frontend/scripts/lint.mjs src/pages src/layouts

# inspect（在 dist 内运行，注意：必须在 dist 目录内，否则图片绝对路径 404）
yarn build && cd dist && node ~/.doubao/agent_mode/workspace/.user_skills/design-taste-frontend/scripts/inspect.mjs index.html
```

验收标准：lint 0 FAIL；inspect 0 FAIL，WARN 每条可辩护。

## 5. 代码提交与发布

```bash
git add -A && git commit -m "描述"
# 云电脑没有 git push 凭据，用 GitHub MCP push_files 推送（或在本机 clone 后直接 push）
```

推送到 `main` 后，GitHub Actions 自动构建并部署到 https://wiki.meark.cn

## 6. v1.1 规划（Decap CMS）

纯 Markdown 阶段稳定后，接入 Decap CMS 实现网页端编辑：

1. 添加 `public/admin/index.html`（Decap 入口）
2. 配置 `public/admin/config.yml`（backend: github + 分支 main，collections 映射到 knowledge 目录）
3. 关联 GitHub OAuth App 获取 client_id
4. 在仓库 Settings 关闭 Page Builds，确认 Actions 部署不受影响

> 注意：Decap 的 GitHub backend 需要 OAuth App 回调，云电脑上仅能完成配置，最终验证需在有浏览器的环境。

## 7. 常见问题

| 问题 | 解决 |
| --- | --- |
| `yarn dev` 端口被占 | `yarn dev --port 4322` |
| inspect 图片全 404 | 没在 dist 目录内运行 inspect |
| 构建后新文章没出现 | 检查 frontmatter 是否通过 schema（title/pubDate 必填） |
| 部署失败 | 先看 Actions 日志；`Setup Node` 失败多半是 yarn.lock 缺失，`Deploy` 失败多半是 Pages 未启用（Settings → Pages → Source → GitHub Actions） |
