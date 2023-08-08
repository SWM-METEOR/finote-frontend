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
    <div className="">
      {/* TODO: 아래 영역이 hidden일 때 보이는 문제 해결 필요 */}
      <div className={`md:block hidden flex flex-row h-full relative`}>
        {/* TODO: 헤더에도 shrink-0 적용 필요 */}
        <div
          className={
            `sticky top-0 border-l-2 border-l-grey shrink-0 h-screen` +
            (isOpenSidePanel ? ` block w-80` : ` hidden w-0`)
          }
        >
          <div>
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
        <button
          className={
            `absolute flex justify-center items-center pt-2 border-l-1 border-t-1 border-b-1 border-grey rounded-l-lg bg-main w-12 h-12 mt-6` +
            (isOpenSidePanel ? ` absolute top-8 -left-12` : ` sticky top-8 -left-30`)
          }
          onClick={() => setIsOpenSidePanel(!isOpenSidePanel)}
        >
          <Image className="pb-2" src="/bulb.svg" alt="logo" width="16" height="16" />
        </button>
      </div>
    </div>
  );
}
