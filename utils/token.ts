import { getCookie, setCookie } from 'cookies-next';
import axiosInstance from '@/utils/axios';
import { AxiosRequestConfig } from 'axios';

interface ReIssueResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  status: number;
}

let isReissuing = false;
let reIssuePromise: Promise<any> | null = null;

export default async function reIssueTokenAndRequestAgain(originalRequest: AxiosRequestConfig) {
  // 이미 토큰 재발급 중인 경우
  if (isReissuing && reIssuePromise) {
    await reIssuePromise;
    originalRequest.headers = originalRequest.headers || {};
    originalRequest.headers['Authorization'] = 'Bearer ' + getCookie('accessToken');
    return axiosInstance(originalRequest);
  }

  isReissuing = true;
  reIssuePromise = axiosInstance.post<ReIssueResponse>('/users/jwt/re-issue', {
    accessToken: getCookie('accessToken'),
    refreshToken: getCookie('refreshToken'),
  });

  return await reIssuePromise
    .then((res) => {
      const { accessToken, refreshToken } = res.data.data;
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      // headers가 존재하는지 확인하고, 없으면 초기화
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }

      // 헤더에 새 토큰 설정
      originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;

      // 원래의 요청을 다시 보냄
      return axiosInstance(originalRequest);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    })
    .finally(() => {
      isReissuing = false;
      reIssuePromise = null;
    });
}
