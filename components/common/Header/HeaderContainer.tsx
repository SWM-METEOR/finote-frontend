'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';

import axiosInstance from '@/utils/axios';
import HeaderView from '@/components/common/Header/HeaderView';
import { userBlogNameStore } from '@/store/user';

export default function HeaderContainer() {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string>('');
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const { blogName, setBlogName } = userBlogNameStore();

  async function getUserNickname() {
    if (!accessToken) {
      setNickname('');
      return;
    }
    try {
      const res = await axiosInstance.get('/users/nickname');
      setNickname(res.data.data.nickname);
    } catch (error) {
      throw new Error('Failed to fetch user nickname');
    }
  }

  async function getUserBlogName() {
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

  async function getUserProfileImage() {
    if (!accessToken) {
      return;
    }

    try {
      const res = await axiosInstance.get('/users/profile-image-url');
      setProfileImageUrl(res.data.data.profileImageUrl);
    } catch (error) {
      throw new Error('Failed to fetch user profile image');
    }
  }

  useEffect(() => {
    setAccessToken(getCookie('accessToken') as string);
  }, [pathname]);

  useEffect(() => {
    getUserNickname();
    getUserBlogName();
    getUserProfileImage();
  }, [accessToken]);

  return (
    <HeaderView
      nickname={nickname}
      blogName={blogName}
      profileImageUrl={profileImageUrl}
      accessToken={accessToken}
      pathname={pathname}
    />
  );
}
