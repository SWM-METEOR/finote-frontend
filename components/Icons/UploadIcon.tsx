'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}
export default function UploadIcon({ width = 20, height = 20, color = '#00A1FF' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.16 15H14.32C16.9047 15 19 13.0088 19 10.5526C19 8.44767 17.4611 6.68426 15.3941 6.22296C15.2711 3.87101 13.2255 2 10.72 2C8.77316 2 7.10396 3.12966 6.39868 4.73684H5.32C3.72942 4.73684 2.44 5.96217 2.44 7.47368C2.44 7.89829 2.54175 8.30031 2.72334 8.65893C1.68972 9.26011 1 10.343 1 11.5789C1 13.4683 2.61178 15 4.6 15H7.2"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.1757 10.6373L10 8.46155L7.82429 10.6373"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 9L10 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
