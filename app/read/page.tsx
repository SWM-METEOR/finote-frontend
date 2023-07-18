import SidePanel from '@/app/components/SidePanel';
import Article from '@/app/components/Article';

// TODO: 추후 API와 연동 시 작가ID/글번호로 라우팅 변경
export default function ReadPage() {
  return (
    <div className="overflow-hidden flex flex-row justify-between h-full">
      {/* 본문 영역 */}
      <div className="overflow-auto w-full">
        {/* 본문 영역은 반응형 breakpoint -> md 아니고 lg임 */}
        <div className="flex flex-col gap-4 my-24 px-12 lg:px-48 w-full max-w-full">
          <h1 className="text-5xl font-bold">누적합(Prefix Sum)</h1>
          <p className="text-darkGrey">
            <span>춘식이</span> <span>2023.07.12</span>
          </p>
          <hr className="w-full" />
          <div className="max-w-4xl self-center py-10 text-lg">
            <Article />
          </div>
        </div>
      </div>
      <SidePanel />
    </div>
  );
}
