'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/common/button';
import axiosInstance from '@/utils/axios';

// TODO: 데모 이후 리팩토링, 관심사 분리 필요
export default function EditorComponent() {
  const router = useRouter();
  const editElement = useRef(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);

  const handleClick = async () => {
    const contents = editor.getMarkdown();
    if (!inputTitleRef.current) return;

    axiosInstance
      .post('/articles/write', {
        title: inputTitleRef.current.value,
        body: contents,
      })
      .then((res) => {
        // 글 등록 완료 시, 글 페이지로 리다이렉트
        router.push(`/articles/${res.data.data.nickname}/${res.data.data.title}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /**
     * 동적 import
     * 서버측 렌더링이 끝나고
     * 클라이언트 측에서 컴포넌트가 렌더링될 때 @toast-ui/editor를 동적으로 불러옴
     */
    if (typeof window !== 'undefined') {
      import('@toast-ui/editor').then((editorModule) => {
        const Editor = editorModule.Editor;

        if (!editElement.current) {
          return;
        }

        const newEditor = new Editor({
          el: editElement.current,
          height: '700px',
          initialEditType: 'markdown',
          previewStyle: 'vertical',
          hooks: {
            addImageBlobHook(blob, callback) {
              // console.log(blob);
            },
          },
        });

        setEditor(newEditor);
      });
    }
  }, []);

  return (
    <>
      <input
        className={`input shadow-md text-2xl border-main appearance-none w-3/3 px-3 py-3 focus focus:outline-none active:outline-none`}
        type="text"
        name="title"
        id=""
        placeholder="제목 입력"
        ref={inputTitleRef}
      />
      <div ref={editElement}></div>
      <div className="ml-auto mb-36">
        <Button color="main" width="small">
          <span className="text-white" onClick={() => handleClick()}>
            등록하기
          </span>
        </Button>
      </div>
    </>
  );
}
