import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import reIssueTokenAndRequestAgain from '@/utils/token';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // PUT(S3에 이미지 업로드) 시 헤더에 토큰을 넣으면 400 Bad Request 에러 발생
    if (config.method?.toLowerCase() === 'put') {
      return config;
    }

    const accessToken = getCookie('accessToken');
    if (accessToken === undefined) {
      return config;
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorMsg = error.response.data.code;
    const errorStatus = error.response.status;
    const accessToken = getCookie('accessToken');

    // NO_ACCESS_TOKEN -> reissue X
    // 액세스 토큰 만료시
    if (
      !originalRequest._retry &&
      errorStatus == 401 &&
      errorMsg.includes('INVALID_ACCESS_TOKEN')
    ) {
      originalRequest._retry = true;
      // 비로그인 유저: 토큰 갱신 없이 에러를 반환
      if (!accessToken) {
        return Promise.reject(error);
      }

      // 토큰 갱신 및 API 재요청
      return reIssueTokenAndRequestAgain(originalRequest);
    } else if (errorStatus == 401 && errorMsg.includes('INVALID_REFRESH_TOKEN')) {
      // 리프레시 토큰 만료시
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      // 로그인 페이지로 이동
      window.location.href = '/login';
      return Promise.reject(error);
    }

    throw error;
  }
);

export default axiosInstance;
