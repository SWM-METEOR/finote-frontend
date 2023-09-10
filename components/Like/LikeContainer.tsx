'use client';
import { useState, useEffect } from 'react';
import LikeView from '@/components/Like/LikeView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  authorNickname: string;
  title: string;
}

export default function LikeContainer({ authorNickname, title }: PropsType) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);

  // 글에 대한 좋아요 여부 체크
  function checkUserLikesArticle(authorNickname: string, title: string) {
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
        // TODO: 좋아요 반영에 실패했습니다 alert
        setLikeCnt(isLiked ? likeCnt - 1 : likeCnt + 1);
        setIsLiked(!isLiked);
      });
  }

  useEffect(() => {
    checkUserLikesArticle(authorNickname, title);
    setLikeCount(authorNickname, title);
  }, []);

  return <LikeView likeCount={likeCnt} isLiked={isLiked} handleLike={handleLike} />;
}
