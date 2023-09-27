'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';

import axiosInstance from '@/utils/axios';
import CommentListView from '@/components/comments/CommentList/CommentListView';
import { CommentListType } from '@/types/comment';
import useToast from '@/hooks/toast';
import { ServerErrorResponse } from '@/types/error';

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
  type: 'reply' | 'answer';
}

export default function CommentListContainer({ pageParams, type }: PropsType) {
  const queryClient = useQueryClient();
  const accessToken = getCookie('accessToken');
  const [showErrorToast] = useToast();

  const nicknameQuery = useQuery(
    ['nickname'],
    async () => {
      const res = await axiosInstance.get('/users/nickname');
      return res.data.data.nickname;
    },
    {
      staleTime: Infinity,
      enabled: !!accessToken,
    }
  );

  const fetchCommentList = async () => {
    const requestUrl = {
      reply: `/articles/replies/${pageParams.nickname}/${pageParams.articleTitle}`,
      answer: '/answers',
    };

    const res = await axiosInstance.get(requestUrl[type]);
    return res.data.data;
  };

  const {
    data: commentList,
    isError,
    isLoading,
  } = useQuery<CommentListType<typeof type>>(['comments', type, pageParams], fetchCommentList, {
    staleTime: 0,
  });

  const updateComment = async ({
    commentId,
    updatedContent,
  }: {
    commentId: number;
    updatedContent: string;
  }) => {
    const requestUrl = {
      reply: `/articles/replies/edit/${commentId}`,
      answer: '/answers',
    };

    const res = await axiosInstance.post(requestUrl[type], {
      content: updatedContent,
    });

    return res.data;
  };

  const deleteComment = async (commentId: number) => {
    const requestUrl = {
      reply: `/articles/replies/delete/${commentId}`,
      answer: '/answers',
    };

    let responseData = null;

    await Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: '삭제한 글은 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosInstance.post(requestUrl[type]);
        responseData = res.data;
      }
    });

    return responseData;
  };

  const mutationUpdateComment = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', type, pageParams]);
      console.log('Comment updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating comment:', error);
    },
  });

  const mutationDeleteComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', type, pageParams]);
    },
    onError: (error: AxiosError<ServerErrorResponse>) => {
      if (error.response?.data.code === '400_REPLY_NOT_WRITER') {
        showErrorToast('작성자만 삭제할 수 있습니다.');

        return;
      }
    },
  });

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <CommentListView
      userNickname={nicknameQuery.data || ''}
      commentList={commentList}
      updateComment={mutationUpdateComment.mutate}
      deleteComment={mutationDeleteComment.mutate}
    />
  );
}
