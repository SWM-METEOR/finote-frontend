'use client';

import { SIDEPANEL_TAB_NAME } from '@/constants/sidePanel';
import { SmartDragType } from '@/types/smartDrag';
import { TooltipMode } from '@/types/smartDrag';

interface PropsType {
  clickTab: (index: number) => void;
  selectedMode: TooltipMode;
}

export default function TabView({ clickTab, selectedMode }: PropsType) {
  return (
    <>
      <div className="tabs h-10 mr-1 mb-4 mt-1 rounded-md">
        {SIDEPANEL_TAB_NAME.map((tab, index) => (
          <button
            key={index}
            onClick={() => clickTab(index)}
            className={`h-full tab tab-bordered w-1/3 text-[#999999] ${
              selectedMode === SmartDragType[index]
                ? 'transition duration-200 ease-in tab-active text-black font-bold '
                : ''
            } ${selectedMode !== SmartDragType[index] ? 'hover:bg-grey' : ''}`}
          >
            <span className=" mb-4 font-semibold pt-1">{tab}</span>
          </button>
        ))}
      </div>
    </>
  );
}
