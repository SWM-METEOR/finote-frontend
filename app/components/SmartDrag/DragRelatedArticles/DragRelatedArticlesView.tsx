import IntroContainer from '@/app/components/SmartDrag/Intro/IntroView';
import DragRelatedArticleBox from '@/app/components/SmartDrag/DragRelatedArticles/DragRelatedArticleBox';

interface PropsType {
  selectedText: string;
  articleList: {
    id: number;
    title: string;
    body: string;
    totalLike: number;
    reply: number;
    authorNickname: string;
    date: string;
    thumbnail: string;
  }[];
}

export default function DragRelatedArticlesView({ selectedText, articleList }: PropsType) {
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
            <div className="h-[690px] flex flex-col gap-[15px] pr-[100px] overflow-y-auto ">
              {articleList.map((article) => (
                <DragRelatedArticleBox key={article.id} {...article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
