'use client';

import { type } from 'os';

interface PropsType {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  width?: number;
  height?: number;
  fillColor?: string;
  textColor?: string;
  isDisabled?: boolean;
  roundRate?: number;
  hasBorder?: boolean;
  borderColor?: string;
}

export default function Button({
  type = 'button',
  children,
  width = 300,
  height = 60,
  fillColor = 'white',
  textColor = 'dartGrey',
  isDisabled = false,
  roundRate = 0,
  hasBorder = false,
}: PropsType) {
  // color값을 props로 사용 불가: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  // 따라서 color값을 key로 해서 tailwind value를 바인딩해야 함

  const backGroundColorMap: { [color: string]: string } = {
    main: 'bg-main',
    lightGrey: 'bg-lightGrey',
    red: 'bg-red',
  };

  const textColorMap: { [color: string]: string } = {
    white: 'text-white',
    darkGrey: 'text-darkGrey',
  };

  const widthMap: { [width: number]: string } = {
    300: 'w-[300px]',
    370: 'w-[370px]',
    500: 'w-[500px]',
  };

  const heightMap: { [height: number]: string } = {
    50: 'h-[50px]',
    60: 'h-[60px]',
  };

  return (
    <button
      type={type}
      className={`flex items-center ${widthMap[width]} ${heightMap[height]} ${
        backGroundColorMap[fillColor]
      } ${
        textColorMap[textColor]
      } justify-center px-5 gap-2 rounded-[${roundRate}px] font-bold text-[18px] ${
        hasBorder ? `border border-grey` : ``
      } hover:border-slate-400 hover:shadow transition duration-150`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
