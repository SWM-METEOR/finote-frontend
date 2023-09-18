'use client';

import WriteIcon from '@/components/Icons/WriteIcon';

export default function WriteButton() {
  return (
    <button className="flex items-center justify-center bg-[#00A1FF] text-[14px] text-white font-bold justify-center px-[20px] py-[11px] w-[103px] h-[40px] gap-[10px] rounded-[10px] hover:shadow transition duration-150">
      <WriteIcon width={16} height={16} color="white" />
      <span>글쓰기</span>
    </button>
  );
}
