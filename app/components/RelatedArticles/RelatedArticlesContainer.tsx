import RelatedArticlesView from '@/app/components/RelatedArticles/RelatedArticlesView';
// import axiosInstance from '@/utils/axios';
import { relatedArticlesData } from '@/constants/mockdata';

// interface PropsType {
//   pageParams: { id: string };
// }

// async function getRelatedArticles(id: string) {
//   try {
//     const res = await axiosInstance.get(`/articles/related/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch article data');
//   }
// }

// parameter에 { pageParams }: PropsType 추가
export default async function RelatedArticlesContainer() {
  // 데이터 패칭
  // const relatedArticlesRes = await getRelatedArticles(pageParams.id);
  // const relatedArticlesData = relatedArticlesRes.data;

  return <RelatedArticlesView relatedArticlesData={relatedArticlesData} />;
}
