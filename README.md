# 个人简历网站

个人简历网站：在线预览 + 一键打印 A4 PDF。在线地址：<https://resume.yl4055.top>

技术栈：**Astro 7 + Vue 3 + TailwindCSS 4**（pnpm 管理，禁止 npm）。

## 快速开始

```bash
pnpm install
pnpm dev       # 开发服务器 http://localhost:4321
pnpm check     # 类型检查
pnpm build     # 生产构建到 dist/
pnpm preview   # 预览构建产物
```

## 核心特性

- **数据驱动**：所有简历内容集中在 `src/data/resume.json`，改这一个文件即可更新整站（类型定义见 `src/types/resume.ts`）
- **A4 打印**：简历页零 JS，屏幕端 210mm 纸张模拟与 `@page` 边距一致，所见即打印所得
- **项目筛选**：项目页支持按技术栈标签筛选

## 验证打印效果

```bash
# 需先启动 dev / preview 服务器
chrome --headless --print-to-pdf=out.pdf --no-pdf-header-footer --print-background http://localhost:4321/resume
```

> Windows 下 Chrome 对 `/tmp` 等 POSIX 路径会重定向（如 `D:/DevTools/Temp`），建议用完整 Windows 路径。

## 部署

静态站点，部署于 Cloudflare Pages（根路径）。项目架构与踩坑说明详见 [CLAUDE.md](./CLAUDE.md)。
