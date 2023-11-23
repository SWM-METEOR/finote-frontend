'use client';

import { getCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/utils/axios';

import FeedListView from '@/components/feed/FeedListView';
import { useEffect } from 'react';

export default function FeedListContainer() {
  const accessToken = getCookie('accessToken');

  const fetchFeedList = async () => {
    if (!accessToken) return;

    const res = await axiosInstance.get('/feeds');
    return res.data.data.feeds;
  };

  const {
    data: feedList,
    isError,
    isLoading,
  } = useQuery(['feedList'], fetchFeedList, {
    staleTime: 0,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (accessToken) {
      fetchFeedList();
    }
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-[20px] font-medium">로그인 후 이용해주세요.</span>
      </div>
    );
  }

  if (isError || isLoading) return <div></div>;

  return <FeedListView feedList={feedList} />;
}
