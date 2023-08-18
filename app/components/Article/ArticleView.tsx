import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import GreaterThanIcon from '@/app/components/Icons/GreaterThanIcon';

interface PropsType {
  title: string;
  authorNickname: string;
  createDate: string;
  contents: string;
  handleDragStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDragEnd: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleTooltipClick: (selectedText: string) => void;
  showTooltip: boolean;
}

export default React.forwardRef<HTMLDivElement, PropsType>(function ArticleView(
  {
    title,
    authorNickname,
    createDate,
    contents,
    handleDragStart,
    handleDragEnd,
    handleTooltipClick,
    showTooltip,
  }: PropsType,
  tooltipRef
) {
  return (
    <div className="w-[1080px] bg-white border border-[#EEEEEE] rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.05)] p-[40px]">
      {/* 본문 영역은 반응형 breakpoint -> md 아니고 lg임 */}
      <div className="flex flex-col gap-4 w-full max-w-full">
        <p className="flex text-[16px] gap-1 items-center">
          <span>프론트엔드</span>
          <GreaterThanIcon />
          <span className="text-[#00A1FF] font-bold">자바스크립트</span>
        </p>
        <h1 className="text-[32px] font-bold">{title}</h1>
        <div className="flex items-center gap-[8px]">
          <div className="w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
              alt="logo"
              width="30"
              height="30"
            />
          </div>
          <span className="text-[14px]">{authorNickname}</span>
          <span className="text-[14px] text-[#999999] ml-[2px]">{createDate}</span>
        </div>
        {/* 카테고리 */}
        <div className="flex items-center gap-[5px]">
          <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
            <span># OAuth</span>
          </button>
          <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
            <span># Spring</span>
          </button>
          <button className="flex items-center min-w-[50px] h-[30px] py-[8px] px-[10px] rounded-[8px] border border-[#DDDDDD] text-[12px] text-[#666666]">
            <span># JAVA</span>
          </button>
        </div>
        <div className="w-full max-w-4xl self-center py-10 text-lg">
          <div className="relative">
            {/* 툴팁 */}
            <div
              ref={tooltipRef}
              className={
                `z-999 w-[250px] absolute flex justify-stretch divide-x divide-grey items-center bg-white border-2 rounded-lg border-grey drop-shadow-xl` +
                (showTooltip ? ' block' : ' hidden')
              }
            >
              {/* TODO: 이벤트 위임 방식으로 변경 */}
              <button
                onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[0])}
                className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-l-md"
              >
                {SIDEPANEL_OPTION_LIST[0]}
              </button>
              <button
                onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[1])}
                className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey"
              >
                {SIDEPANEL_OPTION_LIST[1]}
              </button>
              <button
                onClick={() => handleTooltipClick(SIDEPANEL_OPTION_LIST[2])}
                className="ease-in-out duration-150 py-1 pl-3 pr-3 hover:bg-grey rounded-r-md"
              >
                {SIDEPANEL_OPTION_LIST[2]}
              </button>
            </div>
            <div
              className="w-full"
              onMouseUp={(e) => handleDragEnd(e)}
              onMouseDown={(e) => handleDragStart(e)}
            >
              <ReactMarkdown className="prose prose-slate" remarkPlugins={[remarkGfm]}>
                {contents}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
