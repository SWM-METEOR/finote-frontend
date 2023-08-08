'use client';

import { useTooltipStore, useSelectedTextStore } from '@/store/sidePanel';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import { useAISearchStore } from '@/store/sidePanel';
import TabView from '@/app/components/SmartDrag/Tab/TabView';

export default function TabContainer() {
  const { selectedMode, setSelectedMode } = useTooltipStore();
  const { selectedText } = useSelectedTextStore();
  const { setIsLoadingAISearchResult } = useAISearchStore();

  const clickTab = (index: number) => {
    const clickedTab = SIDEPANEL_OPTION_LIST[index];
    setSelectedMode(clickedTab);

    // AI 검색
    console.log(clickedTab);
    if (clickedTab === SIDEPANEL_OPTION_LIST[0] && selectedText !== '') {
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
