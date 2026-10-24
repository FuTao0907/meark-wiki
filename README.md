# meark-wiki

[wiki.meark.cn](https://wiki.meark.cn) —— meark.cn 网站系下的个人知识库。

沉淀自己学过、以及通过 AI 搜索后总结的知识，形成体系化的知识站点。

## 技术栈

- [Astro 5](https://astro.build)（SSG 静态站点）
- Markdown 内容集合（Content Collections）
- 部署：GitHub Pages + GitHub Actions（push 到 `main` 自动构建发布）
- 依赖管理：Yarn（`package.json` 中 `packageManager` 已标注）

## 本地开发

```bash
yarn install     # 安装依赖
yarn dev         # 开发服务器
yarn build       # 生产构建（输出到 dist/）
yarn preview     # 本地预览构建产物
```

## 目录结构

```
src/
├── content/          # 知识内容（Markdown）
│   └── <分类>/…
├── layouts/          # 布局组件
├── components/       # 页面组件
└── pages/            # 路由页面
public/               # 静态资源（含 CNAME）
.github/workflows/    # GitHub Pages 部署流水线
```

## 部署

1. 推送代码到 `main` 分支
2. GitHub Actions 自动执行 `yarn install && yarn build`
3. 构建产物（`dist/`）发布到 GitHub Pages，绑定 `wiki.meark.cn`

详见 `docs/` 下的开发文档。
