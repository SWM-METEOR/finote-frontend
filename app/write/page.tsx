import Editor from '@/app/components/Editor';

export default function WritePage() {
  return (
    <div className="flex flex-col my-24 mx-48 gap-8">
      <Editor />
      {/* TODO: 일단 글 작성 버튼 + 로직을 에디터 컴포넌트 안에 포함시킴. 추후 전역상태 관리 도구 도입 후 계층 분리 필요 */}
    </div>
  );
}
