export interface QuestionType {
  id: number;
  title: string;
  authorNickname: string;
  profileImageUrl: string;
  createdDate: string;
  contents: string;
  totalAnswer: number;
}
export interface QuestionListType {
  questionList: QuestionType[];
}
