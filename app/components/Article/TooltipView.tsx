import React from 'react';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

interface PropsType {
  handleClick: (selectedText: string) => void;
  showTooltip: boolean;
}

// 함수형 컴포넌트에서 ref를 prop으로 받기 위해 forwardRef로 감싸줘야 함
export default React.forwardRef<HTMLDivElement, PropsType>(function TooltipView(
  { handleClick, showTooltip },
  ref
) {
  // {/* 툴팁 크기: 258px */}
  return (
    <div
      ref={ref}
      className={
        `z-999 w-[250px] absolute flex justify-stretch divide-x divide-grey items-center bg-white border-2 rounded-lg border-grey drop-shadow-xl` +
        (showTooltip ? ' block' : ' hidden')
      }
    >
      {/* TODO: 이벤트 위임 방식으로 변경 */}
      <button
        onClick={() => handleClick(SIDEPANEL_OPTION_LIST[0])}
        className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-l-md"
      >
        {SIDEPANEL_OPTION_LIST[0]}
      </button>
      <button
        onClick={() => handleClick(SIDEPANEL_OPTION_LIST[1])}
        className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey"
      >
        {SIDEPANEL_OPTION_LIST[1]}
      </button>
      <button
        onClick={() => handleClick(SIDEPANEL_OPTION_LIST[2])}
        className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-r-md"
      >
        {SIDEPANEL_OPTION_LIST[2]}
      </button>
    </div>
  );
});
