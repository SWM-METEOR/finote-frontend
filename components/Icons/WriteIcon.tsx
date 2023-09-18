'use client';

interface PropsType {
  width?: number;
  height?: number;
  color?: string;
}

export default function WriteIcon({ width = 16, height = 17, color = 'white' }: PropsType) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2_1049)">
        <path
          d="M0.633301 15.0668L2.00763 10.6313L5.14686 13.7706L0.633301 15.0668Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.1738 2.46559L2.0083 10.6311L5.14911 13.7719L13.3146 5.6064L10.1738 2.46559Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2543 2.77989L12.9982 1.52378C12.4788 1.00444 11.6344 1.00444 11.1129 1.52378L10.1714 2.46533L13.3127 5.60667L14.2543 4.66511C14.7736 4.14578 14.7736 3.30133 14.2543 2.77989Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.663086 15.0667H14.5964"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_1049">
          <rect width="16" height="16" fill={color} transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
