# 部署手册（GitHub Pages）

> 目标线上地址：https://wiki.meark.cn

## 当前状态（2026-10-24）

- 仓库：`github.com/FuTao0907/meark-wiki`（public）
- 工作流：`.github/workflows/deploy.yml` 已就绪
- 域名 DNS 已验证：`wiki.meark.cn` 与 `meark.cn` 均 CNAME → `futao0907.github.io`（阿里/腾讯 DoH 均已确认）
- **阻塞项：仓库的 GitHub Pages 尚未启用**，需一次浏览器操作（见下）

## 1. 启用 GitHub Pages（一次性，需在浏览器手动完成）

云电脑浏览器不可用，请在任意能打开 GitHub 的设备上登录 `FuTao0907` 账号操作：

1. 打开 https://github.com/FuTao0907/meark-wiki/settings/pages
2. **Build and deployment → Source** 选择 **GitHub Actions**
3. 保存

完成后，仓库任意一次 push 到 `main` 会触发 Actions 自动构建部署。

## 2. 部署流程（push 即发布）

```bash
git add -A
git commit -m "feat: ..."
# 云电脑：用 GitHub MCP push_files 推送（无需 gh CLI）
# 本地电脑：git push origin main
```

Actions 工作流执行：checkout → setup-node 22 → yarn install → yarn build → upload artifact → deploy-pages。

## 3. 验证

- Actions 页面：https://github.com/FuTao0907/meark-wiki/actions （build 绿、deploy 绿）
- 访问 https://wiki.meark.cn 应看到首页
- 访问 https://wiki.meark.cn/knowledge/hr/ 验证子路由
- 证书与域名由 GitHub Pages 自动处理（CNAME 文件已提交）

## 4. 故障排查

| 症状 | 原因 | 处理 |
| --- | --- | --- |
| Actions 中 Deploy 失败，提示 pages not enabled | Pages 未启用 | 执行第 1 节 |
| Setup Node 失败，`yarn.lock not found` | workflow 配置了 `cache: yarn` 但 lockfile 未提交 | 当前 workflow 已移除 cache，确认 `yarn.lock` 已提交即可 |
| 页面 404 | CNAME 或 Pages 未生效 | 等 DNS 生效（已确认解析指向正确）；检查 Pages 部署状态 |
| 图片 404 | 部署版本未更新 | 重新 push 触发构建 |

## 5. 域名（已配置，只读记录）

- 注册商解析：`wiki.meark.cn` → CNAME → `futao0907.github.io`
- `meark.cn` 主域同样指向 `futao0907.github.io`（供未来主站使用，不属于本项目范围）
