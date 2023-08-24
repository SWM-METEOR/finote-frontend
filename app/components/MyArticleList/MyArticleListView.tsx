import MyArticleBox from '@/app/components/MyArticleList/MyArticleBox';

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

export default function MyArticleListView({ articleList }: PropsType) {
  return (
    <div className="w-[1000px] mt-[40px]">
      <p className="text-[20px] font-bold">전체보기</p>
      <hr className="mt-[15px] w-full text-black mb-[30px]" />
      <div className="grid grid-cols-2 gap-[20px]">
        {articleList.map((article) => (
          <MyArticleBox key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
