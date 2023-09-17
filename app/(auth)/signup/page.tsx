'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

import axiosInstance from '@/utils/axios';
import CustomButton from '@/components/common/CustomButton';
import InputEmail from '@/components/user/SignUp/InputEmail';
import InputPassword from '@/components/user/SignUp/InputPassword';
import useToast from '@/hooks/toast';
import SignUpType from '@/types/user';

export default function JoinPage() {
  const router = useRouter();
  const [showErrorToast] = useToast();
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpType>();

  const login = (email: string, password: string) => {
    axiosInstance
      .post('users/login/email', { email, password })
      .then((res) => {
        setCookie('accessToken', res.data.data.accessToken);
        setCookie('refreshToken', res.data.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit: SubmitHandler<SignUpType> = (data) => {
    setIsLoadingSignUp(true);
    const { email, password, code } = data;

    axiosInstance
      .post('users/join/email', { email, password, code })
      .then((res) => {
        // 로그인 처리 후 추가정보 설정 페이지로 이동
        login(email, password);
        router.push('/additional-info');
      })
      .catch((err) => {
        showErrorToast('회원 가입에 실패하였습니다.');
        setIsLoadingSignUp(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full">
        <div className="w-[500px] flex flex-col justify-center mx-auto py-[80px]">
          <h1 className="self-center font-bold text-[40px] mb-[50px]">회원가입</h1>
          <p className="font-bold text-[20px] mb-[12px]">이메일로 가입하기</p>
          <div className="w-full h-[2px] bg-black mb-[25px]"></div>
          <InputEmail register={register} watch={watch} setError={setError} errors={errors} />
          <InputPassword register={register} watch={watch} setError={setError} errors={errors} />
          <div className="mb-[15px]">
            <CustomButton
              type={'submit'}
              width={500}
              height={50}
              fillColor="main"
              textColor="white"
              roundRate={15}
            >
              {isLoadingSignUp ? (
                <p className="flex gap-[16px]">
                  <ClipLoader
                    color="#FFFFFF"
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </p>
              ) : (
                <span>가입하기</span>
              )}
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  );
}
