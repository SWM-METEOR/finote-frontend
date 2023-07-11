'use client';

interface PropsType {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  width?: 'large' | 'small';
}
export default function Button({
  children,
  color = 'white',
  textColor = 'black',
  width = 'large',
}: PropsType) {
  console.log(color);
  return (
    <button
      className={
        `flex items-center bg-${color} text-${textColor} justify-center px-5 w-full h-14 border flex gap-2 border-grey rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150` +
        (width == 'large' ? `md:w-[363px]` : `md:w-[280px]`)
      }
    >
      {children}
    </button>
  );
}
