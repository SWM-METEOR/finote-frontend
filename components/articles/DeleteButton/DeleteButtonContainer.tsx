'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';

import DeleteButtonView from '@/components/articles/DeleteButton/DeleteButtonView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  articleId: number;
  authorNickname: string;
}

export default function DeleteButtonContainer({ articleId, authorNickname }: PropsType) {
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

  function deleteArticle() {
    Swal.fire({
      title: '정말로 글을 삭제하시겠습니까?',
      text: '삭제한 글은 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      axiosInstance.post(`/articles/delete/${articleId}`);

      if (result.isConfirmed) {
        Swal.fire('삭제 완료', '해당 글은 더 이상 존재하지 않습니다.', 'success').then(() => {
          router.push(`/`);
        });
      }
    });
  }
  return nickname === authorNickname && <DeleteButtonView deleteArticle={deleteArticle} />;
}
