import Image from 'next/image';

import IntroContainer from '@/components/SmartDrag/Intro/IntroContainer';
import QnAEditor from '@/components/SmartDrag/QnA/QnAEditor';
import { QuestionType } from '@/types/qna';

interface PropsType {
  selectedText: string;
  questionList: QuestionType[] | undefined;
}

export default function QnAView({ selectedText, questionList }: PropsType) {
  console.log(questionList);
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
          <div className="h-[calc(100vh-655px)] flex flex-col gap-[10px] overflow-y-auto flex-shrink-0">
            {!questionList ? (
              <div></div>
            ) : (
              <>
                {questionList.map((question) => (
                  <div
                    key={question.id}
                    className="flex flex-col p-[14px] flex-shrink-0 bg-[#F7F7F7] w-[320px] h-[120px] border border-[#EEEEEE] rounded-[15px] "
                  >
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0">
                        <Image
                          src={question.profileImageUrl}
                          alt={question.authorNickname}
                          width="20"
                          height="20"
                        />
                      </div>
                      <span className="text-[#333333] text-[12px] font-medium">
                        {question.authorNickname}
                      </span>
                      <span className="ml-[3px] text-[#999999] text-[12px]">
                        {question.createdDate}
                      </span>
                    </div>
                    {/* TODO: 질문 title 말고 본문으로 변경해야 함 */}
                    <div className="text-[#000000] text-[15px] font-medium h-[60px] overflow-y-auto">
                      {question.title}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
          {/* 질문 입력 창 */}
          <QnAEditor />
        </>
      )}
    </div>
  );
}
