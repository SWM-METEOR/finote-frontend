// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경

import SidePanelContainer from '@/app/components/SmartDrag/SidePanel/SidePanelContainer';
import ArticleContainer from '@/app/components/Article/ArticleContainer';
import HeartIcon from '@/app/components/Icons/HeartIcon';
import ShareIcon from '@/app/components/Icons/ShareIcon';

interface PropsType {
  params: { id: string };
}
export default function ArticlePage({ params }: PropsType) {
  return (
    <div className="overflow-hidden flex flex-row justify-between h-full">
      {/* 좌측 좋아요 이동 바 */}
      <div className="fixed left-[320px] shrink-0 flex flex-col items-center w-[70px] h-[136px] bg-white mr-[30px] rounded-[15px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] pt-[16px] pb-[16px] border border-[#EEEEEE]">
        <HeartIcon width={24} height={24} strokeColor={'#999999'} />
        <span className="text-[#999999] mt-[2px]">0</span>
        <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
        <div className="mt-auto">
          <ShareIcon />
        </div>
      </div>
      {/* 본문 영역 */}
      <ArticleContainer pageParams={params} />
      <SidePanelContainer />
    </div>
  );
}
