'use client';

import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetError, FieldErrors } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';

import axiosInstance from '@/utils/axios';
import useToast from '@/hooks/toast';
import CustomButton from '@/components/common/CustomButton';
import SignUpType from '@/types/user';

interface PropsType {
  register: UseFormRegister<SignUpType>;
  watch: UseFormWatch<SignUpType>;
  setError: UseFormSetError<SignUpType>;
  errors: FieldErrors<SignUpType>;
}

export default function InputEmail({ register, watch, setError, errors }: PropsType) {
  const [isFetchingAuthCode, setIsFetchingAuthCode] = useState(false); // 인증번호 요청 중인지 여부
  const [isVerifyingAuthCode, setIsVerifyingAuthCode] = useState(false); // 인증번호 검증 중인지 여부
  const [isSuccessVerifyAuthCode, setIsSuccessVerifyAuthCode] = useState(false); // 인증번호 검증 성공 여부
  const [isStartCountdown, setIsStartCountdown] = useState(false); // 카운트다운 시작 여부
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const [showErrorToast, showSuccessToast] = useToast();

  const email = watch('email');
  const code = watch('code');

  const emailRegex = /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let debounceTimeout: NodeJS.Timeout | null = null; // setTimeout 결과 저장용 변수

  const checkEmail = () => {
    // 이전에 예약된 함수 취소
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // 0.4초 디바운스
    debounceTimeout = setTimeout(() => {
      if (!email) return;
      if (!emailRegex.test(email)) {
        setError('email', {
          type: 'manual',
          message: '유효하지 않은 이메일 형식입니다.',
        });
        return;
      }
      setError('email', {}); // 에러 초기화
    }, 200);
  };

  useEffect(() => {
    checkEmail();

    return () => {
      // 이전에 예약된 함수 취소
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [email]);

  const requestAuthCode = () => {
    if (!email) {
      setError('email', {
        type: 'manual',
        message: '이메일을 입력해주세요.',
      });
      return;
    }
    if (!emailRegex.test(email)) {
      setError('email', {
        type: 'manual',
        message: '유효하지 않은 이메일 형식입니다.',
      });
      return;
    }

    setIsFetchingAuthCode(true);
    setIsStartCountdown(true);

    axiosInstance
      .post('/users/issue/email-code', { email })
      .then((res) => {
        setIsFetchingAuthCode(false);
        showSuccessToast('인증번호 발송에 성공했습니다.');
      })
      .catch((err) => {
        setIsFetchingAuthCode(false);
        setIsStartCountdown(false);

        if (err.response.data.code === '400_INVALID_INPUT_VALUE') {
          showErrorToast('유효하지 않은 형식의 이메일입니다.');
          return;
        }
        showErrorToast('인증번호 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  // countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const confirmAuthCode = () => {
    if (!email) {
      showErrorToast('이메일을 입력해주세요.');
      return;
    }
    if (!code) {
      showErrorToast('인증번호를 입력해주세요.');
      return;
    }

    // 인증번호 검증
    setIsVerifyingAuthCode(true);
    axiosInstance
      .post('/users/validation/email-code', { email, code })
      .then((res) => {
        setIsVerifyingAuthCode(false);

        if (res.data.data.valid) {
          setIsSuccessVerifyAuthCode(true);
          return;
        }
        showErrorToast('인증번호가 일치하지 않습니다.');
      })
      .catch((err) => {
        setIsVerifyingAuthCode(false);
        showErrorToast('인증에 실패했습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  return (
    <>
      {/* 이메일 */}
      <div className="flex flex-col mb-[25px]">
        <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
          <span>이메일</span>
        </p>
        <div className="flex gap-[10px]">
          <div className="flex flex-col w-[390px]">
            <input
              {...register('email', {
                required: '이메일을 입력해주세요.',
              })}
              type="email"
              placeholder="이메일을 입력해주세요."
              className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
            />
            <p className="text-red pt-1 pl-1">{errors?.email?.message}</p>
          </div>
          <div className="w-[100px]" onClick={requestAuthCode}>
            <CustomButton
              width={100}
              height={50}
              fillColor="darkGrey"
              textColor="white"
              roundRate={10}
              textSize={14}
            >
              {isFetchingAuthCode ? (
                <span className="flex">
                  <ClipLoader
                    color="#FFFFFF"
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              ) : (
                <span className="w-full">인증요청</span>
              )}
            </CustomButton>
          </div>
        </div>
        {isStartCountdown ? (
          <p className="ml-auto mr-[110px] text-[#666666] pt-1 pl-1">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        ) : null}
      </div>
      {/* 인증번호 */}
      <div className="flex flex-col mb-[25px]">
        <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
          <span>인증번호</span>
        </p>
        <div className="flex gap-[10px]">
          <div className="flex flex-col w-[390px]">
            <input
              {...register('code', {
                required: '인증번호를 입력해주세요.',
              })}
              type="string"
              placeholder="인증번호를 입력해주세요."
              className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
            />
            <p className="text-red pt-1 pl-1">{errors?.code?.message}</p>
            {isSuccessVerifyAuthCode ? (
              <p className="text-green pt-1 pl-1">인증되었습니다.</p>
            ) : null}
          </div>
          <div className="w-[100px]" onClick={confirmAuthCode}>
            <CustomButton
              width={100}
              height={50}
              fillColor="darkGrey"
              textColor="white"
              roundRate={10}
              textSize={14}
            >
              {isVerifyingAuthCode ? (
                <span className="flex">
                  <ClipLoader
                    color="#FFFFFF"
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              ) : (
                <span className="w-full">인증확인</span>
              )}
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
