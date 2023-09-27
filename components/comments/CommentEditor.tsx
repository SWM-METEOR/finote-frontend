'use client';

import React, { useRef } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import useToast from '@/hooks/toast';

interface ErrorResponse {
  status: number;
}

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
  type: 'reply' | 'answer';
}

const placeHolder = {
  reply: '댓글을 입력하세요!',
  answer: '답변을 입력하세요!',
};

export default function CommentEditor({ pageParams, type }: PropsType) {
  const [showErrorToast] = useToast();
  const queryClient = useQueryClient();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const writeCommentMutation = useMutation(
    (textValue: string) => {
      const requestUrl = {
        reply: `/articles/replies/write/${pageParams.nickname}/${pageParams.articleTitle}`,
        answer: '/answers',
      };

      return axiosInstance.post(requestUrl[type], {
        content: textValue,
      });
    },
    {
      onSuccess: () => {
        textAreaRef.current!.value = '';
        queryClient.invalidateQueries(['comments', type, pageParams]);
      },
      onError: (err: AxiosError<ErrorResponse>) => {
        if (!err.response) {
          return;
        }

        const errorStatus = err.response.data.status;
        if (errorStatus === 401) {
          showErrorToast('로그인 후 이용가능합니다.');
        }
      },
    }
  );

  const writeComment = () => {
    const textValue = textAreaRef.current?.value;

    if (!textValue) {
      return;
    }
    writeCommentMutation.mutate(textValue);
  };

  return (
    <div className="relative w-full">
      {/* TODO: 500자 수 제한 */}
      <textarea
        ref={textAreaRef}
        placeholder={placeHolder[type]}
        className="w-full border border-[#DDDDDD] min-h-[100px] h-[126px] rounded-[10px] p-[20px] focus:outline-none active:outline-none"
      ></textarea>
      <button
        className="absolute bottom-5 right-5 bg-[#00A1FF] h-[36px] w-[80px] rounded-[5px] text-white font-semibold text-[15px]"
        onClick={writeComment}
      >
        등록
      </button>
    </div>
  );
}
