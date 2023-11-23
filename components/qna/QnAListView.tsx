import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { QuestionType } from '@/types/qna';

interface PropsType {
  qnaList: QuestionType[];
  loadMoreItems: () => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function QnAListView({ qnaList, loadMoreItems, page, setPage }: PropsType) {
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (page === 1) return;

    const loadItems = async () => {
      setLoading(true);
      await loadMoreItems();
      setLoading(false);
    };

    loadItems();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full mt-[40px]">
      <div className="flex flex-col gap-[40px] items-center">
        {qnaList.map((qna) => (
          <div
            key={qna.id}
            className="flex flex-col justify-between w-[970px] h-[200px] bg-white rounded-[20px] border border-[#EEEEEE] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] p-[30px]"
          >
            <div className="font-bold text-[20px] mb-[10px]">{qna.title}</div>
            <div className="text-[13px] text-[#666666] mb-[20px]">{qna.contents}</div>
            <div className="flex justify-between">
              <p className="flex gap-[2px] text-[13px]">
                <span className="text-[#666666]">답변</span>
                <span className="text-[#00A1FF]">{qna.totalAnswer}</span>
              </p>
              <div className="flex items-center gap-[8px]">
                <div className="w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0">
                  <Image
                    src={qna.profileImageUrl}
                    alt={qna.authorNickname}
                    width="30"
                    height="30"
                  />
                </div>
                <span className="text-[#333333] font-medium text-[14px]">{qna.authorNickname}</span>
                <span className="font-medium text-[13px] text-[#999999]">{qna.createdDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
