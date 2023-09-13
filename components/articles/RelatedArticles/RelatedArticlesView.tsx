import Image from 'next/image';

import RelatedArticleBox from '@/components/articles/ArticlePreview/RelatedArticleBox';
import ArticlePreviewType from '@/types/Article';

interface PropsType {
  relatedArticlesData: {
    keyword: string;
    articleList: ArticlePreviewType[];
  }[];
}

export default function RelatedArticlesView({ relatedArticlesData }: PropsType) {
  return (
    <div className="my-[50px]">
      <p className="text-[24px] font-bold my-[40px]">관련 아티클</p>
      <div className="flex flex-col gap-[50px]">
        {relatedArticlesData.map((relatedArticle, index) => (
          <div key={index}>
            <p className="flex gap-[8px] text-[#333333] text-[18px] font-bold mb-[20px]">
              <Image src="/article.svg" alt="keyword" width="20" height="20" />
              <span>{relatedArticle.keyword}</span>
            </p>
            <div className="flex gap-[20px] overflow-x-auto">
              {relatedArticle.articleList.map((article) => (
                <RelatedArticleBox key={article.id} {...article} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
