import ArticleView from '@/app/components/Article/ArticleView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  pageParams: { id: string };
}

// 프로미스 객체를 반환하는 함수
async function getArticle(id: string) {
  try {
    const res = await axiosInstance.get(`/articles/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch article data');
  }
}

export default async function ArticleContainer({ pageParams }: PropsType) {
  const articleRes = await getArticle(pageParams.id);
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
