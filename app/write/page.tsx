'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

import CustomButton from '@/components/common/CustomButton';
import Editor from '@/components/Editor';
import axiosInstance from '@/utils/axios';

export default function WritePage() {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isPosting, setIsPosting] = useState(false);

  const writeArticle = async () => {
    setIsPosting(true);

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

  return (
    <div className="flex flex-col my-24 mx-auto">
      <Editor inputTitleRef={inputTitleRef} editor={editor} setEditor={setEditor} />
      <div className="mx-auto mb-36 mt-[50px]" onClick={() => writeArticle()}>
        <CustomButton
          width={300}
          height={60}
          fillColor="main"
          textColor="white"
          roundRate={15}
          isDisabled={isPosting}
        >
          {isPosting ? (
            <p className="flex gap-[16px]">
              <ClipLoader
                color="#FFFFFF"
                size={24}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </p>
          ) : (
            <span>등록하기</span>
          )}
        </CustomButton>
      </div>
    </div>
  );
}
