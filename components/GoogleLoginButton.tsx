import Image from 'next/image';
import CustomButton from '@/components/common/CustomButton';

// TODO: 리소스 경로 관리
export default function GoogleLoginButton() {
  const redirect = () => {
    const clientId = encodeURIComponent(`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`);

    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL}`); // 배포환경에서는 변경 필요

    const scope = encodeURIComponent('profile email');
    const responseType = 'code';
    const accessType = 'offline';

    // 구글에서 Code값 발급 후, redirectUri로 리다이렉션
    if (typeof window !== 'undefined') {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
    }
  };

  return (
    <div onClick={() => redirect()}>
      <CustomButton width={370} height={50} hasBorder={true} roundRate={10}>
        <div className="w-full flex items-center justify-center gap-[10px]">
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
          <span className="font-normal text-[16px]">Google로 로그인</span>
        </div>
      </CustomButton>
    </div>
  );
}
