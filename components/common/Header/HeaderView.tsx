'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

import SearchBarContainer from '@/components/common/SearchBar/SearchBarContainer';
import WriteButton from '@/components/WriteButton';
import WriteIcon from '@/components/Icons/WriteIcon';
import LoginIcon from '@/components/Icons/LoginIcon';
import MoreShowIcon from '@/components/Icons/MoreShowIcon';

interface PropsType {
  nickname: string;
  blogName: string;
  profileImageUrl: string;
  accessToken: string;
  pathname: string;
}

export default function HeaderView({
  nickname,
  blogName,
  profileImageUrl,
  accessToken,
  pathname,
}: PropsType) {
  const nonHeaderPages = ['/login', '/write', '/edit'];
  const showHeader = !nonHeaderPages.some((page) => pathname.includes(page));

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={`/user/${nickname}`} className="text-[14px] font-medium px-[16px] py-[15px]">
          내 블로그 홈
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={`/settings`} className="text-[14px] font-medium px-[16px] py-[15px]">
          내 블로그 관리
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/logout" className="text-[14px] font-medium px-[16px] py-[15px]">
          로그아웃
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full flex justify-center shadow-[0_2px_10px_0_rgba(0,0,0,0.05)]">
      {/* 로그인 페이지에는 헤더 X */}
      {showHeader && (
        <div className="flex flex-col">
          {/* header height: 76px */}
          <header className="h-[76px] flex gap-[20px] justify-between bg-white w-[1280px] main-md:w-[840px] main-sm:w-[400px] mx-auto pr-[12px] py-[20px] items-center">
            <Link href="/trends">
              <Image className="pb-1" src="/logo.png" alt="logo" width="160" height="76" />
            </Link>
            <div className="main-md:hidden main-sm:hidden flex">
              <Link href={`/user/${nickname}`} className="text-[20px] font-bold ml-[40px]">
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
              <Dropdown
                menu={{ items }}
                dropdownRender={(menu) => <div style={{ marginTop: '4px' }}>{menu}</div>}
                placement="bottomRight"
              >
                <div className="flex items-center gap-[4px]">
                  <div className="relative w-[30px] h-[30px] rounded-[10px] overflow-hidden flex-shrink-0 bg-main">
                    <Image
                      fill
                      className="object-cover"
                      src={profileImageUrl}
                      alt={nickname}
                      sizes="100%"
                    />
                  </div>
                  <span className="text-[14px] font-medium ml-[4px]">{nickname}</span>
                  <MoreShowIcon width={14} height={14} color="#AAAAAA" />
                </div>
              </Dropdown>
            )}
          </header>
          {/* 모바일 사이즈에서 나오는 하단 헤더 */}
          <div className="main-sm:flex hidden justify-between items-center gap-[40px] px-[15px] bg-[#00A1FF] w-[calc(100vw)] h-[60px]">
            <span className="px-[15px]">
              <Link href={`/user/${nickname}`} className="text-white text-[16px] font-bold">
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
