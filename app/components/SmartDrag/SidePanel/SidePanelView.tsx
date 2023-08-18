'use client';

import Image from 'next/image';

import TabContainer from '@/app/components/SmartDrag/Tab/TabContainer';
import AISearchContainer from '@/app/components/SmartDrag/AISearch/AISearchContainer';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import IntroContainer from '@/app/components/SmartDrag/Intro/IntroContainer';
import DragRelatedArticlesContainer from '@/app/components/SmartDrag/DragRelatedArticles/DragRelatedArticlesContainer';

interface PropsType {
  isOpenSidePanel: boolean;
  setIsOpenSidePanel: (isOpenSidePanel: boolean) => void;
  selectedMode: string;
}

export default function SidePanelView({
  isOpenSidePanel,
  setIsOpenSidePanel,
  selectedMode,
}: PropsType) {
  return (
    // TODO: 사이드패널, 토글 버튼은 PC사이즈 에서만  보임
    <div className="  fixed right-[0px] bg-white ">
      <div className={`md:block hidden flex flex-row h-full`}>
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
            {selectedMode === SIDEPANEL_OPTION_LIST[0] && <AISearchContainer />}
            {selectedMode === SIDEPANEL_OPTION_LIST[1] && (
              <div>
                <DragRelatedArticlesContainer />
              </div>
            )}
            {selectedMode === SIDEPANEL_OPTION_LIST[2] && (
              <div>질문 생성 및 관련 질문 모아보기</div>
            )}
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
