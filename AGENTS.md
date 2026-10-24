# meark-wiki 项目约定

## Development

- 依赖安装一律用 `yarn`（package.json 已标注 `"packageManager": "yarn@1.22.22"`）。
- 云电脑无浏览器，启动开发服务器用后台模式：
  ```
  astro dev --background
  ```
  管理命令：`astro dev stop`、`astro dev status`、`astro dev logs`。
- 修改 UI 后必须在 `dist/` 目录内运行 design-taste inspect（在仓库根运行会导致图片绝对路径 404）：
  ```
  yarn build && cd dist && node ~/.doubao/agent_mode/workspace/.user_skills/design-taste-frontend/scripts/inspect.mjs index.html
  ```
- 推送代码：云电脑无 git push 凭据，用 GitHub MCP `push_files` 推送；推送后本地执行 `git fetch origin && git reset --hard origin/main` 对齐。
- 改动样式前先读 `docs/development.md` 的「UI 修改守则」与 `docs/architecture.md` 的设计令牌。

## Content

- 文章：`src/content/knowledge/<分类>/<slug>.md`，frontmatter 必须通过 `content.config.ts` schema（title/description/pubDate 必填，tags 可选）。
- 新增分类：建目录 + 在 `src/lib/knowledge.ts` 的 `CATEGORIES` 登记。
- 氛围图统一「暗调暖光书房」风格，放 `public/images/`，替换后跑 `yarn build` 验证。

## Documentation

- 项目文档在 `docs/`：architecture（架构决策）/ development（开发手册）/ deployment（部署）/ migration（迁移）。
- 改动涉及架构、设计令牌、内容规范时，同步更新对应文档。

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
