'use client';

import { useEffect, useState } from 'react';

import MyArticleListView from '@/components/articles/MyArticleList/MyArticleListView';
import axiosInstance from '@/utils/axios';
import ArticlePreviewType from '@/types/Article';

interface PropsType {
  nickname: string;
}

interface ArticleDataType {
  page: number;
  size: number;
  articleList: ArticlePreviewType[];
}

export default function MyArticleListContainer({ nickname }: PropsType) {
  const [articleData, setArticleData] = useState<ArticleDataType | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const maxReqSize = 10;

  async function loadMoreUsersArticles(nickname: string) {
    if (!hasMoreItems) return;
    if (!nickname) return;

    try {
      const res = await axiosInstance.get(
        `/articles/${nickname}/all?page=${page}&size=${maxReqSize}`
      );
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
    loadMoreUsersArticles(nickname);
  }, []);

  if (!articleData) return null;

  // nickname값 전달을 위해 익명함수 안에서 호출(클로저)
  return (
    <MyArticleListView
      nickname={nickname}
      articleList={articleData.articleList}
      loadMoreItems={() => loadMoreUsersArticles(nickname)}
      page={page}
      setPage={setPage}
    />
  );
}
