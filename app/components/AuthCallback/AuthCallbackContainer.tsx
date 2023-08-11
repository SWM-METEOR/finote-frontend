'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthCallbackView from '@/app/components/AuthCallback/AuthCallbackView';

// 서버로 code를 보내는 작업을 수행
export default function AuthCallbackContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      sendCodeToServer(code);
    }
  }, [code]);

  const sendCodeToServer = async (code: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/auth/google?code=${code}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 받아온 응답을 처리
      const responseData = await response.json();
      // console.log(responseData);

      // JWT 토큰 저장
      setCookie('accessToken', responseData.data.accessToken);
      setCookie('refreshToken', responseData.data.refreshToken);

      if (responseData.data.newUser) {
        router.push('/addtional-info');
      }

      // 메인 페이지로 리다이렉트
      router.push('/');
    } catch (error) {
      // TODO: 필요한 작업 수행
      console.error('Error sending code to backend', error);
    }
  };

  return <AuthCallbackView />;
}
