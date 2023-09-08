import UploadIcon from '@/components/Icons/UploadIcon';
import NewButton from '@/components/common/buttonWithSpinner';
import Link from 'next/link';

export default function AdditionalInfoPage({ params }: { params: { nickname: string } }) {
  return (
    <div className="w-full h-full">
      <div className="w-[500px] flex flex-col justify-center mx-auto py-[80px]">
        <h1 className="self-center font-bold text-[40px] mb-[50px]">가입이 완료되었습니다.</h1>
        <p className="font-bold text-[20px] mb-[12px]">추가정보 입력</p>
        <div className="w-full h-[2px] bg-black mb-[25px]"></div>
        <div className="">
          <p className="font-bold text-[14px] mb-[10px]">프로필 이미지</p>
          <div className="flex items-start gap-[15px] mb-[25px]">
            <div className="w-[120px] h-[120px] bg-grey rounded-[10px]">사진 미리보기</div>
            <button className="text-[#00A1FF] font-bold text-[14px] flex items-center gap-[7px]">
              <UploadIcon width={20} height={20} color="#00A1FF" />
              <span>업로드</span>
            </button>
          </div>
        </div>
        <div className="mb-[25px]">
          <p className="font-bold text-[14px] mb-[10px]">닉네임</p>
          <input
            type="text"
            placeholder="최대 10자, 영문, 한글, 숫자 입력 가능"
            className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
          />
        </div>
        <div className="mb-[25px]">
          <p className="font-bold text-[14px] mb-[10px]">블로그 이름</p>
          <input
            type="text"
            placeholder="블로그 이름을 입력해주세요."
            className="w-full h-[50px] border border-[#DDDDDD] rounded-[10px] px-[20px] focus:outline-none"
          />
        </div>
        {/* 버튼들 */}
        <div className="mb-[15px]">
          <NewButton width={500} height={50} fillColor="main" textColor="white" roundRate={15}>
            저장하기
          </NewButton>
        </div>
        <Link href="/" className="mb-[40px]">
          <NewButton
            width={500}
            height={50}
            fillColor="lightGrey"
            textColor="darkGrey"
            roundRate={15}
          >
            다음에 할게요
          </NewButton>
        </Link>
        <p className="self-center text-[14px] text-[#666666]">
          추후 마이페이지에서 변경 가능합니다.
        </p>
      </div>
    </div>
  );
}
