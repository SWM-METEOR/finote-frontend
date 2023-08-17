import Image from 'next/image';
import HeartIcon from '@/app/components/Icons/HeartIcon';
import CommentIcon from '@/app/components/Icons/CommentIcon';

export default function ArticleBoxView() {
  return (
    <div
      className={`flex flex-col justify-between w-[320px] h-[115px] border border-[#DDDDDD] rounded-[15px] p-[10px]`}
    >
      <div className="flex gap-[10px]">
        <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
            alt="logo"
            width="60"
            height="60"
          />
        </div>
        <div className="flex flex-col gap-[3px]">
          <p className={`text-[14px] font-bold`}>Next.js로 웹 서비스 만들기</p>
          <p className={`text-[13px] line-clamp-2 text-[#666666]`}>
            Next.js는 리액트 프레임워크이고, Vercel에서 만든것입니다. 최근에 버전 13이 나왔는데요.
            이번에는 Next.js를
          </p>
        </div>
      </div>
      <div className={`flex items-center text-[12px]`}>
        <div className="w-[20px] h-[20px] rounded-[5px] overflow-hidden flex-shrink-0">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
            alt="logo"
            width="20"
            height="20"
          />
        </div>
        <span className={`ml-[5px] mr-[24px]`}>유리</span>
        <HeartIcon />
        <span className={`text-[#666666] ml-[2px] mr-[8px]`}>3</span>
        <CommentIcon />
        <span className={`text-[#666666] ml-[2px]`}>10</span>
        <span className={`text-[#999999] ml-auto`}>2023.08.01</span>
      </div>
    </div>
  );
}
