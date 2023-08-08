export default function IntroView() {
  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <div className="chat chat-end">
        <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
          <p>글을 읽다 모르는 내용이 있나요?</p>
          <p>
            궁금한 내용을 <span className="font-bold text-yellow">드래그</span>해보세요!
          </p>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble whitespace-pre-line bg-main text-white">
          <p>
            <span className="font-bold text-yellow">GPT-4</span>의 설명과 함께
          </p>
          <p>관련 아티클을 추천해드립니다!</p>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble bg-main text-white whitespace-pre-line">
          <p>그래도 해결되지 않는 궁금증은</p>
          <p>
            <span className="font-bold text-yellow">Q&A 커뮤니티</span>에 질문해보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
