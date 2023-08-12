import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

interface ReIssueResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  status: number;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
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
    console.log(errorMsg, errorStatus);

    // 액세스 토큰 만료시
    if (errorStatus == 401 && errorMsg.includes('INVALID_ACCESS_TOKEN')) {
      console.log('액세스 토큰 만료');
      try {
        const res = await axiosInstance.post<ReIssueResponse>('/users/jwt/re-issue', {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken'),
        });

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        setCookie('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken);

        // 헤더에 새 토큰 설정
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

        // 원래의 요청을 다시 보냄
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
