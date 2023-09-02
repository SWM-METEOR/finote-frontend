import Image from 'next/image';
import TechMapContainer from '@/components/TechMap/TechMapContainer';
import ProfileBoxContainer from '@/components/ProfileBox/ProfileBoxContainer';
import MyArticleListContainer from '@/components/MyArticleList/MyArticleListContainer';

export default function UserHomePage({ params }: { params: { nickname: string } }) {
  // console.log(params.nickname);
  const nickname = decodeURIComponent(params.nickname);

  return (
    <div>
      <div className="flex gap-[40px]">
        <ProfileBoxContainer />
        <TechMapContainer />
      </div>
      <div className="flex">
        <div className="flex flex-col w-[200px] mr-[81px]">
          {/* 좋아요한 글 필터링 버튼 */}
          <button className="flex gap-[8px] items-center justify-center h-[62px] bg-white rounded-[8px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] mb-[40px] text-[16px] font-bold">
            <Image className="" src="/filled-heart.svg" alt="heart" width="16" height="14" />
            <span>좋아요한 글</span>
            <span className="text-[#00A1FF]">6</span>
          </button>
          {/* 카테고리 목록 */}
          <div>
            <span className="text-[#666666] text-[14px] mb-[5px]">카테고리</span>
            <div className="flex flex-col items-start">
              <button className="h-[40px] my-[10px] text-[#333333] text-[16px] font-bold">
                전체(26)
              </button>
            </div>
          </div>
        </div>
        <MyArticleListContainer nickname={nickname} />
      </div>
    </div>
  );
}
