// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경

import RelatedArticlesContainer from '@/app/components/RelatedArticles/RelatedArticlesContainer';
import SidePanelContainer from '@/app/components/SmartDrag/SidePanel/SidePanelContainer';
import ArticleContainer from '@/app/components/Article/ArticleContainer';
import HeartIcon from '@/app/components/Icons/HeartIcon';
import ShareIcon from '@/app/components/Icons/ShareIcon';

interface PropsType {
  params: { id: string };
}
export default function ArticlePage({ params }: PropsType) {
  return (
    <div className="relative flex flex-nowrap flex-row largeDesktop:justify-center h-full">
      {/* 좌측 좋아요 이동 바 */}
      <div className="fixed top-[130px] largeDesktop:left-[calc(50%-638px)] 2xl:left-[calc(14%)] xl:left-[calc(12%)] lg:left-[calc(7%)] shrink-0 flex flex-col items-center w-[70px] h-[136px] bg-white mr-[30px] rounded-[15px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] pt-[16px] pb-[16px] border border-[#EEEEEE]">
        <HeartIcon width={24} height={24} strokeColor={'#999999'} />
        <span className="text-[#999999] mt-[2px]">0</span>
        <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
        <div className="mt-auto">
          <ShareIcon />
        </div>
      </div>
      {/* 본문 영역 */}
      {/* 좌측 마진값 조정 breakpoint - 2xl, xl, lg */}
      {/* 본문 영역 크기 breakpoint - largeDesktop, desktop */}
      <div className="2xl:ml-1/5 xl:ml-1/5 lg:ml-1/7 largeDesktop:w-[1078px] desktop:w-1/2 tablet:w-full mobile:w-full bg-white border border-[#EEEEEE] rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.05)] p-[40px]">
        <ArticleContainer pageParams={params} />
        <hr className="w-full text-[#DDDDDD] mt-[10px]" />
        <RelatedArticlesContainer pageParams={params} />
      </div>
      <SidePanelContainer />
    </div>
  );
}
