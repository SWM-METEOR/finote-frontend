'use client';
import { useState } from 'react';

export default function Editor() {
  const [value, setValue] = useState('');
  console.log(value);

  return (
    <div className="w-full">
      <textarea
        className={`input border-[2px] border-main rounded aappearance-none w-full px-3 py-3 focus focus:outline-none active:outline-none`}
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder="내용을 입력하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}
