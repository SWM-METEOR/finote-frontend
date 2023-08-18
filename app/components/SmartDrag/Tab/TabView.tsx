'use client';

import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

interface PropsType {
  clickTab: (index: number) => void;
  selectedMode: string;
}

export default function TabView({ clickTab, selectedMode }: PropsType) {
  return (
    <>
      <div className="tabs h-10 mr-1 mb-4 mt-1 rounded-md">
        {SIDEPANEL_OPTION_LIST.map((tab, index) => (
          <button
            key={index}
            onClick={() => clickTab(index)}
            className={`h-full tab tab-bordered w-1/3 text-[#999999] ${
              selectedMode === SIDEPANEL_OPTION_LIST[index]
                ? 'transition duration-200 ease-in tab-active text-black font-bold '
                : ''
            } ${selectedMode !== SIDEPANEL_OPTION_LIST[index] ? 'hover:bg-grey' : ''}`}
          >
            <span className=" mb-4 font-semibold pt-1">{tab}</span>
          </button>
        ))}
      </div>
    </>
  );
}
