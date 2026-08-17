# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

个人简历网站（找工作预览 + 打印 A4 PDF）。技术栈：Astro 7 + Vue 3 + TailwindCSS 4（@tailwindcss/vite 方式，无 tailwind.config.js）。**完全使用 pnpm，禁止 npm。**

## 常用命令

```bash
pnpm dev            # 开发服务器（daemon 模式后台运行）
astro dev stop      # 停止 dev 服务器（如需）
pnpm check          # astro check 类型检查
pnpm build          # 生产构建到 dist/
pnpm preview        # 预览构建产物
```

## 核心架构

### 数据驱动（改简历只动一个文件）

`src/data/resume.json` 是唯一数据源，所有页面从这里读取；`src/types/resume.ts` 定义与 JSON 一一对应的 TS 接口。页面用法：`import resume from '../data/resume.json'` 后 `const data = resume as ResumeData`。当前为模拟数据（林晓宇/前端工程师），用户后续替换真实内容。`.astro` 组件里无法直接 `as` 断言时在 frontmatter 中处理。

### 打印方案（最易踩坑处）

- `src/styles/print.css`：@page A4（margin 12mm 14mm）+ @media print 全部规则，是打印效果核心
- `.resume-sheet`（global.css 定义）：屏幕端 210mm 宽模拟 A4，`padding: 12mm 14mm` 与 @page margin **必须一致**（所见即所得）；打印时 print.css 将其 padding/width/min-height 清零——**若不同时清零会产生双倍边距或近空白第 2 页**
- 隐藏非打印元素用 Tailwind `print:hidden` 变体；防跨页断裂用 `.avoid-break` 类（print.css 中定义）；手动分页工具 `.break-before-page`
- 验证打印：`chrome --headless --print-to-pdf=out.pdf --no-pdf-header-footer --print-background http://localhost:4321/resume`

### 零 JS 哲学与组件划分

- 简历页整页零 JS：`Resume*` 前缀组件全部是 `.astro` 静态组件（技能条用 inline style width%，打印按钮用内联 `onclick="window.print()"`）
- 仅 3 个 Vue 组件，均有明确水合指令：`MobileMenu`（client:visible）、`HomeSkillBars`（client:visible，IntersectionObserver 动画）、`ProjectFilter`（client:load，技术栈标签筛选）
- `Icon.astro`：内联 SVG 图标集，`name` prop 映射 path，零依赖

### 样式体系

Tailwind v4 `@theme` 自定义色板（global.css）：`primary`（清新青）、`secondary`（靛蓝）、`accent`（珊瑚粉）、`page`（#f0f9ff 背景）、`surface`、`ink-900/600/400`（文字三级）。字体用中文系统字体栈（无 web 字体）。卡片统一 `rounded-2xl border border-ink-400/15 bg-surface shadow-sm`。

## 版本约束（勿升级）

- **TypeScript 固定在 6.0.3**：TS 7 原生编译器不支持 `astro check`（官方指引）
- Astro 7 Rust 编译器：所有 HTML 标签必须显式闭合（`<img />`、`<br />`）

## 内容约定

- 中文简历；简历页区块顺序即打印顺序：头部 → 简介 → 技能 → 经历 → 项目 → 教育 → 证书
- 按用户要求已移除所有头像/照片展示，纯文本布局
- 代码注释用中文
