'use client';

import React, { useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import useToast from '@/hooks/toast';
import { ServerErrorResponse } from '@/types/error';

export default function QnAEditor() {
  const [showErrorToast] = useToast();
  const queryClient = useQueryClient();

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);

  // 글자 수
  const [titleLength, setTitleLength] = useState(0);
  const [contentsLength, setContentsLength] = useState(0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;

    // 입력값을 500자로 제한
    if (textValue.length > 500) {
      e.target.value = textValue.slice(0, 500);
      setTitleLength(500);
      return;
    }

    setTitleLength(textValue.length);
  };

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;

    // 입력값을 50자로 제한
    if (textValue.length > 50) {
      e.target.value = textValue.slice(0, 50);
      setContentsLength(50);
      return;
    }

    setContentsLength(textValue.length);
  };

  const registerQuestionMutation = useMutation(
    ({ titleValue, contentsValue }: { titleValue: string; contentsValue: string }) => {
      return axiosInstance.post(`/qna/write`, {
        title: titleValue,
        body: contentsValue,
      });
    },
    {
      onSuccess: () => {
        titleRef.current!.value = '';
        contentsRef.current!.value = '';

        setTitleLength(0);
        setContentsLength(0);

        queryClient.invalidateQueries(['question']);
        console.log('질문 등록 성공');
      },
      onError: (err: AxiosError<ServerErrorResponse>) => {
        if (!err.response) {
          return;
        }

        const errorStatus = err.response.data.status;
        // 비로그인 유저
        if (errorStatus === 401) {
          showErrorToast('로그인 후 이용가능합니다.');
        }
      },
    }
  );

  const registerQuestion = () => {
    const titleValue = titleRef.current?.value;
    const contentsValue = contentsRef.current?.value;

    if (!titleValue || !contentsValue) {
      return;
    }
    registerQuestionMutation.mutate({ titleValue, contentsValue });
  };

  return (
    <div className="flex flex-col gap-[15px] w-full">
      {/* 질문 제목 */}
      <textarea
        ref={titleRef}
        onChange={handleTitleChange}
        placeholder={'질문 제목을 입력하세요.'}
        className="border border-[#DDDDDD] rounded-[12px] h-[50px] w-[320px] px-[14px] pt-[12px] pb-[20px] focus:outline-none active:outline-none text-[15px] font-medium"
      ></textarea>
      {/* 질문 내용 */}
      <textarea
        ref={contentsRef}
        onChange={handleContentsChange}
        placeholder={'질문 내용을 입력하세요.'}
        className="border border-[#DDDDDD] rounded-[12px] h-[130px] w-[320px] py-[14px] px-[14px] focus:outline-none active:outline-none"
      ></textarea>

      <button
        className="ml-auto bottom-5 right-5 bg-[#00A1FF] h-[50px] w-[320px] rounded-[5px] text-white font-bold text-[16px]"
        onClick={registerQuestion}
      >
        등록
      </button>
    </div>
  );
}
