import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './searchBar';

// TODO: 리소스 경로 관리
export default function Header() {
  return (
    // items-center: 수직 방향 중앙 정렬
    // justify-between: 양 끝 배치
    <header className="flex justify-between bg-white shadow-lg px-8 py-2 items-center">
      <Link href="/">
        <Image className="pb-2" src="/logo.svg" alt="logo" width="160" height="76" />
      </Link>
      {/* 검색창 */}
      <SearchBar />
      <Link href="/login">
        <span className="pl-28 pr-12">로그인</span>
      </Link>
    </header>
  );
}
