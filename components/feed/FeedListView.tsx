export default function FeedListView() {
  return (
    <div className="w-full h-full mt-[40px] bg-main">
      <div className="w-full h-[280px] bg-white rounded-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
        <div className="flex">
          <span>이미지</span>
          <span>유리</span>
          <span>날짜</span>
        </div>
        <h1>글 제목</h1>
        <article>글 내용</article>
        <hr className="w-full text-[#EEEEEE] mt-[12.5px]" />
        <div>XX님이 댓글을 남김</div>
      </div>
    </div>
  );
}
