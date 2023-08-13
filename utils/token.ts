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

export default async function reIssueTokenAndRequestAgain(originalRequest: AxiosRequestConfig) {
  return await axiosInstance
    .post<ReIssueResponse>('/users/jwt/re-issue', {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken'),
    })
    .then((res) => {
      const newAccessToken = res.data.data.accessToken;
      const newRefreshToken = res.data.data.refreshToken;

      setCookie('accessToken', newAccessToken);
      setCookie('refreshToken', newRefreshToken);

      // headers가 존재하는지 확인하고, 없으면 초기화
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }

      // 헤더에 새 토큰 설정
      originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

      // 원래의 요청을 다시 보냄
      return axiosInstance(originalRequest);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}
