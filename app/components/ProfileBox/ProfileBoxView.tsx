import Image from 'next/image';

export default function ProfileBoxView() {
  return (
    <div
      className={`w-[240px] h-[286px] flex flex-col items-center bg-white rounded-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]`}
    >
      <div className="w-[120px] h-[120px] rounded-[10px] overflow-hidden flex-shrink-0 mt-[40px]">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qL4TnNIt-zmP-lncsFEHdAbP3Hwn1z29vQ&usqp=CAU"
          alt="logo"
          width="120"
          height="120"
        />
      </div>
      <p className={`text-[16px] font-bold mt-[15px] mb-[20px]`}>춘식이</p>
      <div className="flex items-center w-[180px] h-[42px] rounded-[8px] bg-[#F4F5F7] px-[25px]">
        <span className="text-[#333333] text-[14px] font-medium">팔로워</span>
        <span className="text-[#00A1FF] text-[14px] font-bold ml-auto">1225</span>
      </div>
    </div>
  );
}
