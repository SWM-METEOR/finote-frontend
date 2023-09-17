'use client';

import { SmartDragType } from '@/types/smartDrag';

export default function useSmartDrag() {
  const isAISearchMode = (index: number) => index === SmartDragType.AISearch;
  const isRelatedArticleMode = (index: number) => index === SmartDragType.RelatedArticle;
  const isQnAMode = (index: number) => index === SmartDragType.QnA;

  return [isAISearchMode, isRelatedArticleMode, isQnAMode];
}
