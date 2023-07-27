'use client';

import { useTooltipStore } from '@/store/sidePanel';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

export default function Tabs() {
  const { selectedMode, setSelectedMode } = useTooltipStore();

  const clickTab = (index: number) => {
    setSelectedMode(SIDEPANEL_OPTION_LIST[index]);
  };

  return (
    <>
      <div className="tabs h-10 mr-1 color-main shadow-lg mb-4 mt-1 rounded-md">
        {SIDEPANEL_OPTION_LIST.map((tab, index) => (
          <button
            key={index}
            onClick={() => clickTab(index)}
            className={`h-full tab tab-lifted w-1/3 rounded ${
              selectedMode === SIDEPANEL_OPTION_LIST[index] ? 'tab-active bg-middleGrey' : ''
            } ${selectedMode !== SIDEPANEL_OPTION_LIST[index] ? 'hover:bg-grey' : ''}`} // 활성 탭에 'tab-active' 클래스 적용
          >
            <span className="mb-4">{tab}</span>
          </button>
        ))}

        {selectedMode === 'default' && <div>궁금한 내용을 드래그해보세요!</div>}
        {selectedMode === SIDEPANEL_OPTION_LIST[0] && <div>탭 1의 내용</div>}
        {selectedMode === SIDEPANEL_OPTION_LIST[1] && <div>탭 2의 내용</div>}
        {selectedMode === SIDEPANEL_OPTION_LIST[2] && <div>탭 3의 내용</div>}
      </div>
    </>
  );
}
