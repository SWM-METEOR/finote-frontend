import React, { useState, useEffect, useRef } from 'react';

import MyArticleBox from '@/components/MyArticleList/MyArticleBox';
// import ClipLoader from 'react-spinners/ClipLoader';

interface PropsType {
  articleList: {
    id: number;
    title: string;
    body: string;
    totalLike: number;
    reply: number;
    authorNickname: string;
    date: string;
    thumbnail: string;
  }[];
  loadMoreItems: () => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function MyArticleListView({
  articleList,
  loadMoreItems,
  page,
  setPage,
}: PropsType) {
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
    <div className="w-[1000px] mt-[40px]">
      <p className="text-[20px] font-bold">전체보기</p>
      <hr className="mt-[15px] w-full text-black mb-[30px]" />
      <div className="grid grid-cols-2 gap-[20px]">
        {articleList.map((article) => (
          <MyArticleBox key={article.id} {...article} />
        ))}
      </div>
      <div ref={observerRef}></div>
      {/* TODO: 로딩 시 스켈레톤 UI 띄울지 여부 확정 */}
      {/* {loading && (
        <div className="h-20 flex justify-center items-center">
          <ClipLoader color="#00A1FF" />
        </div>
      )} */}
    </div>
  );
}
