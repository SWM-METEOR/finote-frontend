// 댓글
export interface replyType {
  id: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  createdDate: string;
  isMine: boolean;
}

// 댓글 리스트
export interface replyListType {
  replyList: replyType[];
}

// 답변
export interface answerType {
  id: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  createdDate: string;
  isMine: boolean;
  isLiked: boolean; // TODO: 임시로 한 것, 추후 수정 필요
}

// 답변 리스트
export interface answerListType {
  answerList: answerType[];
}

export type CommentListType<T> = T extends 'reply' ? replyListType : answerListType;
