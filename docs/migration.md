# 从云电脑转移到本地电脑

> 场景：项目在云电脑（本工作区）开发，之后要迁移到你的 Windows 电脑继续开发与发布。

## 迁移方式（推荐：经 GitHub 中转）

云电脑上代码已推送到 GitHub，本地电脑直接 clone 即可，无需拷贝任何文件。

### 第 1 步：本地安装环境

1. 安装 Node.js LTS（≥ 22，当前 v22.23.x 即可）
2. 安装 Yarn 1.x：`npm i -g yarn@1`
3. 安装 Git（Windows 建议用 PowerShell 7 操作，避免 5.1 的编码问题）

### 第 2 步：克隆仓库

```powershell
git clone https://github.com/FuTao0907/meark-wiki.git
cd meark-wiki
yarn install
yarn dev   # 打开 http://localhost:4321 确认可运行
```

### 第 3 步：配置 GitHub 推送凭据（本地推送用）

```powershell
git config user.name "FuTao0907"
git config user.email "FuTao0907@users.noreply.github.com"
# 推送时选择 HTTPS + Personal Access Token，或配置 SSH
```

之后 `git push origin main` 即可发布（Actions 自动构建）。

## 备选：整目录拷贝（离线场景）

云电脑工作区目录：`/home/user/Doubao/chats/38449082098158594/meark-wiki/`

拷贝以下内容到本地即可（**不要拷贝** `node_modules/`、`dist/`）：

- `src/`、`public/`、`docs/`
- `package.json`、`yarn.lock`、`astro.config.mjs`、`tsconfig.json`
- `.github/`、`.gitignore`、`README.md`
- 可选：`.creative-design/`（素材设计记录）、`.taste-skill/`（检查记录，可删）

拷到本地后：`yarn install && yarn dev`。

## 双机同步约定（如果继续双端开发）

- 唯一事实源：GitHub 仓库 `main` 分支
- 云电脑 push 用 GitHub MCP（无凭据），本地 push 用 git 凭据
- 每次开工前 `git pull` 或 `git fetch && git reset --hard origin/main`（云电脑上慎用 hard reset，先 commit 本地改动）
- 设计令牌与检查门禁见 `docs/development.md`，两端保持一致

## 云电脑专用注意事项

- 无浏览器：`yarn dev` 验证用后台模式 + 检查构建产物（`dist/` 内跑 inspect）
- 无 git push 凭据：推送统一走 GitHub MCP `push_files`；推送后本地 `git fetch && git reset --hard origin/main` 对齐
- 无 gh CLI：仓库创建/Pages 启用等管理操作按 `docs/deployment.md` 手动完成或留到本地电脑
