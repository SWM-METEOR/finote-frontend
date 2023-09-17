'use client';

import Image from 'next/image';

import TabContainer from '@/components/SmartDrag/Tab/TabContainer';
import AISearchContainer from '@/components/SmartDrag/AISearch/AISearchContainer';
import IntroContainer from '@/components/SmartDrag/Intro/IntroContainer';
import DragRelatedArticlesContainer from '@/components/SmartDrag/DragRelatedArticles/DragRelatedArticlesContainer';
import { SmartDragType } from '@/types/smartDrag';
import { TooltipMode } from '@/types/smartDrag';

interface PropsType {
  isOpenSidePanel: boolean;
  setIsOpenSidePanel: (isOpenSidePanel: boolean) => void;
  selectedMode: TooltipMode;
}

export default function SidePanelView({
  isOpenSidePanel,
  setIsOpenSidePanel,
  selectedMode,
}: PropsType) {
  return (
    // 사이드패널, 토글 버튼은 PC사이즈 에서만  보임
    <div className={`fixed right-[0px] bg-white `}>
      <div className={`largeDesktop:block desktop:block hidden flex flex-row h-full`}>
        {/* TODO: 헤더에도 shrink-0 적용 필요 */}
        <div
          className={
            `w-[360px] h-[900px] top-0 shrink-0 h-screen` +
            (isOpenSidePanel
              ? ` block w-80 px-[20px] border border-[#EEEEEE] rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]`
              : ` hidden w-0`)
          }
        >
          <div className="flex flex-col">
            <p className="text-[16px] font-bold my-[25px] mx-auto">스마트 드래그</p>
            <TabContainer />
            {selectedMode === 'default' && <IntroContainer />}
            {selectedMode === SmartDragType[0] && <AISearchContainer />}
            {selectedMode === SmartDragType[1] && <DragRelatedArticlesContainer />}
            {selectedMode === SmartDragType[2] && <IntroContainer />}
          </div>
        </div>
        {/* 열고닫는 토글 버튼 */}
        <button
          className={
            `w-[30px] h-[60px] absolute flex justify-center items-center py-[24px] border-l-1 border-t-1 rounded-l-lg bg-[#666666]` +
            (isOpenSidePanel ? ` absolute top-[60px] -left-[30px]` : ` sticky top-[60px] -left-0`)
          }
          onClick={() => setIsOpenSidePanel(!isOpenSidePanel)}
        >
          <Image src="/toggle.svg" alt="toggle" width="12" height="12" />
        </button>
      </div>
    </div>
  );
}
