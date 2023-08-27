import React from 'react';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}

export default function GreaterThanIcon({ width = 14, height = 14, color = '#666666' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.46447 10.5355L9 7L5.46447 3.46447"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
