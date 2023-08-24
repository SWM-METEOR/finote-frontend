import DragRelatedArticlesView from '@/app/components/SmartDrag/DragRelatedArticles/DragRelatedArticlesView';
import { useSelectedTextStore } from '@/store/sidePanel';
import { DragRelatedArticlesData } from '@/constants/mockdata';

export default function DragRelatedArticlesContainer() {
  const { selectedText } = useSelectedTextStore();

  return (
    <DragRelatedArticlesView
      selectedText={selectedText}
      articleList={DragRelatedArticlesData.articleList}
    />
  );
}
