'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';

import axiosInstance from '@/utils/axios';
import UploadIcon from '@/components/Icons/UploadIcon';
import AdditionalInfoType from '@/types/user';

interface PropsType {
  register: UseFormRegister<AdditionalInfoType>;
}

export default function ImageUpload({ register }: PropsType) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string>(''); // 이미지 미리보기 URL 상태

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
    console.log(preSignedURL);
    const imageURL = await uploadImageAndGetURL(preSignedURL, file);

    register('profileImageUrl', { value: imageURL }); // form
    setImageURL(imageURL);
  };

  return (
    <div className="flex items-start gap-[15px] mb-[25px]">
      {imageURL ? (
        <div className="w-[120px] h-[120px] bg-grey rounded-[10px] overflow-hidden flex-shrink-0">
          <Image
            width={120}
            height={120}
            src={imageURL}
            alt="Selected Preview"
            className="object-cover rounded-[10px]"
          />
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
