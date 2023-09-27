'use client';

import { useRef, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ArticleType } from '@/types/Article';

interface PropsType {
  register: UseFormRegister<ArticleType>;
  inputTitleRef: React.RefObject<HTMLInputElement>;
  editor: any;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
  initialTitle?: string;
  initialBody?: string;
}

export default function EditorComponent({
  register,
  inputTitleRef,
  editor,
  setEditor,
  initialTitle = '',
  initialBody = '',
}: PropsType) {
  const editElement = useRef(null);

  console.log(initialBody);
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
          initialValue: initialBody,
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
    <div className="w-[1280px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
      <input
        className={`w-full h-[80px] text-[28px] input rounded-none px-[40px] border-[#EEEEEE] border-t-2 border-x-2 rounded-t-[20px] focus focus:outline-none active:outline-none`}
        type="text"
        id="article-title"
        placeholder="제목 입력"
        {...register('title', {
          maxLength: { value: 100, message: '최대 100자까지 입력 가능합니다.' },
        })}
        defaultValue={initialTitle}
      />
      <div ref={editElement}></div>
    </div>
  );
}
