import Image from 'next/image';

// TODO: 리소스 경로 관리
export default function SearchBar() {
  return (
    <div className="w-76 md:block hidden">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <Image className="" src="/magnifying-glass.svg" alt="search" width="20" height="20" />
        </span>
        <input
          className="placeholder:text-slate-400 block bg-white w-full border border-grey rounded-lg py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          placeholder="무엇이든 검색해보세요!"
          type="text"
          name="search"
        />
      </label>
    </div>
  );
}
