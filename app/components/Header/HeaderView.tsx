'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import SearchBar from '@/app/components/SearchBar';
import WriteButton from '@/app/components/WriteButton';

interface PropsType {
  accessToken: string;
}

export default function HeaderView({ accessToken }: PropsType) {
  const pathname = usePathname();

  return (
    <>
      {/* 로그인 페이지에는 헤더 X */}
      {pathname !== '/login' && pathname !== '/write' && (
        // items-center: 수직 방향 중앙 정렬
        // justify-between: 양 끝 배치
        // header height: 76px
        <header className="h-[76px] flex justify-between bg-white shadow-lg px-8 py-2 items-center">
          <Link href="/">
            <Image className="pb-2" src="/logo.png" alt="logo" width="160" height="76" />
          </Link>
          <div className="grow">{/* spacer - 빈 공간을 채우기 위한 역할 */}</div>
          {/* 검색창 */}
          <SearchBar />
          <Link href="/write" className="md:pl-12 pl-12">
            <WriteButton color="white" textColor="main" width="small">
              <span>글 작성</span>
            </WriteButton>
          </Link>
          {accessToken === '' ? (
            <Link href="/login">
              <span className="md:px-12 px-8">로그인</span>
            </Link>
          ) : (
            <Link href="/logout">
              <span className="md:px-12 px-8">로그아웃</span>
            </Link>
          )}
        </header>
      )}
    </>
  );
}
