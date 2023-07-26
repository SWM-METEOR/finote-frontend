'use client';
import { useEffect, useState, useRef } from 'react';

interface PropsType {
  contents: string;
}

// TODO: data 를 props로 받아와야 함
export default function Article({ contents }: PropsType) {
  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const toolTip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

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

  return (
    <div className="relative">
      {/* 툴팁 크기: 260px */}
      <div
        ref={toolTip}
        className={
          `z-999 w-[260px] absolute flex gap-2 divide-x divide-grey justify-between items-center bg-white border-1 border-grey rounded-lg py-1 px-2 drop-shadow-xl` +
          (showTooltip ? ' block' : ' hidden')
        }
      >
        <button className="pl-1">배우기</button>
        <button className="pl-2">관련 아티클</button>
        <button className="pl-2 pr-1">질문 생성</button>
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
