'use client';
import { useState, useRef } from 'react';
import { useTooltipStore } from '@/store/sidePanel';
import { useSidePanelStore } from '@/store/sidePanel';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

interface PropsType {
  contents: string;
}

// TODO: data 를 props로 받아와야 함
export default function Article({ contents }: PropsType) {
  const { setSelectedMode } = useTooltipStore();
  const { setIsOpenSidePanel } = useSidePanelStore();

  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const toolTip = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
    // 클릭 or 드래그 구간이 4px 이하인 경우, 유의미한 드래그가 아니므로 툴팁 X
    // TODO: 이걸 본문 뿐만 아니라, 바깥 영역 전체에 대해 감지해야됨, 전역 상태 도입 필요
    if (dragStartX.current == e.clientX || dragStartX.current >= e.clientX - 4) {
      setShowTooltip(false);
      return;
    }

    // 드래그된 문장
    setSelectedText(window.getSelection()!.toString());

    const eventTarget = e.currentTarget as HTMLDivElement;
    const rect = eventTarget.getBoundingClientRect();
    const offsetY = dragStartY.current - rect.top - 55;
    const offsetX = dragStartX.current - rect.left - 5;

    // 툴팁에 상대적 위치 설정
    if (!toolTip.current) return;
    toolTip.current.setAttribute('style', `top: ${offsetY}px; left: ${offsetX}px`);
    setShowTooltip(true);
  };

  const handleClick = (selectedText: string) => {
    setSelectedMode(selectedText); // 선택된 모드 변경
    setIsOpenSidePanel(true); // 사이드 패널 열기
    setShowTooltip(false); // 툴팁 닫기

    // TODO: 로딩 스피너 띄우고, 결과 받아오기
  };

  return (
    <div className="relative">
      {/* 툴팁 크기: 258px */}
      <div
        ref={toolTip}
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
      <div
        className="w-full"
        onMouseUp={(e) => handleDragEnd(e)}
        onMouseDown={(e) => handleDragStart(e)}
      >
        {contents}
      </div>
    </div>
  );
}
