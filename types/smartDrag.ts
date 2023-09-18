export enum SmartDragType {
  AISearch,
  RelatedArticle,
  QnA,
}

export type TooltipMode = 'default' | 'AISearch' | 'RelatedArticle' | 'QnA';

// 타입 가드
export function isTooltipMode(mode: any): mode is TooltipMode {
  return ['default', 'AISearch', 'RelatedArticle', 'QnA'].includes(mode);
}
