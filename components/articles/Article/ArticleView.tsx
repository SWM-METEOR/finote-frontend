'use client';
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import GreaterThanIcon from '@/components/Icons/GreaterThanIcon';
import { SIDEPANEL_TAB_NAME } from '@/constants/sidePanel';
import useSmartDrag from '@/hooks/useSmartDrag';
import { isTooltipMode } from '@/types/smartDrag';
import {
  useTooltipStore,
  useSidePanelStore,
  useDragTextStore,
  useSelectedTextStore,
  useAISearchStore,
} from '@/store/sidePanel';
import EditButtonContainer from '@/components/articles/EditButton/EditButtonContainer';
import DeleteButtonContainer from '@/components/articles/DeleteButton/DeleteButtonContainer';
import FollowButtonContainer from '@/components/user/FollowButton/FollowButtonContainer';
import { SmartDragType } from '@/types/smartDrag';

interface PropsType {
  id: number;
  title: string;
  authorNickname: string;
  profileImageUrl: string;
  createDate: string;
  contents: string;
}

export default function ArticleView({
  id,
  title,
  authorNickname,
  profileImageUrl,
  createDate,
  contents,
}: PropsType) {
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [isAISearchMode] = useSmartDrag();

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

  const buttonStyles = [
    'ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-l-md',
    'ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey',
    'ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-r-md',
  ];

  // 툴팁에서 모드 선택
  const handleTooltipClick = (index: number) => {
    setSelectedText(dragText); // 사이드 패널에 드래그 텍스트 업데이트

    const mode = SmartDragType[index];
    if (isTooltipMode(mode)) {
      // 선택된 모드 변경
      setSelectedMode(mode);
    }

    setIsOpenSidePanel(true); // 사이드 패널 열기
    setShowTooltip(false); // 툴팁 닫기

    // 로딩 스피너 띄우고, 결과 받아오기
    if (isAISearchMode(index) && dragText !== '') {
      setIsLoadingAISearchResult(true);
    }
  };

  const setTooltipPosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const eventTarget = e.currentTarget as HTMLDivElement;
    const rect = eventTarget.getBoundingClientRect();
    const offsetY = dragStartY.current - rect.top - 55;
    const offsetX = dragStartX.current - rect.left - 5;

    // 툴팁에 상대적 위치 설정
    if (!tooltipRef.current) return;
    tooltipRef.current.setAttribute('style', `top: ${offsetY}px; left: ${offsetX}px`);
  };

  const handleDragStart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
    // 더블클릭이 아닌 한번 클릭 시, 유의미한 드래그가 아니므로 툴팁 X
    if (!isDoubleClick && dragStartX.current == e.clientX && dragStartY.current == e.clientY) {
      setShowTooltip(false);
      return;
    }

    if (isDoubleClick) {
      setIsDoubleClick(false); // 더블 클릭 상태 초기화
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setDragText(window.getSelection()!.toString()); // 드래그된 텍스트 저장
    setTooltipPosition(e);
    setShowTooltip(true);
  };

  // 더블클릭 시에도 툴팁 띄움
  const handleDoubleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setIsDoubleClick(true);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setDragText(window.getSelection()!.toString()); // 드래그된 텍스트 저장
    setTooltipPosition(e);
    setShowTooltip(true);
  };

  useEffect(() => {
    setSelectedText('');
    setSelectedMode('default');
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      <p className="flex text-[16px] gap-1 items-center">
        <span>프론트엔드</span>
        <GreaterThanIcon />
        <span className="text-[#00A1FF] font-bold">자바스크립트</span>
        <span className="ml-auto mr-[20px] flex gap-[16px]">
          <EditButtonContainer articleId={id} authorNickname={authorNickname} />
          <DeleteButtonContainer articleId={id} authorNickname={authorNickname} />
        </span>
      </p>
      <h1 className="text-[32px] font-bold">{title}</h1>
      <div className="flex items-center gap-[8px]">
        <div className="w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image src={profileImageUrl} alt={authorNickname} width="30" height="30" />
        </div>
        <span className="text-[14px]">{authorNickname}</span>
        <span className="text-[14px] text-[#999999] ml-[2px]">{createDate}</span>
        {/* 팔로우 */}
        <FollowButtonContainer followTargetNickname={authorNickname} size={'small'} />
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
            {SIDEPANEL_TAB_NAME.map((option, index) => (
              <button
                key={index}
                onClick={() => handleTooltipClick(index)}
                className={buttonStyles[index]}
              >
                {option}
              </button>
            ))}
          </div>
          <div
            className="w-full"
            onDoubleClick={handleDoubleClick}
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
