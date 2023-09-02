'use client';

interface PropsType {
  children: React.ReactNode;
  width: number;
  height: number;
  borderColor: string;
  fillColor: string;
  textColor: string;
  isDisabled?: boolean;
  roundRate?: number;
}

export default function NewButton({
  children,
  width,
  height,
  borderColor,
  fillColor,
  textColor,
  isDisabled = false,
  roundRate = 0,
}: PropsType) {
  return (
    <button
      className={`flex items-center w-[${width}px] h-[${height}px] border border-[${borderColor}] bg-[${fillColor}] text-[${textColor}] justify-center px-5 gap-2 rounded-[${roundRate}px] transition duration-150 font-bold text-[18px]`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
