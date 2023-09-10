import create from 'zustand';

interface BlogNameTypes {
  blogName: string;
  setBlogName: (value: string) => void;
}

export const userBlogNameStore = create<BlogNameTypes>((set) => ({
  blogName: '',
  setBlogName: (value) => set(() => ({ blogName: value })),
}));
