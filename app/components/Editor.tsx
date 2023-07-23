'use client';
import { useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';

export default function EditorComponent() {
  const editElement = useRef(null);
  const editInstance = useRef<Editor | null>(null);

  useEffect(() => {
    if (editElement.current == null) {
      return;
    }

    editInstance.current = new Editor({
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
  });

  return <div ref={editElement}></div>;
}
