export interface QuestionType {
  id: number;
  title: string;
  authorNickname: string;
  profileImageUrl: string;
  createdDate: string;
  totalAnswer: number;
}
export interface QuestionListType {
  questionList: QuestionType[];
}
