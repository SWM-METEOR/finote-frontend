import SearchIcon from '@/components/Icons/SearchIcon';

export default function SearchBarView() {
  return (
    <>
      <div className="w-[260px] h-[40px] flex main-sm:hidden border-[#00A1FF] border-b">
        <input
          className="placeholder:text-slate-400 bg-white w-full py-2 pr-1 focus:outline-none transition duration-150"
          placeholder="무엇이든 검색해보세요!"
          type="text"
          name="search"
        />
        <button className="flex items-center pl-2">
          <SearchIcon width={20} height={20} strokeColor="#00A1FF"></SearchIcon>
        </button>
      </div>
      <button className="hidden main-sm:block">
        <SearchIcon width={30} height={30} strokeColor="#666666"></SearchIcon>
      </button>
    </>
  );
}
