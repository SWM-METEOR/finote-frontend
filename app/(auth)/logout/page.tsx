'use client';

import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';

export default function LogoutPage() {
  const router = useRouter();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  // 로그아웃 API 호출
  axiosInstance
    .post('/users/logout', { accessToken: accessToken, refreshToken: refreshToken })
    .then(() => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      router.push('/');
    })
    .catch((error) => {
      console.error('로그아웃 실패:', error);
    });

  return <div></div>;
}