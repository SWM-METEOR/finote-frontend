'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}
export default function TrendsIcon({ width = 20, height = 20, color = '#999999' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8.5"
        y="11"
        width="4"
        height="8"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <rect
        x="15.5"
        y="7"
        width="4"
        height="12"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 10L7.42593 4.44444L10.0926 6.94444L17.5 1"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 1H17.5V4"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.5"
        y="13"
        width="4"
        height="6"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
