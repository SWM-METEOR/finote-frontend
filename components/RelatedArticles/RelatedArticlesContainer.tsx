import RelatedArticlesView from '@/components/RelatedArticles/RelatedArticlesView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  pageParams: { nickname: string; articleTitle: string };
}

async function getRelatedArticles(id: string) {
  try {
    const res = await axiosInstance.get(`/articles/related/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch article data');
  }
}

// parameter에 { pageParams }: PropsType 추가
export default async function RelatedArticlesContainer({ pageParams }: PropsType) {
  // 데이터 패칭
  // TODO: API 스펙 변경 후 코드 수정 필요
  // const relatedArticlesRes = await getRelatedArticles(pageParams.id);
  // const relatedArticlesData = relatedArticlesRes.data;

  return null;

  // return <RelatedArticlesView relatedArticlesData={relatedArticlesData} />;
}
