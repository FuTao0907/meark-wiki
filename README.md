# meark-wiki

[wiki.meark.cn](https://wiki.meark.cn) —— meark.cn 网站系下的个人知识库。

沉淀自己学过、以及通过 AI 搜索后总结的知识，形成体系化的知识站点。

## 技术栈

- [Astro 5](https://astro.build)（SSG 静态站点）
- Markdown 内容集合（Content Collections），文章即 `src/content/knowledge/<分类>/*.md`
- 部署：GitHub Pages + GitHub Actions（push 到 `main` 自动构建发布）
- 依赖管理：Yarn（`package.json` 中 `packageManager` 已标注为 `yarn@1.22.22`）

## 快速开始

```bash
yarn install     # 安装依赖
yarn dev         # 开发服务器 http://localhost:4321
yarn build       # 生产构建（输出到 dist/）
yarn preview     # 本地预览构建产物
```

## 目录结构

```
src/
├── content/
│   └── knowledge/<分类>/*.md   # 文章本体（Markdown）
├── content.config.ts           # frontmatter schema 校验
├── lib/knowledge.ts            # 分类登记（新增分类在此添加）
├── layouts/Base.astro          # 全局布局 + 设计令牌
└── pages/                      # 路由（首页 / knowledge 三件套）
public/                         # 静态资源（images、CNAME、favicon）
.github/workflows/deploy.yml    # GitHub Pages 部署流水线
docs/                           # 架构 / 开发 / 部署 / 迁移文档
```

## 文档

| 文档 | 内容 |
| --- | --- |
| [架构决策](docs/architecture.md) | 技术栈、内容架构、路由、设计系统 |
| [开发手册](docs/development.md) | 日常开发、写文章/分类、UI 守则、检查门禁 |
| [部署手册](docs/deployment.md) | Pages 启用、发布流程、故障排查 |
| [迁移指南](docs/migration.md) | 云电脑 → 本地电脑转移步骤 |

## 部署

push 到 `main` → GitHub Actions 构建 → 发布到 `wiki.meark.cn`。详见 [docs/deployment.md](docs/deployment.md)。
