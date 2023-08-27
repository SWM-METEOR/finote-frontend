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

  useEffect(() => {
    async function getTrendsArticles() {
      try {
        const res = await axiosInstance.get(`/trend-articles?page=${1}`);
        const articleRes = res.data.data;
        setTrendsArticleData(articleRes);
      } catch (error) {
        throw new Error('Failed to fetch article data');
      }
    }

    getTrendsArticles();
  }, []);

  if (!trendsArticleData) return null;

  return <TrendsArticleListView articleList={trendsArticleData.articleList} />;
}
