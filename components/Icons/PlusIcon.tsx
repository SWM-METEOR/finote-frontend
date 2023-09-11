'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}
export default function PlusIcon({ width = 20, height = 20, color = '#999999' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="3.5" y1="0.5" x2="3.5" y2="6.5" stroke={color} strokeLinecap="square" />
      <line x1="6.5" y1="3.5" x2="0.5" y2="3.5" stroke={color} strokeLinecap="square" />
    </svg>
  );
}
