import Image from 'next/image';

export default function IntroView() {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[16px] font-bold mb-[15px] mt-[141px]">궁금한 내용을 드래그해보세요!</p>
      <p className="text-[14px] text-[#666666] mb-[2px]">드래그한 내용에 대한 AI 검색 결과,</p>
      <p className="text-[14px] text-[#666666] mb-[65px]">
        관련 아티클, 연관 질문을 얻을 수 있습니다.
      </p>
      <Image className="" src="/smart-drag.svg" alt="heart" width="250" height="211" />
    </div>
  );
}
