import Image from 'next/image';
import HeartIcon from '@/components/Icons/HeartIcon';
import CommentIcon from '@/components/Icons/CommentIcon';

import { feedType } from '@/types/feed';

interface PropsType {
  feedList: feedType[];
}

export default function FeedListView({ feedList }: PropsType) {
  return (
    <div className="px-[80px] w-full h-full mt-[40px]">
      {feedList.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <span className="text-[20px] font-medium">새 소식이 없습니다.</span>
        </div>
      ) : (
        feedList.map((feed) => (
          <div key={feed.id}>
            <div className="flex flex-col justify-between w-full h-[160px] bg-white rounded-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] p-[25px] border border-[#EEEEEE] mb-[30px]">
              <div className="flex gap-[8px] items-center mb-[15px]">
                <div className="w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
                  <Image src={feed.profileImageUrl} alt={''} width="30" height="30" />
                </div>
                <span className="text-[14px] font-medium">{feed.nickname}</span>
                <span className="text-[13px] font-medium text-[#999999]">{feed.date}</span>
              </div>
              <h1 className="font-bold text-[20px] mb-[10px]">{feed.title}</h1>
              <div className="flex items-center gap-[2px]">
                <HeartIcon />
                <span className={`text-[#666666] ml-[2px] mr-[8px]`}>{feed.like}</span>
                <CommentIcon />
                <span className={`text-[#666666] ml-[2px]`}>{feed.reply}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
