'use client';

import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

interface PropsType {
  clickTab: (index: number) => void;
  selectedMode: string;
}

export default function TabView({ clickTab, selectedMode }: PropsType) {
  return (
    <>
      <div className="tabs h-10 mr-1 shadow-lg mb-4 mt-1 rounded-md">
        {SIDEPANEL_OPTION_LIST.map((tab, index) => (
          <button
            key={index}
            onClick={() => clickTab(index)}
            className={`h-full tab w-1/3 rounded text-darkGrey ${
              selectedMode === SIDEPANEL_OPTION_LIST[index]
                ? 'transition duration-300 ease-in [--tab-bg:main] tab-active text-white bg-main rounded'
                : ''
            } ${selectedMode !== SIDEPANEL_OPTION_LIST[index] ? 'hover:bg-grey' : ''}`} // 활성 탭에 'tab-active' 클래스 적용
          >
            <span className="mb-4 font-semibold pt-1">{tab}</span>
          </button>
        ))}
      </div>
    </>
  );
}
