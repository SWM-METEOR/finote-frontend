import Editor from '@/app/components/Editor';
import Button from '@/app/components/common/button';

export default function WritePage() {
  return (
    <div className="flex flex-col my-24 mx-48 gap-8">
      <input
        className={`input border-b-[2px] text-2xl border-main appearance-none w-3/3 px-3 py-3 focus focus:outline-none active:outline-none`}
        type="text"
        name="title"
        id=""
        placeholder="제목 입력"
      />
      <Editor />
      <div className="ml-auto">
        <Button color="main" textColor="white" width="small">
          <span>등록하기</span>
        </Button>
      </div>
    </div>
  );
}
