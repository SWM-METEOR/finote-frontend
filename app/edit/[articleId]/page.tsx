'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

import ClipLoader from 'react-spinners/ClipLoader';

import CustomButton from '@/components/common/CustomButton';
import Editor from '@/components/Editor';
import axiosInstance from '@/utils/axios';
import { ArticleType } from '@/types/Article';
import useToast from '@/hooks/toast';
import ImageUpload from '@/components/common/ImageUpload';

export default function EditPage({ params }: { params: { articleId: string } }) {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialBody, setInitialBody] = useState('');
  const [authorNickname, setAuthorNickname] = useState('');
  const [nickname, setNickname] = useState('');
  const [thumbnail, setThumbnail] = useState(''); // TODO

  const { register, handleSubmit, setValue } = useForm<ArticleType>();
  const [showErrorToast] = useToast();

  useEffect(() => {
    const getNickname = () => {
      axiosInstance.get('/users/nickname').then((res) => {
        const { nickname } = res.data.data;
        setNickname(nickname);
      });
    };

    const getArticle = async () => {
      await axiosInstance.get(`/articles/${params.articleId}`).then((res) => {
        const { title, body, authorNickname, thumbnail } = res.data.data;
        console.log(res.data.data);
        // TODO: API 수정 후 thumbnail값 추가
        setInitialTitle(title);
        setInitialBody(body);
        setAuthorNickname(authorNickname);
        setThumbnail(thumbnail);
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

  const onSubmit: SubmitHandler<ArticleType> = (data) => {
    const contents = editor.getMarkdown();
    data.body = contents;
    if (!data.title || !data.body) {
      showErrorToast('필수 항목을 모두 입력해주세요!');
      return;
    }
    setIsUpdating(true);

    if (!data.thumbnail) {
      data.thumbnail = thumbnail;
    }

    axiosInstance
      .post(`/articles/edit/${params.articleId}`, data)
      .then((res) => {
        const { nickname, title } = res.data.data;

        router.push(`/articles/${nickname}/${title}`, { shallow: true });
      })
      .catch((err) => {
        setIsUpdating(false);

        if (err.code === 'ERR_BAD_REQUEST') {
          Swal.fire('글 수정 실패', '동일한 글 제목이 존재합니다. 제목을 변경해주세요.', 'error');
          return;
        }
        Swal.fire('글 수정 실패', '글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
      });
  };

  return (
    initialBody && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[1280px] my-24 mx-auto gap-8">
          <Editor
            register={register}
            inputTitleRef={inputTitleRef}
            editor={editor}
            setEditor={setEditor}
            initialTitle={initialTitle}
            initialBody={initialBody}
          />
          {/* 이미지 업로드 */}
          <div className="mt-[40px]">
            <h2 className="font-bold text-[18px] mb-[20px]">썸네일 설정</h2>
            <ImageUpload<ArticleType>
              setValue={setValue}
              type="thumbnail"
              defaultValue={thumbnail}
            />
          </div>
          {/* 수정 버튼 */}
          <div className="mx-auto mb-36 mt-[50px]">
            <CustomButton
              type="submit"
              width={300}
              height={60}
              fillColor="main"
              textColor="white"
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
            </CustomButton>
          </div>
        </div>
      </form>
    )
  );
}
