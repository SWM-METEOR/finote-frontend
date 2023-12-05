'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import UpdateCommentEditor from '@/components/comments/UpdateCommentEditor';
import { CommentListType } from '@/types/comment';

interface PropsType<T> {
  type: 'reply' | 'answer';
  userNickname: string;
  commentList: T | null;
  updateComment: (params: { commentId: number; updatedContent: string }) => void;
  deleteComment: (commentId: number) => void;
}

export default function CommentListView({
  type,
  userNickname,
  commentList,
  deleteComment,
}: PropsType<CommentListType<'reply' | 'answer'>>) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updatedCommentId, setUpdatedCommentId] = useState<number | null>(null);

  if (!commentList) return null;

  const commentListItems =
    'replyList' in commentList ? commentList.replyList : commentList.answerList;

  if (commentListItems.length === 0) return null;

  const handleUpdateComment = (commentId: number) => {
    if (!isUpdateMode) {
      setIsUpdateMode(true);
      setUpdatedCommentId(commentId);
      return;
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };

  return (
    <div>
      <p className="flex gap-[5px] text-[16px]">
        <span>댓글</span>
        <span className="text-main font-bold">{commentListItems.length}</span>
      </p>
      <hr className="w-full text-[#DDDDDD] mt-[20px]" />
      {commentListItems.map((comment, index) => (
        <React.Fragment key={index}>
          <div className="py-[20px] w-full">
            <div className="flex gap-[10px] items-center">
              <div className="relative w-[30px] h-[30px] rounded-[8px] overflow-hidden flex-shrink-0">
                <Image
                  fill
                  className="object-cover"
                  src={comment.profileImageUrl}
                  alt="logo"
                  sizes="100%"
                />
              </div>
              <Link href={`/user/${comment.nickname}`} className="text-[15px] font-bold">
                {comment.nickname}
              </Link>
              <span className="text-[13px] text-[#999999]">{comment.createdDate}</span>
              {userNickname === comment.nickname && (
                <button
                  className="text-[#999999] font-semibold text-[14px] ml-auto"
                  onClick={() => handleUpdateComment(comment.id)}
                >
                  수정
                </button>
              )}
              {userNickname === comment.nickname && (
                <button
                  className="text-[#999999] font-semibold text-[14px]"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </button>
              )}
            </div>
            {isUpdateMode && updatedCommentId === comment.id ? (
              <UpdateCommentEditor
                type={type}
                commentId={comment.id}
                setIsUpdateMode={setIsUpdateMode}
              />
            ) : (
              <div className="break-words pl-[40px] pt-[11px] w-full">{comment.content}</div>
            )}
          </div>
          <hr className="w-full text-[#DDDDDD]" />
        </React.Fragment>
      ))}
    </div>
  );
}
