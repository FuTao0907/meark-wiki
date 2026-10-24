/**
 * 知识库分类定义（与 src/content/knowledge/ 下的目录一一对应）
 * 新增分类：在 src/content/knowledge/ 建同名目录，并在此登记
 */
export const CATEGORIES = [
  { key: 'hr', name: '人事行政', description: '人事、行政、文书岗位知识，面试与办公技能' },
  { key: 'frontend', name: '前端技术', description: '前端开发的知识沉淀与学习笔记' },
  { key: 'ai-tools', name: 'AI 与工具', description: '用 AI 搜索到的知识总结、效率工具与方法' },
  { key: 'general', name: '通用知识', description: '其他领域知识，持续扩展' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

export function getCategory(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}
