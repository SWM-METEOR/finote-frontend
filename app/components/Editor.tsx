'use client';
import { useRef, useEffect, useState } from 'react';
import Button from '@/app/components/common/button';

export default function EditorComponent() {
  const editElement = useRef(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);

  const handleClick = async () => {
    const contents = editor.getMarkdown();
    console.log(contents);
    if (!inputTitleRef.current) return;

    try {
      const response = await fetch('api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputTitleRef.current.value,
          body: contents,
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
        className={`input border-b-[2px] text-2xl border-main appearance-none w-3/3 px-3 py-3 focus focus:outline-none active:outline-none`}
        type="text"
        name="title"
        id=""
        placeholder="제목 입력"
        ref={inputTitleRef}
      />
      <div ref={editElement}></div>
      <div className="ml-auto">
        <Button color="main" width="small">
          <span className="text-white" onClick={() => handleClick()}>
            등록하기
          </span>
        </Button>
      </div>
    </>
  );
}
