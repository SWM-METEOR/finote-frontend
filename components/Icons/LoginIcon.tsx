'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}

export default function LoginIcon({ width = 20, height = 20, color = 'white' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="6" r="4" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M18 18C18 13.5817 14.4183 10 10 10C5.58172 10 2 13.5817 2 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
