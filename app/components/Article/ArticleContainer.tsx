'use client';
import { useState, useRef, useEffect } from 'react';
import { SIDEPANEL_OPTION_LIST } from '@/constants/sidePanel';
import {
  useTooltipStore,
  useSidePanelStore,
  useDragTextStore,
  useSelectedTextStore,
  useAISearchStore,
} from '@/store/sidePanel';
import ArticleView from '@/app/components/Article/ArticleView';

interface PropsType {
  pageId: string;
}

// 프로미스 객체를 반환하는 함수
async function getArticle(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch article data');
  }
  return res.json();
}

export default function ArticleContainer({ pageId }: PropsType) {
  const { setDragText } = useDragTextStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const toolTip = useRef<HTMLDivElement>(null);
  const [articleData, setArticleData] = useState({
    title: '',
    body: '',
    authorNickname: '',
    createDate: '',
  });

  const { setSelectedMode } = useTooltipStore();
  const { setIsOpenSidePanel } = useSidePanelStore();
  const { dragText } = useDragTextStore();
  const { setSelectedText } = useSelectedTextStore();
  const { setIsLoadingAISearchResult } = useAISearchStore();

  // 툴팁에서 모드 선택
  const handleClick = (selectedText: string) => {
    setSelectedText(dragText); // 사이드 패널에 드래그 텍스트 업데이트
    setSelectedMode(selectedText); // 선택된 모드 변경
    setIsOpenSidePanel(true); // 사이드 패널 열기
    setShowTooltip(false); // 툴팁 닫기

    // 로딩 스피너 띄우고, 결과 받아오기
    if (selectedText === SIDEPANEL_OPTION_LIST[0] && dragText !== '') {
      setIsLoadingAISearchResult(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const articleResponse = await getArticle(pageId);
      const data = articleResponse.data;

      setArticleData(data);
    }

    fetchData();
  }, [pageId]);

  const handleDragStart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
    // 클릭 or 드래그 구간이 4px 이하인 경우, 유의미한 드래그가 아니므로 툴팁 X
    // TODO: 이걸 본문 뿐만 아니라, 바깥 영역 전체에 대해 감지해야됨, 전역 상태 코드로 변경 필요
    if (dragStartX.current == e.clientX || dragStartX.current >= e.clientX - 4) {
      setShowTooltip(false);
      return;
    }

    // 드래그된 텍스트 저장
    setDragText(window.getSelection()!.toString());

    const eventTarget = e.currentTarget as HTMLDivElement;
    const rect = eventTarget.getBoundingClientRect();
    const offsetY = dragStartY.current - rect.top - 55;
    const offsetX = dragStartX.current - rect.left - 5;

    // 툴팁에 상대적 위치 설정
    if (!toolTip.current) return;
    toolTip.current.setAttribute('style', `top: ${offsetY}px; left: ${offsetX}px`);
    setShowTooltip(true);
  };

  return (
    <ArticleView
      ref={toolTip}
      title={articleData.title}
      authorNickname={articleData.authorNickname}
      createDate={articleData.createDate}
      contents={articleData.body}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      handleTooltipClick={handleClick}
      showTooltip={showTooltip}
    ></ArticleView>
  );
}
