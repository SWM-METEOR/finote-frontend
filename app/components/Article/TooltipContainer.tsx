import { useState, useRef } from 'react';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import {
  useTooltipStore,
  useSidePanelStore,
  useDragTextStore,
  useSelectedTextStore,
  useAISearchStore,
} from '@/store/sidePanel';
import TooltipView from '@/app/components/Article/TooltipView';

export default function TooltipContainer() {
  const { setSelectedMode } = useTooltipStore();
  const { setIsOpenSidePanel } = useSidePanelStore();
  const { dragText } = useDragTextStore();
  const { setSelectedText } = useSelectedTextStore();
  const { setIsLoadingAISearchResult } = useAISearchStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const toolTip = useRef<HTMLDivElement>(null);

  // 툴팁에서 모드 선택
  const handleClick = (selectedText: string) => {
    setSelectedText(dragText); // 사이드 패널에 드래그 텍스트 업데이트
    setSelectedMode(selectedText); // 선택된 모드 변경
    setIsOpenSidePanel(true); // 사이드 패널 열기
    setShowTooltip(false); // 툴팁 닫기

    // TODO: 로딩 스피너 띄우고, 결과 받아오기
    if (selectedText === SIDEPANEL_OPTION_LIST[0] && dragText !== '') {
      setIsLoadingAISearchResult(true);
    }
  };

  return <TooltipView ref={toolTip} handleClick={handleClick} showTooltip={showTooltip} />;
}
