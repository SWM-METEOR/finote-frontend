import RelatedArticlesContainer from '@/components/articles/RelatedArticles/RelatedArticlesContainer';
import SidePanelContainer from '@/components/SmartDrag/SidePanel/SidePanelContainer';
import ArticleContainer from '@/components/articles/Article/ArticleContainer';

import ShareIcon from '@/components/Icons/ShareIcon';
import LikeContainer from '@/components/articles/Like/LikeContainer';
import CommentEditor from '@/components/comments/CommentEditor';
import CommentListContainer from '@/components/comments/CommentList/CommentListContainer';

interface PropsType {
  params: { nickname: string; articleTitle: string };
}

export default function ArticlePage({ params }: PropsType) {
  return (
    <div className="relative flex flex-nowrap flex-row largeDesktop:justify-center h-full">
      {/* 좌측 좋아요/공유 이동 바 */}
      <div className="main-md:hidden main-sm:hidden block fixed top-[130px] largeDesktop:left-[calc(50%-638px)] 2xl:left-[calc(14%)] xl:left-[calc(12%)] lg:left-[calc(7%)] shrink-0 flex flex-col items-center w-[70px] h-[136px] bg-white mr-[30px] rounded-[15px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] pt-[16px] pb-[16px] border border-[#EEEEEE]">
        <LikeContainer authorNickname={params.nickname} title={params.articleTitle} />
        <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
        <div className="mt-auto">
          <ShareIcon />
        </div>
      </div>
      {/* 본문 영역 */}
      {/* 좌측 마진값 조정 breakpoint - 2xl, xl, lg */}
      {/* 본문 영역 크기 breakpoint - largeDesktop, desktop */}
      <div className="flex flex-col gap-[40px] 2xl:ml-1/5 xl:ml-1/5 lg:ml-1/7 largeDesktop:w-[1078px] desktop:w-1/2 tablet:w-full mobile:w-full">
        <div className="bg-white border border-[#EEEEEE] rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.05)] p-[40px]">
          <ArticleContainer pageParams={params} />
          <hr className="w-full text-[#DDDDDD] mt-[10px]" />
          <RelatedArticlesContainer pageParams={params} />
        </div>
        <CommentEditor pageParams={params} type="reply" />
        <CommentListContainer pageParams={params} type="reply" />
      </div>
      <SidePanelContainer />
    </div>
  );
}
