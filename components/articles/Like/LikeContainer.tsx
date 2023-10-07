'use client';
import { useState } from 'react';
import { AxiosError } from 'axios';

import { getCookie } from 'cookies-next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation } from '@tanstack/react-query';

import useToast from '@/hooks/toast';
import { ServerErrorResponse } from '@/types/error';
import LikeView from '@/components/articles/Like/LikeView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  authorNickname: string;
  title: string;
}

export default function LikeContainer({ authorNickname, title }: PropsType) {
  const [showErrorToast] = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const accessToken = getCookie('accessToken');

  // 글에 대한 좋아요 여부
  useQuery(
    ['checkUserLikesArticle', authorNickname, title],
    () => axiosInstance.get(`/articles/check-like/${authorNickname}/${title}`),
    {
      enabled: !!accessToken,
      onSuccess: (res) => {
        setIsLiked(res.data.data.liked);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 글의 좋아요 수
  useQuery(
    ['setLikeCount', authorNickname, title],
    () => axiosInstance.get(`/articles/total-like/${authorNickname}/${title}`),
    {
      onSuccess: (res) => {
        setLikeCnt(res.data.data.totalLike);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const mutation = useMutation(
    () => axiosInstance.post(`/articles/like/${authorNickname}/${title}`),
    {
      onSuccess: () => {
        // positive update 상태 유지
      },
      onError: (err: AxiosError<ServerErrorResponse>) => {
        // positive update한 내용 원상복구
        setLikeCnt(isLiked ? likeCnt + 1 : likeCnt - 1);
        setIsLiked(!isLiked);

        if (!err.response) {
          return;
        }

        const errorStatus = err.response.data.status;
        // 비로그인 유저
        if (errorStatus === 401) {
          showErrorToast('로그인 후 이용가능합니다.');
          return;
        }

        showErrorToast('좋아요 반영에 실패했습니다.');
      },
    }
  );

  function handleLike() {
    // positive update
    setLikeCnt(isLiked ? likeCnt - 1 : likeCnt + 1);
    setIsLiked(!isLiked);

    mutation.mutate();
  }

  return (
    <>
      <ToastContainer />
      <LikeView likeCount={likeCnt} isLiked={isLiked} handleLike={handleLike} />
    </>
  );
}
