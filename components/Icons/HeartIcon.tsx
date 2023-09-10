'use client';
import React from 'react';

interface PropsType {
  width?: number;
  height?: number;
  strokeColor?: string;
  isFilled?: boolean;
}
export default function HeartIcon({
  width = 18,
  height = 18,
  strokeColor = '#CCCCCC',
  isFilled,
}: PropsType) {
  // 활성 상태에 따라 색상을 변경
  const fillColor = isFilled ? '#FA8072' : 'none'; // FA8072: 살몬
  const stroke = isFilled ? '#FF6B6B' : strokeColor; // FF6B6B: 코랄

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 18 18`}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M9.00072 15L14.9039 9.20456L15.3559 8.69618C16.3581 7.25616 16.1752 5.32704 14.9159 4.09107C13.4763 2.67806 11.1343 2.67806 9.69438 4.09138L9.01456 4.75912L8.3024 4.05964C6.86249 2.64679 4.52077 2.64679 3.08166 4.05964C2.38399 4.74522 2 5.65522 2 6.62254C2 7.12477 2.10826 7.6292 2.31385 8.0872L2.37466 8.17532C2.55386 8.5452 2.7958 8.88096 3.09373 9.17376L3.80411 9.89851L9.00072 15Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
