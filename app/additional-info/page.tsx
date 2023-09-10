'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

import axiosInstance from '@/utils/axios';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';
import InputNickname from '@/components/AdditionalInfo/InputNickname';
import InputBlogName from '@/components/AdditionalInfo/InputBlogName';

interface AdditionalInfoType {
  profileImageUrl: string;
  nickname: string;
  blogName: string;
}

export default function AdditionalInfoPage({ params }: { params: { nickname: string } }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdditionalInfoType>();

  const onSubmit: SubmitHandler<AdditionalInfoType> = (data) => {
    console.log(data);
    axiosInstance
      .post('users/additional-info', data)
      .then((res) => {
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
            <ImageUpload register={register} />
          </div>
          <InputNickname register={register} />
          <InputBlogName register={register} />
          <div className="mb-[15px]">
            <Button
              type={"submit"}
              width={500}
              height={50}
              fillColor="main"
              textColor="white"
              roundRate={15}
            >
              저장하기
            </Button>
          </div>
          <Link href="/" className="mb-[40px]">
            <Button
              width={500}
              height={50}
              fillColor="lightGrey"
              textColor="darkGrey"
              roundRate={15}
            >
              다음에 할게요
            </Button>
          </Link>
          <p className="self-center text-[14px] text-[#666666]">
            추후 마이페이지에서 변경 가능합니다.
          </p>
        </div>
      </div>
    </form>
  );
}
