// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경

import TechMapContainer from '@/app/components/TechMap/TechMapContainer';

export default function UserHomePage({ params }: { params: { userId: string } }) {
  console.log(params.userId);
  return (
    <div className=" h-full">
      {/* {params.userId} */}
      <TechMapContainer />
    </div>
  );
}
