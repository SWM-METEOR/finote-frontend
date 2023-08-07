import create from 'zustand';

interface LoginTypes {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const isLoginStore = create<LoginTypes>((set) => ({
  isLogin: false,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
}));
