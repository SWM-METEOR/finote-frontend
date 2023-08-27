'use client';

import TrendsArticleListView from '@/app/components/TrendsArticleList/TrendsArticleListView';
import axiosInstance from '@/utils/axios';
import { useEffect, useState } from 'react';

interface PropsType {
  nickname: string;
}

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

export default function TrendsArticleListContainer() {
  const [trendsArticleData, setTrendsArticleData] = useState<ArticleDataType | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  async function loadMoreTrendsArticles() {
    if (!hasMoreItems) return;

    try {
      const res = await axiosInstance.get(`/trend-articles?page=${page}&size=${10}`);
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
      setPage((prevPage) => prevPage + 1);
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
    />
  );
}
