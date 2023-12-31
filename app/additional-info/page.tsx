'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import CustomButton from '@/components/common/CustomButton';
import ImageUpload from '@/components/common/ImageUpload';
import InputNickname from '@/components/user/AdditionalInfo/InputNickname';
import InputBlogName from '@/components/user/AdditionalInfo/InputBlogName';
import AdditionalInfoType from '@/types/user';

export default function AdditionalInfoPage({ params }: { params: { nickname: string } }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isValidBlogName, setIsValidBlogName] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
    // errors,
  } = useForm<AdditionalInfoType>();

  const onSubmit: SubmitHandler<AdditionalInfoType> = (data) => {
    if (!data.profileImageUrl) {
      data.profileImageUrl =
        'https://finote-image-bucket.s3.ap-northeast-2.amazonaws.com/finote_logo.png';
    }

    axiosInstance
      .post('users/additional-info', data)
      .then((res) => {
        // 유저 정보(블로그 이름 수정)
        queryClient.invalidateQueries(['blogName']);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full">
        <div className="w-[500px] flex flex-col justify-center mx-auto py-[80px]">
          <h1 className="self-center font-bold text-[40px] mb-[50px]">가입이 완료되었습니다.</h1>
          <p className="font-bold text-[20px] mb-[12px]">추가정보 입력</p>
          <div className="w-full h-[2px] bg-black mb-[25px]"></div>
          <div className="">
            <p className="font-bold text-[14px] mb-[10px]">프로필 이미지</p>
            <ImageUpload<AdditionalInfoType> setValue={setValue} type="profileImageUrl" />
          </div>
          <InputNickname
            register={register}
            watch={watch}
            setError={setError}
            errors={errors}
            setIsValidNickname={setIsValidNickname}
          />
          <InputBlogName
            register={register}
            watch={watch}
            setError={setError}
            errors={errors}
            setIsValidBlogName={setIsValidBlogName}
          />
          <div className="mb-[15px]">
            <CustomButton
              type={'submit'}
              width={500}
              height={50}
              fillColor="main"
              textColor="white"
              roundRate={15}
              isDisabled={!isValidNickname || !isValidBlogName}
            >
              저장하기
            </CustomButton>
          </div>
          <Link href="/" className="mb-[40px]">
            <CustomButton
              width={500}
              height={50}
              fillColor="lightGrey"
              textColor="darkGrey"
              roundRate={15}
            >
              다음에 할게요
            </CustomButton>
          </Link>
          <p className="self-center text-[14px] text-[#666666]">
            추후 마이페이지에서 변경 가능합니다.
          </p>
        </div>
      </div>
    </form>
  );
}
