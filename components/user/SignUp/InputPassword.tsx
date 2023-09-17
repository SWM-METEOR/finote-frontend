'use client';

import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetError, FieldErrors } from 'react-hook-form';

import SignUpType from '@/types/user';

interface PropsType {
  register: UseFormRegister<SignUpType>;
  watch: UseFormWatch<SignUpType>;
  setError: UseFormSetError<SignUpType>;
  errors: FieldErrors<SignUpType>;
}

export default function InputPassword({ register, watch, setError, errors }: PropsType) {
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (!confirmPassword) return;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: '입력한 비밀번호와 일치하지 않습니다.',
      });
    } else {
      setError('confirmPassword', {});
    }
  }, [password, confirmPassword]);

  return (
    <>
      {/* 비밀번호 */}
      <div className="mb-[25px]">
        <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
          <span>비밀번호</span>
        </p>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%&*-]).{8,20}$/,
              message:
                '비밀번호는 영문, 숫자, 특수문자(~!@#$%&*-)를 조합한 형태여야 합니다.(최소 8자, 최대 20자)',
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
        />
        <p className="text-red pt-1 pl-1">{errors?.password?.message}</p>
      </div>
      {/* 비밀번호 확인 */}
      <div className="mb-[25px]">
        <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
          <span>비밀번호 확인</span>
        </p>
        <input
          {...register('confirmPassword', {
            required: '비밀번호를 한번 더 입력해주세요.',
          })}
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
        />
        <p className="text-red pt-1 pl-1">{errors?.confirmPassword?.message}</p>
      </div>
    </>
  );
}
