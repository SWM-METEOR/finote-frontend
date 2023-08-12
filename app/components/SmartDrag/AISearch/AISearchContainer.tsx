'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';

import AISearchView from '@/app/components/SmartDrag/AISearch/AISearchView';
import { useAISearchStore, useSelectedTextStore } from '@/store/sidePanel';

export default function AISearchContainer() {
  const { selectedText } = useSelectedTextStore();
  const { isLoadingAISearchResult, setIsLoadingAISearchResult } = useAISearchStore();
  const [AIResult, setAIResult] = useState<string>('');

  const searchAI = () => {
    // AI 요청
    axiosInstance
      .post('/articles/ai-search', { prompt: selectedText })
      .then((response) => {
        setAIResult(response.data.data.content);
        setIsLoadingAISearchResult(false);
      })
      .catch((error) => {
        console.error('AI 검색 실패:', error);
        // TODO: 재요청 등의 처리 필요
      });
  };

  useEffect(() => {
    if (!isLoadingAISearchResult) return;

    searchAI();
  }, [isLoadingAISearchResult]);

  return (
    <AISearchView
      selectedText={selectedText}
      isLoadingAISearchResult={isLoadingAISearchResult}
      AIResult={AIResult}
    />
  );
}
