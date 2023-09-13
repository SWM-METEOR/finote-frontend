'use client';

import Image from 'next/image';
import HeartIcon from '@/components/Icons/HeartIcon';
import CommentIcon from '@/components/Icons/CommentIcon';
import ArticlePreviewType from '@/types/Article';

export default function RelatedArticleBox({
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
    <div className="w-[488px] h-[178px] bg-white rounded-[20px] border border-[#EEEEEE] p-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] flex-shrink-0">
      <div className="flex gap-[20px]">
        <div className="relative w-[140px] h-[140px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image fill className="object-cover" src={thumbnail} alt="logo" sizes="100%" />
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <p className="text-[15px] font-bold line-clamp-1">{title}</p>
          <div className="text-[#666666] text-[12px] line-clamp-3">{body}</div>
          <div className="flex items-center mt-[12px] text-[13px]">
            <div className="w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0 mr-[5px]">
              <Image src={profileImageUrl} alt="writer" width="20" height="20" />
            </div>
            <span className="text-[12px] font-medium mr-[15px]">{authorNickname}</span>
            <HeartIcon />
            <span className={`text-[#666666] ml-[2px] mr-[10px]`}>{totalLike}</span>
            <CommentIcon />
            <span className={`text-[#666666] ml-[2px]`}>{reply}</span>
            <span className={`text-[#999999] text-[12px] ml-auto`}>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
