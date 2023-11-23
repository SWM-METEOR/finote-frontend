'use client';

import { useEffect, useState } from 'react';

import LikeArticleListView from '@/components/articles/LikeArticleList/LikeArticleListView';
import axiosInstance from '@/utils/axios';
import { ArticlePreviewType } from '@/types/Article';

interface ArticleDataType {
  page: number;
  size: number;
  articleList: ArticlePreviewType[];
}

export default function LikeArticleListContainer() {
  const [articleData, setArticleData] = useState<ArticleDataType | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const maxReqSize = 10;

  async function loadMoreUsersArticles() {
    if (!hasMoreItems) return;

    try {
      const res = await axiosInstance.get(`/users/articles/like?page=${page}&size=${maxReqSize}`);
      const articleRes = res.data.data;

      if (articleRes.articleList.length === 0) {
        setHasMoreItems(false);
        return;
      }

      if (articleData) {
        setArticleData((prevData) => ({
          ...articleRes,
          articleList: [...(prevData?.articleList || []), ...articleRes.articleList],
        }));
      } else {
        setArticleData(articleRes);
      }
    } catch (error) {
      throw new Error('Failed to fetch article data');
    }
  }

  // initial fetch
  useEffect(() => {
    loadMoreUsersArticles();
  }, []);

  if (!articleData) return null;

  return (
    <LikeArticleListView
      articleList={articleData.articleList}
      loadMoreItems={() => loadMoreUsersArticles()}
      page={page}
      setPage={setPage}
    />
  );
}
