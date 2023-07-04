import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/header'; // TODO: 절대 경로로 변경

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FiNote',
  description: 'Fill Knowledge in your Note',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
