import Image from 'next/image';
import logoImg from '../public/logo.png';

// TODO: 리소스 경로 관리
export default function SearchBar() {
  return (
    <div className="w-96">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <input
          className="placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-lg py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="무엇이든 검색해보세요!"
          type="text"
          name="search"
        />
      </label>
    </div>
  );
}
