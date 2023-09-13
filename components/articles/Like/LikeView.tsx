'use client';
import HeartIcon from '@/components/Icons/HeartIcon';

interface PropsType {
  likeCount: number;
  isLiked: boolean;
  handleLike: () => void;
}

export default function LikeView({ likeCount, isLiked, handleLike }: PropsType) {
  return (
    <>
      <button type="button" onClick={handleLike}>
        <HeartIcon
          width={24}
          height={24}
          strokeColor={'#999999'}
          isFilled={isLiked}
          canClick={true}
        />
      </button>
      <span className="text-[#999999] mt-[2px]">{likeCount}</span>
    </>
  );
}
