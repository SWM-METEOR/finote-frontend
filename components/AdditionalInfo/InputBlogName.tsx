import { UseFormRegister } from 'react-hook-form';

import AdditionalInfoType from '@/types/user';

interface PropsType {
  register: UseFormRegister<AdditionalInfoType>;
}

export default function InputBlogName({ register }: PropsType) {
  return (
    <div className="mb-[25px]">
      <p className="font-bold text-[14px] mb-[10px]">블로그 이름</p>
      <input
        {...register('blogName')}
        type="text"
        placeholder="블로그 이름을 입력해주세요."
        className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
      />
    </div>
  );
}
