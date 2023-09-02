'use client';

import SyncLoader from 'react-spinners/SyncLoader';

export default function AuthCallbackView() {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <SyncLoader color="#00A1FF" />
      <p>로그인 중입니다.</p>
    </div>
  );
}
