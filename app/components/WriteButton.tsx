// TODO: 현재 안쓰는 버튼, 추후 리팩토링 시 활용
'use client';
import Button from '@/app/components/common/button';

export default function WriteButton() {
  const handleClick = async () => {
    try {
      const response = await fetch('api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '테스트',
          body: `여섯 번째
          try!!!
          입니다`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 받아온 응답을 처리
      const responseData = await response.json();
      console.log(responseData);

      // 필요한 작업 수행
      // TODO: 글 페이지로 리다이렉트
    } catch (error) {
      console.error('Error sending code to backend', error);
    }
  };

  return (
    <Button color="main" textColor="white" width="small">
      <span onClick={() => handleClick()}>등록하기</span>
    </Button>
  );
}
