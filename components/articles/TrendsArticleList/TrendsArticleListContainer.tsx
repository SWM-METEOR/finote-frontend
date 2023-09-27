'use client';

import { useEffect, useState } from 'react';

import TrendsArticleListView from '@/components/articles/TrendsArticleList/TrendsArticleListView';
import axiosInstance from '@/utils/axios';
import { ArticlePreviewType } from '@/types/Article';

// TODO: 인피니티 스크롤 관련 로직 모듈화 필요
interface ArticleDataType {
  page: number;
  size: number;
  articleList: ArticlePreviewType[];
}

export default function TrendsArticleListContainer() {
  const [trendsArticleData, setTrendsArticleData] = useState<ArticleDataType | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const maxReqSize = 30;

  async function loadMoreTrendsArticles() {
    if (!hasMoreItems) return;

    try {
      const res = await axiosInstance.get(`/trend-articles?page=${page}&size=${maxReqSize}`);
      const articleRes = res.data.data;

      if (articleRes.articleList.length === 0) {
        setHasMoreItems(false);
        return;
      }

      if (trendsArticleData) {
        setTrendsArticleData((prevData) => ({
          ...articleRes,
          articleList: [...(prevData?.articleList || []), ...articleRes.articleList],
        }));
      } else {
        setTrendsArticleData(articleRes);
      }
    } catch (error) {
      throw new Error('Failed to fetch article data');
    }
  }

  // initial fetch
  useEffect(() => {
    loadMoreTrendsArticles();
  }, []);

  if (!trendsArticleData) return null;

  return (
    <TrendsArticleListView
      articleList={trendsArticleData.articleList}
      loadMoreItems={loadMoreTrendsArticles}
      page={page}
      setPage={setPage}
    />
  );
}
