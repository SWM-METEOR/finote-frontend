'use client';

import Link from 'next/link';
import Image from 'next/image';
import GreaterThanIcon from '@/components/Icons/GreaterThanIcon';
import HeartIcon from '@/components/Icons/HeartIcon';
import CommentIcon from '@/components/Icons/CommentIcon';
import { ArticlePreviewType } from '@/types/Article';

export default function TrendsArticleBox({
  title,
  body,
  totalLike,
  reply,
  authorNickname,
  date,
  thumbnail,
  profileImageUrl,
}: ArticlePreviewType) {
  return (
    <div className="w-[400px] h-[210px] bg-white rounded-[20px] p-[25px] pb-[20px] border border-[#EEEEEE] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-between gap-[30px]">
        {/* 좌측영역 */}
        <div className="w-[230px] flex flex-col justify-between">
          <div className="flex flex-col justify-between gap-[10px]">
            <p className="text-[15px] font-bold line-clamp-1">{title}</p>
            <div className="text-[#666666] text-[12px] line-clamp-4 leading-[20px]">{body}</div>
          </div>
          <div className="flex gap-[8px] items-center mt-[11px]">
            {/* 작성자 프로필 사진 */}
            <div className="relative w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
              <Image fill className="object-cover" src={profileImageUrl} alt="logo" sizes="100%" />
            </div>
            <span className="text-[14px] font-medium text-[#333333]">{authorNickname}</span>
            <span className="text-[13px] text-[#999999]">{date}</span>
          </div>
        </div>
        {/* 우측영역 */}
        <div className="flex flex-col gap-[13px] items-end">
          <Link href={`/articles/${authorNickname}/${title}`} className="flex items-center">
            <span className="text-[12px] text-[#666666]">더 보러가기</span>
            <span>
              <GreaterThanIcon width={12} height={12} color="#666666" />
            </span>
          </Link>
          <div className="relative w-[90px] h-[90px] rounded-[15px] overflow-hidden flex-shrink-0">
            <Image fill className="object-cover" src={thumbnail} alt="logo" sizes="100%" />
          </div>
          <p className="flex items-center pt-[7px] text-[13px]">
            <HeartIcon />
            <span className={`text-[#666666] ml-[2px] mr-[10px]`}>{totalLike}</span>
            <CommentIcon />
            <span className={`text-[#666666] ml-[2px]`}>{reply}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
