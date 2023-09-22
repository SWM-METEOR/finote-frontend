'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}

export default function MoreShowIcon({ width = 10, height = 10, color = '#AAAAAA' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.74019 7.55C4.85566 7.75 5.14434 7.75 5.25981 7.55L7.33827 3.95C7.45374 3.75 7.3094 3.5 7.07846 3.5H2.92154C2.6906 3.5 2.54626 3.75 2.66173 3.95L4.74019 7.55Z"
        fill={color}
      />
    </svg>
  );
}
