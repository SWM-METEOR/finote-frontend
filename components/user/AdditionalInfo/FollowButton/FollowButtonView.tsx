import PlusIcon from '@/components/Icons/PlusIcon';

interface PropsType {
  followUser: () => void;
  unfollowUser: () => void;
  isFollowing: boolean;
}

export default function FollowButtonView({ followUser, unfollowUser, isFollowing }: PropsType) {
  console.log(isFollowing);
  return (
    <button
      className="flex items-center justify-center gap-[3px] w-[55px] h-[20px] text-[#666666] border border-[#00A1FF] rounded-[6px] text-[10px]"
      onClick={isFollowing ? unfollowUser : followUser}
    >
      {isFollowing ? (
        <span className="text-[#00A1FF]">팔로우중</span>
      ) : (
        <>
          <PlusIcon width={8} height={8} color="#00A1FF" />
          <span className="text-[#00A1FF]">팔로우</span>
        </>
      )}
    </button>
  );
}
