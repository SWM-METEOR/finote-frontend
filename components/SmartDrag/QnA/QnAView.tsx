import IntroContainer from '@/components/SmartDrag/Intro/IntroContainer';
import QnAEditor from '@/components/SmartDrag/QnA/QnAEditor';

interface PropsType {
  selectedText: string;
}

export default function QnAView({ selectedText }: PropsType) {
  return (
    <div className="w-[320px] flex flex-col gap-4">
      {selectedText === '' ? (
        <IntroContainer />
      ) : (
        <>
          {/* 선택한 텍스트 */}
          <div className="chat chat-end">
            <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
              {selectedText}
            </div>
          </div>
          {/* QnA 검색 결과 */}
          <div className="bg-main h-[280px]">
            <div className="">QnA 리스트</div>
          </div>
          <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
          {/* 질문 입력 창 */}
          <QnAEditor />
        </>
      )}
    </div>
  );
}
