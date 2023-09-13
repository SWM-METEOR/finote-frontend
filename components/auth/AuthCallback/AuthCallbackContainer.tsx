'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthCallbackView from '@/components/auth/AuthCallback/AuthCallbackView';
import axiosInstance from '@/utils/axios';

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
    axiosInstance
      .get(`/users/auth/google?code=${code}`)
      .then((res) => {
        // JWT 토큰 저장
        setCookie('accessToken', res.data.data.accessToken);
        setCookie('refreshToken', res.data.data.refreshToken);

        if (res.data.data.newUser) {
          router.push('/addtional-info');
        }

        // 메인 페이지로 리다이렉트
        router.push('/');
      })
      .catch((err) => {
        console.error('Error sending code to backend', err);
      });
  };

  return <AuthCallbackView />;
}
