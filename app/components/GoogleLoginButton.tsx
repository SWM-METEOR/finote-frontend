import Image from 'next/image';
import Button from '@/app/components/common/button';

// TODO: 리소스 경로 관리
export default function GoogleLoginButton() {
  const redirect = () => {
    const clientId = encodeURIComponent(`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`);

    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL}`); // 배포환경에서는 변경 필요

    const scope = encodeURIComponent('profile email');
    const responseType = 'code';
    const accessType = 'offline';

    // 구글에서 Code값 발급 후, redirectUri로 리다이렉션
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
  };

  return (
    <Button>
      <span>
        <Image
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        />
      </span>
      <span onClick={() => redirect()}>Google로 로그인</span>
    </Button>
  );
}
