'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';

import QnAView from '@/components/SmartDrag/QnA/QnAView';
import { useSelectedTextStore } from '@/store/sidePanel';
import { QuestionListType } from '@/types/qna';

export default function QnAContainer() {
  const { selectedText } = useSelectedTextStore();
  const [questionsData, setQuestionsData] = useState<QuestionListType | null>(null);

  async function fetchQuestions() {
    try {
      const res = await axiosInstance.post(`/qna/inline-question-list`, {
        dragText: selectedText,
      });
      const questionRes = res.data.data;
      setQuestionsData(questionRes);
    } catch (error) {
      setQuestionsData(null);
    }
  }

  useEffect(() => {
    if (!selectedText) return;

    fetchQuestions();
  }, [selectedText]);

  return <QnAView selectedText={selectedText} questionList={questionsData?.questionList} />;
}
