'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UseFormRegister, FieldValues, FieldPath, Path } from 'react-hook-form';

import axiosInstance from '@/utils/axios';
import UploadIcon from '@/components/Icons/UploadIcon';

interface PropsType<T extends FieldValues> {
  setValue: (name: Path<T>, value: string) => void;
  type: Path<T>;
  defaultValue?: string;
}

export default function ImageUpload<T extends FieldValues>({
  setValue,
  type,
  defaultValue = '',
}: PropsType<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string>(defaultValue); // 이미지 미리보기 URL 상태
  // const apiPath = {
  //   profileImageUrl: '/users/profile-image',
  //   thumbnail: '/your-thumbnail-path',
  // };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const getPreSignedURL = async (fileName: string) => {
    try {
      const res = await axiosInstance.post('/pre-signed-url', { fileName });
      return res.data.data.preSignedUrl;
    } catch (err) {
      console.error('Error getting pre-signed URL:', err);
      throw err;
    }
  };

  const uploadImageAndGetURL = async (preSignedURL: string, file: File) => {
    try {
      const res = await axiosInstance.put(preSignedURL, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // 응답에서 URL 추출 및 쿼리 문자열 제거
      const imageURL =
        res.config.url?.split('?')[0] ||
        'https://finote-image-bucket.s3.ap-northeast-2.amazonaws.com/finote_logo.png';
      return imageURL;
    } catch (err) {
      console.error('Error uploading the image:', err);
      return 'https://finote-image-bucket.s3.ap-northeast-2.amazonaws.com/finote_logo.png';
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preSignedURL = await getPreSignedURL(file.name);
    const imageURL = await uploadImageAndGetURL(preSignedURL, file);

    setValue(type, imageURL);
    setImageURL(imageURL);
  };

  return (
    <div className="flex items-start gap-[15px] mb-[25px]">
      {imageURL ? (
        <div className="relative w-[120px] h-[120px] rounded-[10px] overflow-hidden flex-shrink-0">
          <Image fill className="object-cover" src={imageURL} alt="logo" sizes="100%" />
        </div>
      ) : (
        <div className="w-[120px] h-[120px] bg-grey rounded-[10px]"></div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="sr-only"
        onChange={handleFileUpload}
      />
      <button
        type="button"
        onClick={triggerFileSelect}
        className="text-main font-bold text-[14px] flex items-center gap-[7px]"
      >
        <UploadIcon width={20} height={20} color="#00A1FF" />
        <span>업로드</span>
      </button>
    </div>
  );
}
