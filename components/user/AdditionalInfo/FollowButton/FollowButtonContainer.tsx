'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';

import FollowButtonView from '@/components/user/AdditionalInfo/FollowButton/FollowButtonView';
import axiosInstance from '@/utils/axios';

interface PropsType {
  followTargetNickname: string;
  size?: 'small' | 'medium' | 'large';
}

export default function FollowButtonContainer({ followTargetNickname, size = 'small' }: PropsType) {
  const [nickname, setNickname] = useState(''); // user nickname
  const [isFollowing, setIsFollowing] = useState(false); // 이미 팔로우한 유저면 true
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 초기값으로 인한 버튼 깜빡임 방지
  const accessToken = getCookie('accessToken');

  async function getUserNickname() {
    // 비로그인 유저는 닉네임을 가져올 수 없음
    if (!accessToken) {
      return;
    }

    try {
      const res = await axiosInstance.get('/users/nickname');
      const fetchedNickname = res.data.data.nickname;
      setNickname(fetchedNickname);

      setIsDataLoaded(true);
      return;
    } catch (error) {
      throw new Error('Failed to fetch user nickname');
    }
  }

  function showErrorToast() {
    toast.error('로그인 후 이용가능합니다.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }

  function checkAlreadyFollowing() {
    if (!accessToken) {
      return;
    }

    axiosInstance
      .get(`/check-follow/${followTargetNickname}`)
      .then((res) => {
        console.log(res);
        setIsFollowing(res.data.data.followed);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function followUser() {
    if (!accessToken) {
      showErrorToast();
      return;
    }
    // 팔로우 호출
    // 버튼 전환
    axiosInstance
      .post(`/follow/${followTargetNickname}`)
      .then((res) => {
        setIsFollowing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function unfollowUser() {
    if (!accessToken) {
      showErrorToast();
      return;
    }

    axiosInstance
      .post(`/unfollow/${followTargetNickname}`)
      .then((res) => {
        console.log(res);
        setIsFollowing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 본인 팔로우 불가
  useEffect(() => {
    checkAlreadyFollowing();
    getUserNickname();
  }, [accessToken]);

  return (
    <>
      <ToastContainer />
      {isDataLoaded && accessToken && nickname !== followTargetNickname && (
        <FollowButtonView
          followUser={followUser}
          unfollowUser={unfollowUser}
          isFollowing={isFollowing}
        />
      )}
    </>
  );
}
