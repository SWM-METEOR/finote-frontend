import SidePanel from '@/app/components/SidePanel';
import Article from '@/app/components/Article';
import SidePanelWrapper from '@/app/components/SidePanelWrapper';

// TODO: 추후 API와 연동 시 작가ID/글 제목으로 라우팅 변경

export default async function ArticlePage({ params }: { params: { id: string } }) {
  async function getData() {
    // 절대 경로 사용 이유: 서버 사이드 코드라서 rewrites가 안되는 것으로 추정
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params.id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  const resData = await getData();
  const { title, body, createDate, authorNickname } = resData.data;

  return (
    <div className="overflow-hidden flex flex-row justify-between h-full">
      {/* 본문 영역 */}
      <div className="overflow-auto w-full">
        {/* 본문 영역은 반응형 breakpoint -> md 아니고 lg임 */}
        <div className="flex flex-col gap-4 my-24 px-12 lg:px-48 w-full max-w-full">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-darkGrey">
            <span>{authorNickname}</span>
            <span className="border-l-2 border-grey ml-2 pl-2">{createDate}</span>
          </p>
          <hr className="w-full" />
          <div className="w-full max-w-4xl self-center py-10 text-lg">
            <Article contents={body} />
          </div>
        </div>
      </div>
      <SidePanelWrapper>
        <SidePanel />
      </SidePanelWrapper>
    </div>
  );
}
