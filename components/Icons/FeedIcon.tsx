'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}
export default function FeedIcon({ width = 20, height = 20, color = '#999999' }: PropsType) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="1.65"
        y="1.65"
        width="16.7"
        height="16.7"
        rx="1.85"
        stroke={color}
        strokeWidth="1.3"
      />
      <mask id="path-2-inside-1_4_1108" fill="white">
        <rect x="5" y="5" width="6" height="4" rx="1" />
      </mask>
      <rect
        x="5"
        y="5"
        width="6"
        height="4"
        rx="1"
        stroke={color}
        strokeWidth="2.6"
        mask="url(#path-2-inside-1_4_1108)"
      />
      <line
        x1="5.65"
        y1="11.35"
        x2="14.35"
        y2="11.35"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="5.65"
        y1="14.35"
        x2="14.35"
        y2="14.35"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
