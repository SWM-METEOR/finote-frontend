'use client';

import { useTooltipStore, useSelectedTextStore } from '@/store/sidePanel';
import { SmartDragType } from '@/types/smartDrag';
import { useAISearchStore } from '@/store/sidePanel';
import TabView from '@/components/SmartDrag/Tab/TabView';
import { isTooltipMode } from '@/types/smartDrag';
import useSmartDrag from '@/hooks/useSmartDrag';

export default function TabContainer() {
  const { selectedMode, setSelectedMode } = useTooltipStore();
  const { selectedText } = useSelectedTextStore();
  const { setIsLoadingAISearchResult } = useAISearchStore();
  const [isAISearchMode] = useSmartDrag();

  const clickTab = (index: number) => {
    const mode = SmartDragType[index];
    if (isTooltipMode(mode)) {
      // 선택된 모드 변경
      setSelectedMode(mode);
    }

    // AI 검색
    if (isAISearchMode(index) && selectedText !== '') {
      setIsLoadingAISearchResult(true);
    }

    // TODO: 선택모드에 따라 요청하기
  };

  return (
    <>
      <TabView clickTab={clickTab} selectedMode={selectedMode}></TabView>
    </>
  );
}
