'use client';

import { useQueries } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';
import ProfileBoxView from '@/components/user/ProfileBox/ProfileBoxView';

export default function ProfileBoxContainer() {
  // 데이터 패칭
  const fetchNickname = async () => {
    const res = await axiosInstance.get('/users/nickname');
    return res.data.data.nickname;
  };

  const fetchFollowerCount = async () => {
    const res = await axiosInstance.get('/followers/count');
    console.log(res);
    return res.data.data.count;
  };

  const fetchProfileImageUrl = async () => {
    const res = await axiosInstance.get('/users/profile-image-url');
    console.log(res);
    return res.data.data.profileImageUrl;
  };

  const results = useQueries({
    queries: [
      { queryKey: ['nickname'], queryFn: fetchNickname },
      { queryKey: ['followerCount'], queryFn: fetchFollowerCount },
      { queryKey: ['profileImage'], queryFn: fetchProfileImageUrl },
    ],
  });

  const nickname = results[0].data;
  const followerCount = results[1].data;
  const profileImageUrl = results[2].data;

  return (
    <ProfileBoxView
      nickname={nickname}
      followerCount={followerCount}
      profileImageUrl={profileImageUrl}
    />
  );
}
