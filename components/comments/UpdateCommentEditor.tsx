'use client';

import React, { useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import useToast from '@/hooks/toast';
import { ServerErrorResponse } from '@/types/error';

interface PropsType {
  type: 'reply' | 'answer';
  commentId: number;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const placeHolder = {
  reply: '댓글을 수정하세요!',
  answer: '답변을 수정하세요!',
};

export default function UpdateCommentEditor({ type, commentId, setIsUpdateMode }: PropsType) {
  const [showErrorToast] = useToast();
  const queryClient = useQueryClient();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [charCount, setCharCount] = useState(0); // 글자 수

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;

    // 입력값을 500자로 제한
    if (textValue.length > 500) {
      e.target.value = textValue.slice(0, 500);
      setCharCount(500);
      return;
    }

    setCharCount(textValue.length);
  };

  const updateCommentMutation = useMutation(
    (textValue: string) => {
      const requestUrl = {
        reply: `/articles/replies/edit/${commentId}`,
        answer: '/answers',
      };

      return axiosInstance.post(requestUrl[type], {
        content: textValue,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']);
        // 페이지 새로고침
        setIsUpdateMode(false);
      },
      onError: (err: AxiosError<ServerErrorResponse>) => {
        if (!err.response) {
          return;
        }
      },
    }
  );

  const updateComment = () => {
    const textValue = textAreaRef.current?.value;

    if (!textValue) {
      return;
    }
    updateCommentMutation.mutate(textValue);
  };

  return (
    <div className="flex flex-col w-full rounded-[10px] border border-[#DDDDDD] bg-white mt-[10px]">
      <textarea
        ref={textAreaRef}
        onChange={handleTextChange}
        placeholder={placeHolder[type]}
        className="w-full rounded-[10px] min-h-[100px] h-[70px] p-[20px] focus:outline-none active:outline-none"
      ></textarea>
      <div className="w-full h-[36px] flex items-center px-[10px] my-[10px]">
        <div className="text-[#999999] text-sm mt-auto">{charCount} / 500자</div>
        <button
          className="ml-auto bottom-5 right-5 bg-[#00A1FF] h-[36px] w-[80px] rounded-[5px] text-white font-semibold text-[15px]"
          onClick={updateComment}
        >
          수정
        </button>
      </div>
    </div>
  );
}
