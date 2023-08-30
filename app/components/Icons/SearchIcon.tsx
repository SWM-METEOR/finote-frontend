'use client';
import React from 'react';

interface PropsType {
  width?: number;
  height?: number;
  strokeColor?: string;
}

export default function SearchIcon({
  width = 30,
  height = 30,
  strokeColor = '#CCCCCC',
}: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.7279"
        cy="12"
        r="9"
        transform="rotate(-45 11.7279 12)"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <path
        d="M18.1338 19.6L23.0835 24.5497"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
