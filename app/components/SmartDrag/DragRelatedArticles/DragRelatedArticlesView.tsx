import IntroContainer from '@/app/components/SmartDrag/Intro/IntroView';
import ArticleBoxContainer from '@/app/components/ArticleBox/ArticleBoxContainer';
interface PropsType {
  selectedText: string;
}

export default function DragRelatedArticlesView({ selectedText }: PropsType) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        {selectedText === '' ? (
          <IntroContainer />
        ) : (
          <>
            <div className="chat chat-end mb-[12px]">
              <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
                {selectedText}
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <ArticleBoxContainer />
              <ArticleBoxContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
