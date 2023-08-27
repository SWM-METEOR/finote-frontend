import TrendsArticleBox from '@/app/components/TrendsArticleList/TrendsArticleBox';

interface PropsType {
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

export default function TrendsArticleListView({ articleList }: PropsType) {
  return (
    <div className="w-full mt-[40px]">
      <div className="grid grid-cols-3 main-md:grid-cols-2 main-sm:grid-cols-1 gap-[40px]">
        {articleList.map((article) => (
          <TrendsArticleBox key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
