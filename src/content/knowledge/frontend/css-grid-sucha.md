---
title: CSS Grid 布局速查
description: 最常用的 Grid 属性与布局套路，一张图记住核心用法。
pubDate: 2026-10-15
tags: [CSS, 前端, 布局]
---

## 容器属性

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 三列等宽 */
  grid-template-rows: auto;               /* 行高自适应 */
  gap: 16px;                              /* 行列间距 */
}
```

## 常用取值

| 写法 | 含义 |
| --- | --- |
| `1fr` | 一份剩余空间 |
| `repeat(4, 1fr)` | 四列等分 |
| `minmax(200px, 1fr)` | 最小 200px，可伸缩 |
| `auto-fit` / `auto-fill` | 自动填充列数 |

## 响应式套路

```css
/* 自动适应宽度：窄屏 1 列，宽屏多列 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

## 项目定位

```css
.item {
  grid-column: 1 / 3;   /* 占第 1 到第 2 列 */
  grid-row: span 2;     /* 跨两行 */
}
```

## 经典布局

```css
/* 圣杯布局 */
.page {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-areas: "header header header" "nav main aside" "footer footer footer";
}
```

> 提示：复杂布局优先 Grid，一维排列用 Flexbox。
