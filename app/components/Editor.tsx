'use client';
import { useRef, useEffect, useState } from 'react';

export default function EditorComponent() {
  const editElement = useRef(null);
  const [editor, setEditor] = useState<any>(null);

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

  return <div ref={editElement}></div>;
}
