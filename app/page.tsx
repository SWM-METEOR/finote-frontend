'use client';
import { useState } from 'react';

import TrendsIcon from '@/components/Icons/TrendsIcon';
import FeedIcon from '@/components/Icons/FeedIcon';
import QnAIcon from '@/components/Icons/QnAIcon';
import TrendsArticleListContainer from '@/components/articles/TrendsArticleList/TrendsArticleListContainer';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<'trends' | 'feed' | 'qna'>('trends');

  return (
    // mx-[320px]
    <div className="flex flex-col h-full w-[1280px] main-md:w-[840px] main-sm:w-[400px] mx-auto">
      <div className="w-full flex gap-[30px] items-end border-b border-[#DDDDDD] pt-[50px]">
        {/* 트렌드 아티클 탭 */}
        <button
          onClick={() => setSelectedMode('trends')}
          className={`flex items-center gap-[6px] w-[135px] h-[24px] text-[20px] pb-[14px] ${
            selectedMode === 'trends'
              ? 'transition duration-200 ease-in font-bold text-[#00A1FF] border-b-[2px] border-[#00A1FF]'
              : 'text-[#999999]'
          }`}
        >
          <span className="pb-[2px]">
            <TrendsIcon
              width={20}
              height={20}
              color={`${selectedMode === 'trends' ? '#00A1FF' : '#999999'}`}
            />
          </span>
          <span className="">트렌드 아티클</span>
        </button>
        {/* 피드 탭 */}
        <button
          onClick={() => setSelectedMode('feed')}
          className={`flex items-center gap-[6px] w-[64px] h-[24px] text-[20px] pb-[14px] ${
            selectedMode === 'feed'
              ? 'transition ease-in font-bold text-[#00A1FF] border-b-[2px] border-[#00A1FF]'
              : 'text-[#999999]'
          }`}
        >
          <span className="pb-[2px]">
            <FeedIcon
              width={20}
              height={20}
              color={`${selectedMode === 'feed' ? '#00A1FF' : '#999999'}`}
            />
          </span>
          <span className="">피드</span>
        </button>
        {/* Q&A 탭 */}
        <button
          onClick={() => setSelectedMode('qna')}
          className={`flex items-center gap-[6px] w-[76px] h-[24px] text-[20px] pb-[14px] ${
            selectedMode === 'qna'
              ? 'transition ease-in font-bold text-[#00A1FF] border-b-[2px] border-[#00A1FF]'
              : 'text-[#999999]'
          }`}
        >
          <span className="pb-[2px]">
            <QnAIcon
              width={20}
              height={20}
              color={`${selectedMode === 'qna' ? '#00A1FF' : '#999999'}`}
            />
          </span>
          <span className="">Q&A</span>
        </button>
      </div>
      <div className="mb-[126px] w-full h-full">
        {selectedMode === 'trends' ? <TrendsArticleListContainer /> : <></>}
        {selectedMode === 'feed' ? <></> : <></>}
        {selectedMode === 'qna' ? <></> : <></>}
      </div>
    </div>
  );
}
