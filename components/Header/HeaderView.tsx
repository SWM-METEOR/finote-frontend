'use client';
import Link from 'next/link';
import Image from 'next/image';

import SearchBarContainer from '@/components/SearchBar/SearchBarContainer';
import WriteButton from '@/components/WriteButton';

interface PropsType {
  blogName: string;
  accessToken: string;
  pathname: string;
}

export default function HeaderView({ blogName, accessToken, pathname }: PropsType) {
  return (
    <div className="w-full flex justify-center shadow-[0_2px_10px_0_rgba(0,0,0,0.05)]">
      {/* 로그인 페이지에는 헤더 X */}
      {pathname !== '/login' && pathname !== '/write' && (
        // header height: 76px
        <header className="h-[76px] flex justify-between bg-white w-[1280px] main-md:w-[840px] main-sm:w-[400px] py-[20px] items-center">
          <Link href="/">
            <Image className="pb-1" src="/logo.png" alt="logo" width="160" height="76" />
          </Link>
          <Link href={`/${blogName}`} className="text-[20px] font-bold ml-[40px]">
            {blogName}
          </Link>
          <div className="grow">{/* spacer - 빈 공간을 채우기 위한 역할 */}</div>
          {/* 검색창 */}
          <div className="">
            <SearchBarContainer />
          </div>
          {!accessToken ? (
            <></>
          ) : (
            <Link href="/write" className="md:pl-12 pl-12">
              <WriteButton color="white" textColor="main" width="small">
                <span>글 작성</span>
              </WriteButton>
            </Link>
          )}
          {!accessToken ? (
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
    </div>
  );
}
