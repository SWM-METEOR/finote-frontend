'use client';

import Image from 'next/image';
import HeartIcon from '@/app/components/Icons/HeartIcon';
import CommentIcon from '@/app/components/Icons/CommentIcon';

export default function RelatedArticleBox() {
  return (
    <div className="w-[488px] h-[178px] bg-white rounded-[20px] border border-[#EEEEEE] p-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] flex-shrink-0">
      <div className="flex gap-[20px]">
        <div className="w-[140px] h-[140px] rounded-[20px] overflow-hidden flex-shrink-0">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
            alt="logo"
            width="140"
            height="140"
          />
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <p className="text-[15px] font-bold">next.js로 웹 서비스 만들기</p>
          <div className="text-[#666666] text-[12px] line-clamp-3">
            자바스크립트는 기본적으로 싱글스레드이기 때문에, CPU 코어의 개수와 상관없이 메인
            스레드에서만 작업을 실행한다. 반면, 자바는 멀티스레드
          </div>
          <div className="flex items-center mt-[12px] text-[13px]">
            <div className="w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0 mr-[5px]">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
                alt="writer"
                width="20"
                height="20"
              />
            </div>
            <span className="text-[12px] font-medium mr-[15px]">유리</span>
            <HeartIcon />
            <span className={`text-[#666666] ml-[2px] mr-[10px]`}>3</span>
            <CommentIcon />
            <span className={`text-[#666666] ml-[2px]`}>10</span>
            <span className={`text-[#999999] text-[12px] ml-auto`}>2023.08.01</span>
          </div>
        </div>
      </div>
    </div>
  );
}
