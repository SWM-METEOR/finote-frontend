'use client';

import MyArticleListView from '@/app/components/MyArticleList/MyArticleListView';
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

export default function MyArticleListContainer({ nickname }: PropsType) {
  const [articleData, setArticleData] = useState<ArticleDataType | null>(null);

  useEffect(() => {
    async function getUsersArticles(nickname: string) {
      try {
        const res = await axiosInstance.get(`/articles/${nickname}/all?page=${1}`);
        const articleRes = res.data.data;
        setArticleData(articleRes);
      } catch (error) {
        throw new Error('Failed to fetch article data');
      }
    }

    if (!nickname) return;
    getUsersArticles(nickname);
  }, [nickname]);

  if (!articleData) return null;

  return <MyArticleListView articleList={articleData.articleList} />;
}
