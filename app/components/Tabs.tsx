'use client';

import { useState } from 'react';
import Image from 'next/image';

const tabList = ['AI 검색', '관련 아티클', '질문하기'];
export default function Tabs() {
  const [activeTab, setActiveTab] = useState('default');

  const clickTab = () => {};

  return (
    <>
      <div className="tabs h-10 mr-1 color-main shadow-lg mb-4 mt-1 rounded-md">
        {tabList.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tabList[index])}
            className={`h-full tab tab-lifted w-1/3 rounded ${
              activeTab === tabList[index] ? 'tab-active bg-middleGrey' : ''
            } ${activeTab !== tabList[index] ? 'hover:bg-grey' : ''}`} // 활성 탭에 'tab-active' 클래스 적용
          >
            <span className="mb-4">{tab}</span>
          </button>
        ))}

        {activeTab === 'default' && <div>궁금한 내용을 드래그해보세요!</div>}
        {activeTab === tabList[0] && <div>탭 1의 내용</div>}
        {activeTab === tabList[1] && <div>탭 2의 내용</div>}
        {activeTab === tabList[2] && <div>탭 3의 내용</div>}
      </div>
    </>
  );
}
