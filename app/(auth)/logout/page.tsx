'use client';

import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  // 로그아웃 API 호출
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      router.push('/');
    })
    .catch((error) => {
      console.error('로그아웃 실패:', error);
    });

  return <div></div>;
}
