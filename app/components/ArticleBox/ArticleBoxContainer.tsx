'use client';

import ArticleBoxView from '@/app/components/ArticleBox/ArticleBoxView';

export default function ArticleBoxContainer() {
  // 데이터 패칭
  // -> 무한 스크롤이라서 더 상위에서 데이터 패칭을 하는게 나을지? 고민해보기

  // TODO: Link로 감싸서 라우팅 처리

  return <ArticleBoxView />;
}
