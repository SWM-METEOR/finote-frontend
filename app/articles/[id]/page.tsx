import SidePanel from '@/app/components/SidePanel';
import Article from '@/app/components/Article';
import SidePanelWrapper from '@/app/components/SidePanelWrapper';
// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경
import ArticleContainer from '@/app/components/Article/ArticleContainer';
export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="overflow-hidden flex flex-row justify-between h-full">
      {/* 본문 영역 */}
      <ArticleContainer pageId={params.id} />
      <SidePanelWrapper>
        <SidePanel />
      </SidePanelWrapper>
    </div>
  );
}
