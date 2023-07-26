'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/common/button';
import GoogleLoginButton from '@/app/components/GoogleLoginButton';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 여기에 폼 제출 로직을 처리하세요
  };

  const isEmailFilled = email !== '';
  const isPasswordFilled = password !== '';

  // TODO: 이메일 로그인 관련 유효성 처리
  // TODO: input, button 컴포넌트화
  // TODO: 반응형

  return (
    // py: 120px -> 80px
    <div className="bg-lightGrey w-full h-ful md:py-[80px]">
      {/* white box */}
      <div className="flex flex-col gap-4 bg-white md:shadow-lg md:w-[450px] w-full h-[726px] mx-auto px-[40px]">
        {/* 좌우 패딩 40씩 */}
        <div className="mx-auto py-12">
          <Link href="/">
            <Image className="pb-2" src="/logo.svg" alt="logo" width="160" height="76" />
          </Link>
        </div>
        <h2>이메일 로그인</h2>
        <div>
          {/* htmlFor, id 통일 */}
          <label className="text-xs" htmlFor="email text-sm font-medium text-slate-700">
            이메일 주소
          </label>
          <input
            className={`input border border-main appearance-none rounded w-full px-3 py-3 focus focus:outline-none active:outline-none`}
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label className="text-xs" htmlFor="pw">
            비밀번호
          </label>
          <input
            className={`input border border-main appearance-none rounded w-full px-3 py-3 focus focus:outline-none active:outline-none`}
            id="pw"
            name="pw"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* <button className="bg-grey">로그인</button> */}
        {/* TODO: 백그라운드 색, 테두리 색 props로 내려주기 */}
        <Button>
          <span>로그인</span>
        </Button>
        <p className="flex gap-4 justify-center">
          <span>FiNote가 처음이세요?</span>
          <Link href="/" className="text-lightBlue underline underline-offset-1">
            회원가입하기
          </Link>
        </p>
        {/* divider (OR) */}
        <div className="w-full flex flex-row items-center text-grey">
          <hr className="w-full" />
          <span className="mx-auto w-16 px-4 text-sm">OR</span>
          <hr className="w-full" />
        </div>
        <h2>간편 로그인</h2>
        {/* justify-center: 수평 중앙정렬 */}
        {/* items-center: 수직 중앙정렬 */}
        <GoogleLoginButton />
      </div>
    </div>
  );
}
