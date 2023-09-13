'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import EditButtonView from '@/components/articles/EditButton/EditButtonView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  articleId: number;
  authorNickname: string;
}

export default function EditButtonContainer({ articleId, authorNickname }: PropsType) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    async function getUserNickname() {
      // 비로그인 유저는 닉네임을 가져올 수 없음
      if (!accessToken) return;

      try {
        const res = await axiosInstance.get('/users/nickname');
        const nickname = res.data.data.nickname;

        setNickname(nickname);
        return;
      } catch (error) {
        throw new Error('Failed to fetch user nickname');
      }
    }

    getUserNickname();
  }, []);

  function editArticle() {
    // 수정 페이지로 이동
    router.push(`/edit/${articleId}`);
  }

  return nickname === authorNickname && <EditButtonView editArticle={editArticle} />;
}
