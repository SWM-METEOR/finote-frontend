import ArticleView from '@/components/Article/ArticleView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
}

// 프로미스 객체를 반환하는 함수
async function getArticle(nickname: string, articleTitle: string) {
  try {
    const res = await axiosInstance.get(`/articles/${nickname}/${articleTitle}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch article data');
  }
}

export default async function ArticleContainer({ pageParams }: PropsType) {
  const articleRes = await getArticle(pageParams.nickname, pageParams.articleTitle);
  const articleData = articleRes.data;

  return (
    <ArticleView
      title={articleData.title}
      authorNickname={articleData.authorNickname}
      createDate={articleData.createDate}
      contents={articleData.body}
    ></ArticleView>
  );
}
