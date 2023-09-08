'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

import Button from '@/components/common/Button';
import Editor from '@/components/Editor';
import axiosInstance from '@/utils/axios';

export default function EditPage({ params }: { params: { articleId: string } }) {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialBody, setInitialBody] = useState('');
  const [authorNickname, setAuthorNickname] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const getNickname = () => {
      axiosInstance.get('/users/nickname').then((res) => {
        const { nickname } = res.data.data;
        setNickname(nickname);
      });
    };

    const getArticle = async () => {
      await axiosInstance.get(`/articles/${params.articleId}`).then((res) => {
        const { title, body, authorNickname } = res.data.data;

        setInitialTitle(title);
        setInitialBody(body);
        setAuthorNickname(authorNickname);
      });
    };

    getNickname();
    getArticle();
  }, []);

  useEffect(() => {
    if (!nickname) return;
    if (!authorNickname) return;

    // 본인 작성글이 아닌 경우, 수정 페이지에 접근 불가
    if (nickname !== authorNickname) {
      router.push(`/error/unauthorized`);
    }
  }, [nickname, authorNickname]);

  const editArticle = async () => {
    setIsUpdating(true);

    const contents = editor.getMarkdown();
    if (!inputTitleRef.current) return;

    await axiosInstance
      .post(`/articles/edit/${params.articleId}`, {
        title: inputTitleRef.current.value,
        body: contents,
      })
      .then((res) => {
        const { nickname, title } = res.data.data;

        // TODO: 여기서 넘어갈 때, 글 수정된게 곧바로 반영이 안되는 버그 존재
        router.push(`/articles/${nickname}/${title}`, { shallow: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    initialBody && (
      <div className="flex flex-col my-24 mx-48 gap-8">
        <Editor
          inputTitleRef={inputTitleRef}
          editor={editor}
          setEditor={setEditor}
          initialTitle={initialTitle}
          initialBody={initialBody}
        />
        {/* 수정 버튼 */}
        <div className="mx-auto mb-36 mt-[50px]" onClick={() => editArticle()}>
          <Button
            width={300}
            height={60}
            fillColor="#00A1FF"
            textColor="#FFFFFF"
            roundRate={15}
            isDisabled={isUpdating}
          >
            {isUpdating ? (
              <p className="flex gap-[16px]">
                <ClipLoader
                  color="#FFFFFF"
                  size={24}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </p>
            ) : (
              <span>수정하기</span>
            )}
          </Button>
        </div>
      </div>
    )
  );
}
