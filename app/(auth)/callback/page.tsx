'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SyncLoader from 'react-spinners/SyncLoader';

// 구글에서 code를 받아온 뒤 리다이렉트되는 페이지
// 서버로 code를 보내는 작업을 수행
export default function AuthCallbackPage() {
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
      const response = await fetch(`api/users/auth/google?code=${code}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 받아온 응답을 처리
      const responseData = await response.json();
      console.log(responseData);

      // 메인 페이지로 리다이렉트
      router.push('/');

      // TODO: 필요한 작업 수행
    } catch (error) {
      console.error('Error sending code to backend', error);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <SyncLoader color="#00A1FF" />
      <p>로그인 중입니다.</p>
    </div>
  );
}
