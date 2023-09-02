import RelatedArticlesView from '@/components/RelatedArticles/RelatedArticlesView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
}

async function getRelatedArticles(nickname: string, articleTitle: string) {
  try {
    const res = await axiosInstance.get(`/articles/related/${nickname}/${articleTitle}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch article data');
  }
}

// parameter에 { pageParams }: PropsType 추가
export default async function RelatedArticlesContainer({ pageParams }: PropsType) {
  // 데이터 패칭
  const relatedArticlesRes = await getRelatedArticles(pageParams.nickname, pageParams.articleTitle);
  const relatedArticlesData = relatedArticlesRes.data;

  return <RelatedArticlesView relatedArticlesData={relatedArticlesData} />;
}
