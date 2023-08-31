'use client';
import { useState } from 'react';
import TrendsIcon from '@/app/components/Icons/TrendsIcon';
import FeedIcon from '@/app/components/Icons/FeedIcon';
import TrendsArticleListContainer from '@/app/components/TrendsArticleList/TrendsArticleListContainer';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<'trends' | 'feed'>('trends');

  return (
    // mx-[320px]
    <div className="flex flex-col h-full w-[1280px] main-md:w-[840px] main-sm:w-[400px] mx-auto">
      <div className="w-full flex gap-[30px] items-end border-b border-[#DDDDDD] pt-[50px]">
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
        <button
          onClick={() => setSelectedMode('feed')}
          className={`flex items-center gap-[6px] w-[61px] h-[24px] text-[20px] pb-[14px] ${
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
      </div>
      <div className="mb-[126px] w-full h-full">
        {selectedMode === 'trends' ? <TrendsArticleListContainer /> : <>피드</>}
      </div>
    </div>
  );
}
