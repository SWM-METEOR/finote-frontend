'use client';
import { useEffect, useState } from 'react';

import { QuestionType } from '@/types/qna';
import axiosInstance from '@/utils/axios';
import QnAListView from '@/components/qna/QnAListView';

interface QnAType {
  page: number;
  size: number;
  questionList: QuestionType[];
}

export default function QnAListContainer() {
  const [qnaData, setQnaData] = useState<QnAType | null>(null);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const maxReqSize = 30;

  async function loadMoreQnA() {
    if (!hasMoreItems) return;

    try {
      const res = await axiosInstance.get(`/qna/question-list?page=${page}&size=${maxReqSize}`);
      const qnaRes = res.data.data;

      if (qnaRes.questionList.length === 0) {
        setHasMoreItems(false);
        return;
      }

      if (qnaData) {
        setQnaData((prevData) => ({
          ...qnaRes,
          qna: [...(prevData?.questionList || []), ...qnaRes.questionList],
        }));
      } else {
        setQnaData(qnaRes);
      }
    } catch (error) {
      throw new Error('Failed to fetch qna data');
    }
  }

  useEffect(() => {
    loadMoreQnA();
  }, []);

  if (!qnaData) return null;

  return (
    <QnAListView
      qnaList={qnaData.questionList}
      loadMoreItems={loadMoreQnA}
      page={page}
      setPage={setPage}
    />
  );
}
