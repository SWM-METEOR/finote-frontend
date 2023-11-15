'use client';

// import { useState, useEffect } from 'react';
// import axiosInstance from '@/utils/axios';

import QnAView from '@/components/SmartDrag/QnA/QnAView';
import { useSelectedTextStore } from '@/store/sidePanel';

export default function QnAContainer() {
  const { selectedText } = useSelectedTextStore();

  return <QnAView selectedText={selectedText} />;
}
