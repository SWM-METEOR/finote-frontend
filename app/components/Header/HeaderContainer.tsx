'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

import axiosInstance from '@/utils/axios';
import HeaderView from '@/app/components/Header/HeaderView';

export default function HeaderContainer() {
  const pathname = usePathname();
  const [blogName, setBlogName] = useState('');
  const [accessToken, setAccessToken] = useState<string>('');

  async function getUserBlogInfo() {
    if (!accessToken) {
      setBlogName('');
      return;
    }

    try {
      const res = await axiosInstance.get('/users/blog-info');
      setBlogName(res.data.data.blogName);
    } catch (error) {
      throw new Error('Failed to fetch user blog info');
    }
  }

  useEffect(() => {
    setAccessToken(getCookie('accessToken') as string);
  }, [pathname]);

  useEffect(() => {
    getUserBlogInfo();
  }, [accessToken]);

  return <HeaderView blogName={blogName} accessToken={accessToken} pathname={pathname} />;
}
