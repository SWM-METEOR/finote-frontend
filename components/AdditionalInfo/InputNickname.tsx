'use client';
import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetError, FieldErrors } from 'react-hook-form';

import axiosInstance from '@/utils/axios';
import AdditionalInfoType from '@/types/user';

interface PropsType {
  register: UseFormRegister<AdditionalInfoType>;
  watch: UseFormWatch<AdditionalInfoType>;
  setError: UseFormSetError<AdditionalInfoType>;
  errors: FieldErrors<AdditionalInfoType>;
  setIsValidNickname: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputNickname({
  register,
  watch,
  setError,
  errors,
  setIsValidNickname,
}: PropsType) {
  const nickname = watch('nickname');

  useEffect(() => {
    if (!nickname) return;

    axiosInstance
      .post('/users/validation/nickname', { nickname })
      .then((res) => {
        if (res.data.data.duplicated) {
          setError('nickname', {
            type: 'manual',
            message: '이 닉네임은 이미 사용 중입니다.',
          });
        } else {
          setError('nickname', {}); // 에러 초기화
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nickname]);

  useEffect(() => {
    if (errors.nickname?.message) {
      setIsValidNickname(false);
    } else {
      setIsValidNickname(true);
    }
  }, [nickname, errors.nickname]);

  return (
    <div className="mb-[25px]">
      <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
        <span className="text-red">*</span>
        <span>닉네임</span>
      </p>
      <input
        {...register('nickname', {
          required: '닉네임을 입력해주세요.',
          maxLength: { value: 10, message: '최대 10자까지 입력 가능합니다.' },
          pattern: {
            value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9*\s]+$/,
            message: '영문, 한글, 숫자만 입력 가능합니다.',
          },
        })}
        type="text"
        placeholder="최대 10자, 영문, 한글, 숫자 입력 가능"
        className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
      />
      <p className="text-red pt-1 pl-1">{errors?.nickname?.message}</p>
    </div>
  );
}
