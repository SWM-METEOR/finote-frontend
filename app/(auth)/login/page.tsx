'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import ClipLoader from 'react-spinners/ClipLoader';

import CustomButton from '@/components/common/CustomButton';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import LoginType from '@/types/user';
import useToast from '@/hooks/toast';
import axiosInstance from '@/utils/axios';

export default function LoginPage() {
  const router = useRouter();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [showErrorToast] = useToast();
  const { register, handleSubmit } = useForm<LoginType>();

  const login = (email: string, password: string) => {
    axiosInstance
      .post('users/login/email', { email, password })
      .then((res) => {
        if (!res.data.data.success) {
          showErrorToast('이메일 또는 비밀번호가 일치하지 않습니다.');
          setIsLoadingLogin(false);
          return;
        }

        // 로그인 성공
        setCookie('accessToken', res.data.data.accessToken);
        setCookie('refreshToken', res.data.data.refreshToken);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    setIsLoadingLogin(true);
    const { email, password } = data;
    if (!email || !password) {
      showErrorToast('이메일, 비밀번호를 입력해주세요.');
      return;
    }

    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full py-[80px]">
        {/* white box */}
        <div className="flex flex-col gap-4 bg-white md:shadow-lg w-[450px] h-[726px] mx-auto px-[40px]">
          {/* 좌우 패딩 40씩 */}
          <div className="mx-auto py-12">
            <Link href="/">
              <Image className="pb-2" src="/logo.png" alt="logo" width="160" height="76" />
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
              type="email"
              {...register('email')}
            />
          </div>
          <div>
            <label className="text-xs" htmlFor="pw">
              비밀번호
            </label>
            <input
              className={`input border border-main appearance-none rounded w-full px-3 py-3 focus focus:outline-none active:outline-none`}
              id="password"
              type="password"
              {...register('password')}
            />
          </div>

          <CustomButton type={'submit'} width={370} height={50} hasBorder={true} roundRate={10}>
            {isLoadingLogin ? (
              <p className="flex gap-[16px]">
                <ClipLoader
                  color="#666666"
                  size={24}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </p>
            ) : (
              <span className="font-normal text-[16px]">로그인</span>
            )}
          </CustomButton>
          <p className="flex gap-4 justify-center">
            <span>FiNote가 처음이세요?</span>
            <Link href="/signup" className="text-lightBlue underline underline-offset-1">
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
    </form>
  );
}
