import { UseFormRegister } from 'react-hook-form';

import AdditionalInfoType from '@/types/user';

interface PropsType {
  register: UseFormRegister<AdditionalInfoType>;
}

export default function InputNickname({ register }: PropsType) {
  return (
    <div className="mb-[25px]">
      <p className="font-bold text-[14px] mb-[10px]">닉네임</p>
      <input
        {...register('nickname')}
        type="text"
        placeholder="최대 10자, 영문, 한글, 숫자 입력 가능"
        className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
      />
    </div>
  );
}
