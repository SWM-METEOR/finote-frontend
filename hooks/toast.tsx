'use client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useToast() {
  const showErrorToast = (message: string) => {
    console.log(message);
    toast.error(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const showSuccessToast = (message: string) => {
    toast.success(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return [showErrorToast, showSuccessToast];
}
