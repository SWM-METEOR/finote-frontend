import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';

import DragRelatedArticlesView from '@/app/components/SmartDrag/DragRelatedArticles/DragRelatedArticlesView';
import { useSelectedTextStore } from '@/store/sidePanel';

interface ArticleDataType {
  page: number;
  size: number;
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

export default function DragRelatedArticlesContainer() {
  const { selectedText } = useSelectedTextStore();
  const [DragRelatedArticlesData, setDragRelatedArticlesData] = useState<ArticleDataType | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const maxReqSize = 10;

  async function loadMoreDragRelatedArticles() {
    if (!hasMoreItems) return;

    try {
      const res = await axiosInstance.post(
        `/articles/drag-related?page=${page}&size=${maxReqSize}`,
        {
          dragText: selectedText,
        }
      );
      const articleRes = res.data.data;

      if (articleRes.articleList.length === 0) {
        setHasMoreItems(false);
        return;
      }

      if (DragRelatedArticlesData) {
        setDragRelatedArticlesData((prevData) => ({
          ...articleRes,
          articleList: [...(prevData?.articleList || []), ...articleRes.articleList],
        }));
      } else {
        setDragRelatedArticlesData(articleRes);
      }
    } catch (error) {
      throw new Error('Failed to fetch drag related article data');
    }
  }

  // initial fetch
  useEffect(() => {
    loadMoreDragRelatedArticles();
  }, []);

  if (!DragRelatedArticlesData) return null;

  return (
    <DragRelatedArticlesView
      selectedText={selectedText}
      articleList={DragRelatedArticlesData.articleList}
      loadMoreItems={loadMoreDragRelatedArticles}
      page={page}
      setPage={setPage}
    />
  );
}
