// 글 작성, 수정 시 필요한 필드
export interface ArticleType {
  title: string;
  body: string;
  thumbnail: string;
}

export interface ArticlePreviewType {
  id: number;
  title: string;
  body: string;
  totalLike: number;
  reply: number;
  authorNickname: string;
  date: string;
  thumbnail: string;
  profileImageUrl: string;
}
