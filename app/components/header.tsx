'use client';

import Link from 'next/link';
import Image from 'next/image';

import SearchBar from './searchBar';

import { usePathname } from 'next/navigation';

// TODO: 리소스 경로 관리
export default function Header() {
  const pathname = usePathname();

  return (
    <div>
      {/* 로그인 페이지에는 헤더 X */}
      {pathname !== '/login' && (
        // items-center: 수직 방향 중앙 정렬
        // justify-between: 양 끝 배치
        // header height: 76px
        <div>
          <header className="h-[76px] flex justify-between bg-white shadow-lg px-8 py-2 items-center">
            <Link href="/">
              <Image className="pb-2" src="/logo.svg" alt="logo" width="160" height="76" />
            </Link>
            {/* 검색창 */}
            <SearchBar />
            <Link href="/login">
              <span className="pl-28 pr-12">로그인</span>
            </Link>
          </header>
        </div>
      )}
    </div>
  );
}
