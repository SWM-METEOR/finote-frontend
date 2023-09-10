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
}

export default function InputBlogName({ register, watch, setError, errors }: PropsType) {
  const blogName = watch('blogName');

  useEffect(() => {
    if (!blogName) return;

    axiosInstance
      .post('/users/validation/blog-name', { blogName })
      .then((res) => {
        if (res.data.data.duplicated) {
          setError('blogName', {
            type: 'manual',
            message: '이 블로그 이름은 이미 사용 중입니다.',
          });
        } else {
          setError('blogName', {}); // 에러 초기화
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogName]);

  return (
    <div className="mb-[25px]">
      <p className="flex gap-[4px] font-bold text-[14px] mb-[10px]">
        <span className="text-red">*</span>
        <span>블로그 이름</span>
      </p>
      <input
        {...register('blogName', {
          required: '블로그 제목을 입력해주세요.',
          maxLength: { value: 10, message: '최대 20자까지 입력 가능합니다.' },
          pattern: {
            value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9*\s]+$/,
            message: '영문, 한글, 숫자만 입력 가능합니다.',
          },
        })}
        type="text"
        placeholder="블로그 이름을 입력해주세요."
        className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
      />
      <p className="text-red pt-1 pl-1">{errors?.blogName?.message}</p>
    </div>
  );
}
