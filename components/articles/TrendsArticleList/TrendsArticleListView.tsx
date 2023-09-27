import React, { useState, useEffect, useRef } from 'react';

import TrendsArticleBox from '@/components/articles/ArticlePreview/TrendsArticleBox';

import { ArticlePreviewType } from '@/types/Article';

interface PropsType {
  articleList: ArticlePreviewType[];
  loadMoreItems: () => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TrendsArticleListView({
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
    <div className="w-full h-full mt-[40px]">
      <div className="grid grid-cols-3 main-md:grid-cols-2 main-sm:grid-cols-1 gap-[40px]">
        {articleList.map((article) => (
          <TrendsArticleBox key={article.id} {...article} />
        ))}
      </div>
      <div ref={observerRef}></div>
    </div>
  );
}
