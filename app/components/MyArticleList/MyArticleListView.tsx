import MyArticleBox from '@/app/components/MyArticleList/MyArticleBox';
export default function MyArticleListView() {
  return (
    <div className="w-[1000px] mt-[40px]">
      <p className="text-[20px] font-bold">전체보기</p>
      <hr className="mt-[15px] w-full text-black mb-[30px]" />
      <div className="grid grid-cols-2 gap-[20px]">
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
        <MyArticleBox />
      </div>
    </div>
  );
}
