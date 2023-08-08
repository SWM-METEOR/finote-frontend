// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경

import SidePanelContainer from '@/app/components/SmartDrag/SidePanel/SidePanelContainer';
import ArticleContainer from '@/app/components/Article/ArticleContainer';

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="overflow-hidden flex flex-row justify-between h-full">
      {/* 본문 영역 */}
      <ArticleContainer pageId={params.id} />
      <SidePanelContainer />
    </div>
  );
}
