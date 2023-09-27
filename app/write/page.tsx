'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';

import CustomButton from '@/components/common/CustomButton';
import Editor from '@/components/Editor';
import axiosInstance from '@/utils/axios';
import { ArticleType } from '@/types/Article';
import useToast from '@/hooks/toast';
import ImageUpload from '@/components/common/ImageUpload';

export default function WritePage() {
  const router = useRouter();
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isPosting, setIsPosting] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ArticleType>();
  const [showErrorToast] = useToast();

  // 글 작성
  const onSubmit: SubmitHandler<ArticleType> = (data) => {
    const contents = editor.getMarkdown();
    data.body = contents;

    if (!data.title || !data.body) {
      showErrorToast('필수 항목을 모두 입력해주세요!');
      return;
    }
    setIsPosting(true);

    if (!data.thumbnail) {
      data.thumbnail = '';
    }

    axiosInstance
      .post('/articles/write', data)
      .then((res) => {
        // 글 등록 완료 시, 글 페이지로 리다이렉트
        router.push(`/articles/${res.data.data.nickname}/${res.data.data.title}`);
      })
      .catch((err) => {
        setIsPosting(false);

        if (err.code === 'ERR_BAD_REQUEST') {
          Swal.fire('글 등록 실패', '동일한 글 제목이 존재합니다. 제목을 변경해주세요.', 'error');
          return;
        }
        Swal.fire('글 등록 실패', '글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[1280px] my-24 mx-auto">
          <Editor
            register={register}
            inputTitleRef={inputTitleRef}
            editor={editor}
            setEditor={setEditor}
          />
          {/* 이미지 업로드 */}
          <div className="mt-[40px]">
            <h2 className="font-bold text-[18px] mb-[20px]">썸네일 설정</h2>
            <ImageUpload<ArticleType> setValue={setValue} type="thumbnail" />
          </div>
          <div className="mx-auto mb-36 mt-[50px]">
            <CustomButton
              type="submit"
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
      </form>
    </>
  );
}
