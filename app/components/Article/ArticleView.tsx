import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';

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
