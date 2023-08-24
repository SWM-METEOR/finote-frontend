'use client';

import Image from 'next/image';
import GreaterThanIcon from '@/app/components/Icons/GreaterThanIcon';
import HeartIcon from '@/app/components/Icons/HeartIcon';
import CommentIcon from '@/app/components/Icons/CommentIcon';

interface PropsType {
  id: number;
  title: string;
  body: string;
  totalLike: number;
  reply: number;
  authorNickname: string;
  date: string;
  thumbnail: string;
}

export default function MyArticleBox({
  title,
  body,
  totalLike,
  reply,
  date,
  thumbnail,
}: PropsType) {
  return (
    <div className="w-[488px] h-[178px] bg-white rounded-[20px] p-[20px] border border-[#EEEEEE] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
      <div className="flex gap-[20px]">
        <div className="relative w-[140px] h-[140px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image fill className="object-cover" src={thumbnail} alt="logo" sizes="100%" />
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="flex text-[13px] gap-1 items-center">
            <span>CS</span>
            <GreaterThanIcon />
            <span className="text-[#666666] font-bold">네트워크</span>
          </p>
          <p className="text-[15px] font-bold line-clamp-1">{title}</p>
          <div className="text-[#666666] text-[12px] line-clamp-2">{body}</div>
          <p className="flex items-center mt-[8px] text-[13px]">
            <HeartIcon />
            <span className={`text-[#666666] ml-[2px] mr-[10px]`}>{totalLike}</span>
            <CommentIcon />
            <span className={`text-[#666666] ml-[2px]`}>{reply}</span>
            <span className={`text-[#999999] text-[12px] ml-auto`}>{date}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
