import React, { useState, useEffect, useRef } from 'react';

import IntroContainer from '@/components/SmartDrag/Intro/IntroView';
import DragRelatedArticleBox from '@/components/articles/ArticlePreview/DragRelatedArticleBox';
import { ArticlePreviewType } from '@/types/Article';

interface PropsType {
  selectedText: string;
  articleList: ArticlePreviewType[] | undefined;
  loadMoreItems: () => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function DragRelatedArticlesView({
  selectedText,
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
    <div className="w-full h-full flex flex-col gap-4">
      {selectedText === '' ? (
        <IntroContainer />
      ) : (
        <div className="flex flex-col w-full h-full">
          <div className="flex-none w-full chat chat-end mb-[12px]">
            <div className="chat-bubble bg-[#313a47] whitespace-pre-line text-white">
              {selectedText}
            </div>
          </div>
          <div className="w-full h-[calc(100vh-356px)] flex-grow flex flex-col gap-[15px] overflow-auto">
            {articleList?.map((article) => (
              <DragRelatedArticleBox key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
