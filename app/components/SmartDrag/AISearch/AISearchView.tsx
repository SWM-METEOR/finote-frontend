import Image from 'next/image';
import PulseLoader from 'react-spinners/PulseLoader';

interface PropsType {
  selectedText: string;
  isLoadingAISearchResult: boolean;
  AIResult: string;
}

export default function AISearchView({
  selectedText,
  isLoadingAISearchResult,
  AIResult,
}: PropsType) {
  return (
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
        {/* 드래그한 텍스트가 없는 경우, 말풍선 숨김 */}
        {selectedText === '' ? (
          <div></div>
        ) : (
          <div className="chat-bubble bg-main">
            {/* AI 검색 중인 경우, 로딩 스피너 */}
            {isLoadingAISearchResult ? (
              <div className="flex flex-col text-white">
                <div className="flex items-center gap-1">
                  <Image className="pb-2" src="/chatgpt.svg" alt="logo" width="20" height="20" />
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
        )}
      </div>
    </div>
  );
}
