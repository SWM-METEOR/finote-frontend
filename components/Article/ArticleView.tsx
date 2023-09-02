'use client';
import React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GreaterThanIcon from '@/components/Icons/GreaterThanIcon';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import {
  useTooltipStore,
  useSidePanelStore,
  useDragTextStore,
  useSelectedTextStore,
  useAISearchStore,
} from '@/store/sidePanel';

interface PropsType {
  title: string;
  authorNickname: string;
  createDate: string;
  contents: string;
}

export default function ArticleView({ title, authorNickname, createDate, contents }: PropsType) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const { setSelectedMode } = useTooltipStore();
  const { setIsOpenSidePanel } = useSidePanelStore();
  const { dragText } = useDragTextStore();
  const { setSelectedText } = useSelectedTextStore();
  const { setIsLoadingAISearchResult } = useAISearchStore();
  const { setDragText } = useDragTextStore();

  // 툴팁에서 모드 선택
  const handleTooltipClick = (selectedText: string) => {
    setSelectedText(dragText); // 사이드 패널에 드래그 텍스트 업데이트
    setSelectedMode(selectedText); // 선택된 모드 변경
    setIsOpenSidePanel(true); // 사이드 패널 열기
    setShowTooltip(false); // 툴팁 닫기

    // 로딩 스피너 띄우고, 결과 받아오기
    if (selectedText === SIDEPANEL_OPTION_LIST[0] && dragText !== '') {
      setIsLoadingAISearchResult(true);
    }
  };

  const handleDragStart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
    // 클릭 or 드래그 구간이 4px 이하인 경우, 유의미한 드래그가 아니므로 툴팁 X
    // TODO: 이걸 본문 뿐만 아니라, 바깥 영역 전체에 대해 감지해야됨, 전역 상태 코드로 변경 필요
    if (dragStartX.current == e.clientX || dragStartX.current >= e.clientX - 4) {
      setShowTooltip(false);
      return;
    }

    // 드래그된 텍스트 저장
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setDragText(window.getSelection()!.toString());

    const eventTarget = e.currentTarget as HTMLDivElement;
    const rect = eventTarget.getBoundingClientRect();
    const offsetY = dragStartY.current - rect.top - 55;
    const offsetX = dragStartX.current - rect.left - 5;

    // 툴팁에 상대적 위치 설정
    if (!tooltipRef.current) return;
    tooltipRef.current.setAttribute('style', `top: ${offsetY}px; left: ${offsetX}px`);
    setShowTooltip(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      <p className="flex text-[16px] gap-1 items-center">
        <span>프론트엔드</span>
        <GreaterThanIcon />
        <span className="text-[#00A1FF] font-bold">자바스크립트</span>
      </p>
      <h1 className="text-[32px] font-bold">{title}</h1>
      <div className="flex items-center gap-[8px]">
        <div className="w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
            alt="logo"
            width="30"
            height="30"
          />
        </div>
        <span className="text-[14px]">{authorNickname}</span>
        <span className="text-[14px] text-[#999999] ml-[2px]">{createDate}</span>
      </div>
      {/* 카테고리 */}
      <div className="flex items-center gap-[5px]">
        <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
          <span># OAuth</span>
        </button>
        <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
          <span># Spring</span>
        </button>
        <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
          <span># JAVA</span>
        </button>
      </div>
      <div className="w-full max-w-4xl self-center py-10 text-lg">
        <div className="relative">
          {/* 툴팁 */}
          <div
            ref={tooltipRef}
            className={
              `z-999 w-[250px] absolute flex justify-stretch divide-x divide-grey items-center bg-white border-2 rounded-lg border-grey drop-shadow-xl` +
              (showTooltip ? ' block' : ' hidden')
            }
          >
            {/* TODO: 이벤트 위임 방식으로 변경 */}
            <button
              onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[0])}
              className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-l-md"
            >
              {SIDEPANEL_OPTION_LIST[0]}
            </button>
            <button
              onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[1])}
              className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey"
            >
              {SIDEPANEL_OPTION_LIST[1]}
            </button>
            <button
              onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[2])}
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
            <ReactMarkdown className="prose prose-slate" remarkPlugins={[remarkGfm]}>
              {contents}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
