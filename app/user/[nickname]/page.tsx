'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import axiosInstance from '@/utils/axios';
import TechMapContainer from '@/components/user/TechMap/TechMapContainer';
import ProfileBoxContainer from '@/components/user/ProfileBox/ProfileBoxContainer';
import MyArticleListContainer from '@/components/articles/MyArticleList/MyArticleListContainer';
import LikeArticleListContainer from '@/components/articles/LikeArticleList/LikeArticleListContainer';

export default function UserHomePage({ params }: { params: { nickname: string } }) {
  const [isClickedLike, setIsClickedLike] = useState(false); // 좋아요한 글 클릭 여부
  const nickname = decodeURIComponent(params.nickname);
  const accessToken = getCookie('accessToken');

  const likeArticleCountQuery = useQuery(
    ['likeArticleCount'],
    async () => {
      const res = await axiosInstance.get('/users/articles/like/count');
      return res.data.data.likeCount;
    },
    {
      staleTime: Infinity,
      enabled: !!accessToken,
    }
  );

  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex gap-[40px]">
        <ProfileBoxContainer />
        <TechMapContainer />
      </div>
      <div className="flex">
        <div className="flex flex-col w-[200px] mr-[81px] flex-shrink-0">
          {/* 좋아요한 글 필터링 버튼 */}
          <button
            className="flex-shrink-0 flex gap-[8px] items-center justify-center h-[62px] bg-white rounded-[8px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] mb-[40px] text-[16px] font-bold"
            onClick={() => setIsClickedLike(true)}
          >
            <Image className="" src="/filled-heart.svg" alt="heart" width="16" height="14" />
            <span>좋아요한 글</span>
            <span className="text-[#00A1FF]">{likeArticleCountQuery.data || 0}</span>
          </button>
          {/* 카테고리 목록 */}
          <div>
            <span className="text-[#666666] text-[14px] mb-[5px]">카테고리</span>
            <div className="flex flex-col items-start">
              <button
                className="h-[40px] my-[10px] text-[#333333] text-[16px] font-bold"
                onClick={() => setIsClickedLike(false)}
              >
                전체(26)
              </button>
            </div>
          </div>
        </div>
        {isClickedLike ? (
          <LikeArticleListContainer />
        ) : (
          <MyArticleListContainer nickname={nickname} />
        )}
      </div>
    </div>
  );
}
