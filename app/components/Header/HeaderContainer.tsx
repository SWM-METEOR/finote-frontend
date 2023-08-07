'use client';
import { usePathname } from 'next/navigation';

import HeaderView from '@/app/components/Header/HeaderView';
import { isLoginStore } from '@/store/auth';
import { useEffect } from 'react';

export default function HeaderContainer() {
  const pathname = usePathname();
  const { isLogin, setIsLogin } = isLoginStore();

  // 로그인에서 안넘어와도, 쿠키값 있으면 로그인 처리
  // 클라이언트 측에서 쿠키 확인 후, 로그인 처리
  // TODO: JWT 방식으로 변경 시 수정 필요
  useEffect(() => {
    async function getLoginStatus() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/check-login-status`);
      if (!res.ok) {
        throw new Error('Failed to fetch login status');
      }
      return res.json();
    }

    // 수정 필요
    async function fetchData() {
      const loginStatusResponse = await getLoginStatus();
      const data = loginStatusResponse.data;
      setIsLogin(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(isLogin);
    console.log('유저 정보 호출해서 받아오기');
  }, [isLogin]);

  return <HeaderView pathname={pathname} isLogin={isLogin} />;
}
