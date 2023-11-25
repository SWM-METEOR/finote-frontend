'use client';

import Link from 'next/link';
import Image from 'next/image';

import HeartIcon from '@/components/Icons/HeartIcon';
import CommentIcon from '@/components/Icons/CommentIcon';
import { ArticlePreviewType } from '@/types/Article';

export default function MyArticleBox({
  title,
  body,
  totalLike,
  reply,
  date,
  thumbnail,
  nickname,
}: ArticlePreviewType & { nickname: string }) {
  return (
    <Link href={`/articles/${nickname}/${title}`}>
      <div className="w-[488px] h-[178px] bg-white rounded-[20px] p-[20px] border border-[#EEEEEE] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
        <div className="flex gap-[20px]">
          <div className="relative w-[140px] h-[140px] rounded-[20px] overflow-hidden flex-shrink-0">
            <Image fill className="object-cover" src={thumbnail} alt="logo" sizes="100%" />
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <p className="text-[15px] font-bold line-clamp-1">{title}</p>
            <div className="text-[#666666] text-[12px] line-clamp-2">{body}</div>
            <p className="flex items-center mt-auto text-[13px]">
              <HeartIcon />
              <span className={`text-[#666666] ml-[2px] mr-[10px]`}>{totalLike}</span>
              <CommentIcon />
              <span className={`text-[#666666] ml-[2px]`}>{reply}</span>
              <div className={`text-[#999999] text-[12px] ml-auto`}>{date}</div>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
