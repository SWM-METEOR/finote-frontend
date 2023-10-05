'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import axiosInstance from '@/utils/axios';
import HeaderView from '@/components/common/Header/HeaderView';

export default function HeaderContainer() {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string>('');

  const nicknameQuery = useQuery(
    ['nickname'],
    async () => {
      const res = await axiosInstance.get('/users/nickname');
      return res.data.data.nickname;
    },
    {
      staleTime: Infinity,
      enabled: !!accessToken,
    }
  );

  const blogNameQuery = useQuery<string>(
    ['blogName'],
    async () => {
      const res = await axiosInstance.get('/users/blog-info');
      return res.data.data.blogName;
    },
    {
      staleTime: Infinity,
      enabled: !!accessToken,
    }
  );

  const profileImageQuery = useQuery(
    ['profileImage'],
    async () => {
      const res = await axiosInstance.get('/users/profile-image-url');
      return res.data.data.profileImageUrl;
    },
    {
      staleTime: Infinity,
      enabled: !!accessToken,
    }
  );

  useEffect(() => {
    setAccessToken(getCookie('accessToken') as string);
  }, [pathname]);

  return (
    <HeaderView
      nickname={nicknameQuery.data || ''}
      blogName={blogNameQuery.data || ''}
      profileImageUrl={profileImageQuery.data || ''}
      accessToken={accessToken}
      pathname={pathname}
    />
  );
}
