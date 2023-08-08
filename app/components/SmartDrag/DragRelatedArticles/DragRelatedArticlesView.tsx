import IntroView from '@/app/components/SmartDrag/Intro/IntroView';

interface PropsType {
  selectedText: string;
}

export default function DragRelatedArticlesView({ selectedText }: PropsType) {
  return (
    <div className="w-full py-4 flex flex-col gap-4">
      {/* 선택한 텍스트 */}
      <div className="chat chat-end">
        <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
          {selectedText === ''
            ? `드래그한 내용과 관련된\n블로그 글을 추천받을 수 있습니다.`
            : `${selectedText}`}
        </div>
      </div>
      <div>
        {selectedText === '' ? <div></div> : <div className="bg-main">관련 아티클 리스트</div>}
      </div>
    </div>
  );
}
