export interface feedType {
  id: number;
  profileImageUrl: string;
  title: string;
  nickname: string;
  date: string;
  like: number;
  reply: number;
}

export interface feedListType {
  feedList: feedType[];
}
