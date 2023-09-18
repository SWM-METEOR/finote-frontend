import Link from 'next/link';
import Image from 'next/image';
import HeartIcon from '@/components/Icons/HeartIcon';
import CommentIcon from '@/components/Icons/CommentIcon';
import ArticlePreviewType from '@/types/Article';

export default function DragRelatedArticleBox({
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
    <Link href={`/articles/${authorNickname}/${title}`}>
      <div
        className={`flex flex-col justify-between w-[318px] h-[115px] border border-[#DDDDDD] rounded-[15px] p-[10px]`}
      >
        <div className="flex gap-[10px]">
          <div className="relative w-[60px] h-[60px] rounded-[10px] overflow-hidden flex-shrink-0">
            <Image fill className="object-cover" src={thumbnail} alt="썸네일" sizes="100%" />
          </div>
          <div className="flex flex-col gap-[3px]">
            <p className={`text-[14px] font-bold line-clamp-1`}>{title}</p>
            <p className={`text-[13px] line-clamp-2 text-[#666666]`}>{body}</p>
          </div>
        </div>
        <div className={`flex items-center text-[12px]`}>
          <div className="w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0">
            <Image src={profileImageUrl} alt={authorNickname} width="20" height="20" />
          </div>
          <span className={`ml-[5px] mr-[24px]`}>{authorNickname}</span>
          <HeartIcon />
          <span className={`text-[#666666] ml-[2px] mr-[8px]`}>{totalLike}</span>
          <CommentIcon />
          <span className={`text-[#666666] ml-[2px]`}>{reply}</span>
          <span className={`text-[#999999] ml-auto`}>{date}</span>
        </div>
      </div>
    </Link>
  );
}
