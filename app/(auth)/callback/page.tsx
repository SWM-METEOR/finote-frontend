'use client';

import { useEffect } from 'react';
import { useSearchParams, redirect } from 'next/navigation';

// 구글에서 code를 받아온 뒤 리다이렉트되는 페이지
// 서버로 code를 보내는 작업을 수행
export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      sendCodeToServer(code);
    }
  }, [code]);

  const sendCodeToServer = async (code: string) => {
    try {
      const response = await fetch(`api/users/auth/google?code=${code}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420', // TODO: 서버 배포 후 삭제
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 받아온 응답을 처리
      const responseData = await response.json();
      console.log(responseData);

      // 메인 페이지로 리다이렉트
      redirect('/');

      // TODO: 필요한 작업 수행
    } catch (error) {
      console.error('Error sending code to backend', error);
    }
  };

  return <div className="h-full flex justify-center items-center">로그인 중 - 스피너 필요</div>;
}
