'use client';

import { getCookie } from 'cookies-next';
import HeaderView from '@/app/components/Header/HeaderView';

export default function HeaderContainer() {
  return <HeaderView accessToken={getCookie('accessToken') as string} />;
}
