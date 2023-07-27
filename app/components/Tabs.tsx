'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PulseLoader from 'react-spinners/PulseLoader';
import { useTooltipStore, useSelectedTextStore } from '@/store/sidePanel';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import { useAISearchStore } from '@/store/sidePanel';

export default function Tabs() {
  const { selectedMode, setSelectedMode } = useTooltipStore();
  const { selectedText, setSelectedText } = useSelectedTextStore();
  const { isLoadingAISearchResult, setIsLoadingAISearchResult } = useAISearchStore();
  const [AIResult, setAIResult] = useState<string>('');

  const searchAI = () => {
    // AI 요청
    console.log('AI 요청');
    // 탭이 아니라, 이거는 툴팁쪽에서 검색요청 해야함

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles/ai-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: selectedText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAIResult(data.data.content);
        setIsLoadingAISearchResult(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        // TODO: 재요청 등의 처리 필요
      });
  };

  const clickTab = (index: number) => {
    const clickedTab = SIDEPANEL_OPTION_LIST[index];
    setSelectedMode(clickedTab);

    // AI 검색
    if (selectedText === SIDEPANEL_OPTION_LIST[0] && selectedText !== '') {
      setIsLoadingAISearchResult(true);
    }

    // 선택모드에 따라 요청하기!!
  };

  useEffect(() => {
    if (!isLoadingAISearchResult) return;
    // console.log(selectedMode);

    searchAI();
  }, [isLoadingAISearchResult]);

  return (
    <>
      <div className="tabs h-10 mr-1 shadow-lg mb-4 mt-1 rounded-md">
        {SIDEPANEL_OPTION_LIST.map((tab, index) => (
          <button
            key={index}
            onClick={() => clickTab(index)}
            className={`h-full tab w-1/3 rounded text-darkGrey ${
              selectedMode === SIDEPANEL_OPTION_LIST[index]
                ? 'transition duration-300 ease-in [--tab-bg:main] tab-active text-white bg-main rounded'
                : ''
            } ${selectedMode !== SIDEPANEL_OPTION_LIST[index] ? 'hover:bg-grey' : ''}`} // 활성 탭에 'tab-active' 클래스 적용
          >
            <span className="mb-4 font-semibold pt-1">{tab}</span>
          </button>
        ))}

        {selectedMode === 'default' && (
          <div className="w-full py-4 flex flex-col gap-4">
            <div className="chat chat-end">
              <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
                <p>글을 읽다 모르는 내용이 있나요?</p>
                <p>
                  궁금한 내용을 <span className="font-bold text-yellow">드래그</span>해보세요!
                </p>
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble whitespace-pre-line bg-main text-white">
                <p>
                  <span className="font-bold text-yellow">GPT-4</span>의 설명과 함께
                </p>
                <p>관련 아티클을 추천해드립니다!</p>
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble bg-main text-white whitespace-pre-line">
                <p>그래도 해결되지 않는 궁금증은</p>
                <p>
                  <span className="font-bold text-yellow">Q&A 커뮤니티</span>에 질문해보세요!
                </p>
              </div>
            </div>
          </div>
        )}
        {selectedMode === SIDEPANEL_OPTION_LIST[0] && (
          <div className="w-full py-4 flex flex-col gap-4">
            {/* 선택한 텍스트 */}
            <div className="chat chat-end">
              <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
                {selectedText === ''
                  ? `궁금한 내용을 드래그해보세요!\nGPT-4의 답변을 받을 수 있습니다.`
                  : `${selectedText}`}
              </div>
            </div>
            {/* AI 검색 결과 */}

            <div className="chat chat-start">
              <div className="chat-bubble bg-main">
                {isLoadingAISearchResult ? (
                  <div className="flex flex-col text-white">
                    <div className="flex items-center gap-1">
                      <Image
                        className="pb-2"
                        src="/chatgpt.svg"
                        alt="logo"
                        width="20"
                        height="20"
                      />
                      <span className="pb-2">Model: GPT-4</span>
                    </div>
                    <p>답변을 생성하는 중입니다.</p>
                    <p className="ml-auto py-4 mr-auto">
                      <PulseLoader
                        color="#FFFFFF"
                        size={12}
                        margin={4}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </p>
                  </div>
                ) : (
                  <div className="text-white">{AIResult}</div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedMode === SIDEPANEL_OPTION_LIST[1] && <div>관련 아티클 모아보기</div>}
        {selectedMode === SIDEPANEL_OPTION_LIST[2] && <div>질문 생성 및 관련 질문 모아보기</div>}
      </div>
    </>
  );
}
