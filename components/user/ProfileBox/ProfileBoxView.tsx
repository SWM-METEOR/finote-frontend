import Image from 'next/image';

interface PropsType {
  nickname: string;
  followerCount: number;
  profileImageUrl: string;
}

export default function ProfileBoxView({ nickname, followerCount, profileImageUrl }: PropsType) {
  return (
    <div
      className={`flex-shrink-0 w-[240px] h-[286px] flex flex-col items-center bg-white rounded-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]`}
    >
      <div className="w-[120px] h-[120px] rounded-[10px] overflow-hidden flex-shrink-0 mt-[40px]">
        <Image src={profileImageUrl} alt="logo" width="120" height="120" />
      </div>
      <p className={`text-[16px] font-bold mt-[15px] mb-[20px]`}>{nickname}</p>
      <div className="flex items-center w-[180px] h-[42px] rounded-[8px] bg-[#F4F5F7] px-[25px]">
        <span className="text-[#333333] text-[14px] font-medium">팔로워</span>
        <span className="text-[#00A1FF] text-[14px] font-bold ml-auto">{followerCount}</span>
      </div>
    </div>
  );
}
