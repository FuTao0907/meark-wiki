import { defineCollection, z } from 'astro:content';

/**
 * 知识库内容集合
 *
 * 文章存放：src/content/knowledge/<分类>/<文章名>.md
 * 分类即目录名：hr（人事行政）/ frontend（前端技术）/ ai-tools（AI 与工具）/ general（通用知识）
 *
 * 每篇文章 frontmatter 必填字段：
 *   title       文章标题
 *   pubDate     发布日期（YYYY-MM-DD）
 * 可选字段：
 *   description 一句话摘要（列表页展示）
 *   updatedDate 最后更新日期
 *   tags        标签数组
 */
const knowledge = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { knowledge };
