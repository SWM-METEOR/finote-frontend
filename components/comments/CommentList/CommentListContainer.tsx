'use client';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import CommentListView from '@/components/comments/CommentList/CommentListView';
import { CommentListType } from '@/types/comment';

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
  type: 'reply' | 'answer';
}

export default function CommentListContainer({ pageParams, type }: PropsType) {
  const requestUrl = {
    reply: `/articles/replies/${pageParams.nickname}/${pageParams.articleTitle}`,
    answer: '/answers',
  };

  const fetchCommentList = async () => {
    const res = await axiosInstance.get(requestUrl[type]);
    return res.data.data;
  };

  const {
    data: commentList,
    isError,
    isLoading,
  } = useQuery<CommentListType<typeof type>>(['comments', type, pageParams], fetchCommentList, {
    staleTime: 0,
  });

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return <CommentListView commentList={commentList} />;
}
