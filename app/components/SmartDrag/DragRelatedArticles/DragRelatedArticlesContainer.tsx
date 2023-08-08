import DragRelatedArticlesView from '@/app/components/SmartDrag/DragRelatedArticles/DragRelatedArticlesView';
import { useSelectedTextStore } from '@/store/sidePanel';

export default function DragRelatedArticlesContainer() {
  const { selectedText } = useSelectedTextStore();

  return <DragRelatedArticlesView selectedText={selectedText} />;
}
