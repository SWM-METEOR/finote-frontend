import { redirect } from 'next/navigation';

export default function Home() {
  // 랜딩페이지로 이동
  redirect('/index.html');
  return <div></div>;
}
