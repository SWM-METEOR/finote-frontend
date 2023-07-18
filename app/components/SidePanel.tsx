'use client';

import { useState } from 'react';
import Image from 'next/image';

// TODO: 리소스 경로 관리
export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // TODO: 사이드패널, 토글 버튼은 PC사이즈 에서만  보임
    <div className="">
      {/* TODO: 아래 영역이 hidden일 때 보이는 문제 해결 필요 */}
      <div className={`md:block hidden flex flex-row h-full relative`}>
        {/* TODO: 헤더에도 shrink-0 적용 필요 */}
        <div
          className={
            `sticky top-0 border-l-2 border-l-grey shrink-0 h-screen` +
            (isOpen ? ` block w-80` : ` hidden w-0`)
          }
        >
          사이드패널
        </div>
        <button
          className={
            `absolute flex justify-center items-center pt-2 border-l-1 border-t-1 border-b-1 border-grey rounded-l-lg bg-main w-12 h-12 mt-6` +
            (isOpen ? ` absolute top-8 -left-12` : ` sticky top-8 -left-30`)
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image className="pb-2" src="/bulb.svg" alt="logo" width="16" height="16" />
        </button>
      </div>
    </div>
  );
}
