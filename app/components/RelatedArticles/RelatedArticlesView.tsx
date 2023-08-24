import Image from 'next/image';
import RelatedArticleBox from '@/app/components/RelatedArticles/RelatedArticleBox';

export default function RelatedArticlesView() {
  return (
    <div className="my-[50px]">
      <p className="text-[24px] font-bold my-[40px]">관련 아티클</p>
      <div className="flex flex-col gap-[50px]">
        <div className="">
          <p className=" flex gap-[8px] text-[#333333] text-[18px] font-bold mb-[20px]">
            <Image src="/article.svg" alt="keyword" width="20" height="20" />
            <span>Kakao 로그인 구현하기</span>
          </p>
          <div className="flex gap-[20px] overflow-x-auto">
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
          </div>
        </div>
        <div>
          <p className="flex gap-[8px] text-[#333333] text-[18px] font-bold mb-[20px]">
            <Image src="/article.svg" alt="keyword" width="20" height="20" />
            <span>Kakao 로그인 구현하기</span>
          </p>
          <div className="flex gap-[20px] overflow-x-auto">
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
            <RelatedArticleBox />
          </div>
        </div>
      </div>
    </div>
  );
}
