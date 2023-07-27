'use client';

import { useState } from 'react';
import Image from 'next/image';
import Tabs from '@/app/components/Tabs';

// TODO: 리소스 경로 관리
export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Tabs></Tabs>
    </div>
  );
}
