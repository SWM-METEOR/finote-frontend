'use client';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LikeView from '@/components/Like/LikeView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  authorNickname: string;
  title: string;
}

export default function LikeContainer({ authorNickname, title }: PropsType) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const accessToken = getCookie('accessToken');

  // 글에 대한 좋아요 여부 체크
  function checkUserLikesArticle(authorNickname: string, title: string) {
    // 비로그인 유저
    if (!accessToken) {
      return;
    }

    axiosInstance
      .get(`/articles/check-like/${authorNickname}/${title}`)
      .then((res) => {
        setIsLiked(res.data.data.liked);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setLikeCount(authorNickname: string, title: string) {
    // TODO: API가 아직 안나와서, 추후 추가 필요
  }

  function handleLike() {
    // 비로그인 유저는 좋아요 불가
    if (!accessToken) {
      toast.error('로그인 후 이용가능합니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    // positive update
    setLikeCnt(isLiked ? likeCnt - 1 : likeCnt + 1);
    setIsLiked(!isLiked);

    axiosInstance
      .post(`/articles/like/${authorNickname}/${title}`)
      .then((res) => {
        // 유지
      })
      .catch((err) => {
        console.log(err);
        // positive update한 내용 원상복구
        setLikeCnt(isLiked ? likeCnt - 1 : likeCnt + 1);
        setIsLiked(!isLiked);

        toast.error('좋아요 반영에 실패했습니다.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  }

  useEffect(() => {
    checkUserLikesArticle(authorNickname, title);
    setLikeCount(authorNickname, title);
  }, []);

  return (
    <>
      <ToastContainer />
      <LikeView likeCount={likeCnt} isLiked={isLiked} handleLike={handleLike} />
    </>
  );
}
