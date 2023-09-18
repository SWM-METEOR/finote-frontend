'use client';
import Link from 'next/link';
import Image from 'next/image';

import SearchBarContainer from '@/components/common/SearchBar/SearchBarContainer';
import WriteButton from '@/components/WriteButton';
import WriteIcon from '@/components/Icons/WriteIcon';
import LoginIcon from '@/components/Icons/LoginIcon';

interface PropsType {
  nickname: string;
  blogName: string;
  accessToken: string;
  pathname: string;
}

export default function HeaderView({ nickname, blogName, accessToken, pathname }: PropsType) {
  const nonHeaderPages = ['/login', '/write', '/edit'];
  const showHeader = !nonHeaderPages.some((page) => pathname.includes(page));

  return (
    <div className="w-full flex justify-center shadow-[0_2px_10px_0_rgba(0,0,0,0.05)]">
      {/* 로그인 페이지에는 헤더 X */}
      {showHeader && (
        <div className="flex flex-col">
          {/* header height: 76px */}
          <header className="h-[76px] flex gap-[20px] justify-between bg-white w-[1280px] main-md:w-[840px] main-sm:w-[400px] mx-auto pr-[12px] py-[20px] items-center">
            <Link href="/">
              <Image className="pb-1" src="/logo.png" alt="logo" width="160" height="76" />
            </Link>
            <div className="main-md:hidden main-sm:hidden flex">
              <Link href={`/${nickname}`} className="text-[20px] font-bold ml-[40px]">
                {blogName}
              </Link>
            </div>
            <div className="grow">{/* spacer - 빈 공간을 채우기 위한 역할 */}</div>
            {/* 검색창 */}
            <div className="">
              <SearchBarContainer />
            </div>
            {!accessToken ? (
              <></>
            ) : (
              <div className="main-sm:hidden flex">
                <Link href="/write" className="md:pl-12 pl-12">
                  <WriteButton />
                </Link>
              </div>
            )}
            {!accessToken ? (
              <Link href="/login">
                <button className="flex items-center justify-center bg-[#00A1FF] text-[14px] text-white font-bold justify-center px-[20px] py-[11px] w-[107px] h-[40px] gap-[10px] rounded-[10px] hover:shadow transition duration-150">
                  <LoginIcon width={20} height={20} color="white" />
                  <span>로그인</span>
                </button>
              </Link>
            ) : (
              <Link href="/logout">
                <span className="px-4 main-md:px-0 main-sm:px-0">로그아웃</span>
              </Link>
            )}
          </header>
          {/* 모바일 사이즈에서 나오는 하단 헤더 */}
          <div className="main-sm:flex hidden justify-between items-center gap-[40px] px-[15px] bg-[#00A1FF] w-[calc(100vw)] h-[60px]">
            <span className="px-[15px]">
              <Link href={`/${nickname}`} className="text-white text-[16px] font-bold">
                {blogName}
              </Link>
            </span>
            <span className="px-[15px]">
              <Link
                href={`/write`}
                className="flex items-center gap-[10px] text-white text-[16px] font-bold"
              >
                <WriteIcon width={16} height={16} color="white" />
                <span>글쓰기</span>
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
