import './globals.css';
import HeaderContainer from '@/components/common/Header/HeaderContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'FiNote',
  description: 'Fill Knowledge in your Note',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css"
        />
      </head>
      <body>
        <HeaderContainer />
        <ToastContainer />
        <div className="w-full h-[calc(100vh-76px)]">{children}</div>
      </body>
    </html>
  );
}
