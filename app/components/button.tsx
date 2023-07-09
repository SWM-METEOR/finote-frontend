'use client';

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center px-5 md:w-[363px] w-full h-14 border flex gap-2 border-grey rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
      {children}
    </button>
  );
}
