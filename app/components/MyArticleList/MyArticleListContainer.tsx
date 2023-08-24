import MyArticleListView from '@/app/components/MyArticleList/MyArticleListView';
// import axiosInstance from '@/utils/axios';
import { articleData } from '@/constants/mockdata';
// async function getUsersArticles() {
//   try {
//     const res = await axiosInstance.get(`/users/articles/all?page=${1}`);
//     return res.data;
//   } catch (error) {
//     throw new Error('Failed to fetch article data');
//   }
// }

export default async function MyArticleListContainer() {
  // 데이터 패칭
  // const articleRes = await getUsersArticles();
  // const articleData = articleRes.data;
  // console.log(articleData);

  return <MyArticleListView articleList={articleData.articleList} />;
}
