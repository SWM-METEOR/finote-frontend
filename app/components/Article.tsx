'use client';
import { useEffect, useState, useRef } from 'react';

// TODO: data 를 props로 받아와야 함
export default function Article() {
  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const toolTip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

  const handleDragStart = (e: React.MouseEvent<Element, MouseEvent>) => {
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
  };

  const handleDragEnd = (e: React.MouseEvent<Element, MouseEvent>) => {
    // 클릭 or 드래그 구간이 4px 이하인 경우, 유의미한 드래그가 아니므로 툴팁 X
    // TODO: 이걸 본문 뿐만 아니라, 바깥 영역 전체에 대해 감지해야됨, 전역 상태 도입 필요
    if (dragStartX.current == e.clientX || dragStartX.current >= e.clientX - 4) {
      setShowTooltip(false);
      return;
    }

    // 드래그된 문장
    setSelectedText(window.getSelection()!.toString());

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
    <div className="relative">
      {/* 툴팁 크기: 260px */}
      <div
        ref={toolTip}
        className={
          `z-999 w-[260px] absolute flex gap-2 divide-x divide-grey justify-between items-center bg-white border-1 border-grey rounded-lg py-1 px-2 drop-shadow-xl` +
          (showTooltip ? ' block' : ' hidden')
        }
      >
        <button className="pl-1">배우기</button>
        <button className="pl-2">관련 아티클</button>
        <button className="pl-2 pr-1">질문 생성</button>
      </div>
      <div
        className="w-full"
        onMouseUp={(e) => handleDragEnd(e)}
        onMouseDown={(e) => handleDragStart(e)}
      >
        데이터 분석은 현대 사회에서 많은 분야에서 중요한 역할을 담당하고 있습니다. 데이터를 분석하고
        해석하는 과정에서 중요한 개념 중 하나는 누적합(cumulative sum)입니다. 누적합은 데이터의
        변화를 추적하고 추이를 파악하는 데에 유용하며, 이를 파이썬을 통해 계산하는 방법을
        알아보겠습니다. 누적합의 개념 누적합은 각 항목의 값을 이전 항목들과 더한 결과를 순차적으로
        계산한 값입니다. 예를 들어, [1, 2, 3, 4, 5]라는 리스트가 있다면 누적합은 [1, 3, 6, 10, 15]로
        계산됩니다. 누적합을 계산하면 데이터의 증가 또는 감소 추이를 파악할 수 있습니다.
        파이썬에서의 누적합 계산 파이썬에서는 다양한 방법으로 누적합을 계산할 수 있습니다. 가장
        간단한 방법은 for 루프를 사용하여 이전 항목과 현재 항목을 더해가는 방식입니다. 또한, NumPy와
        Pandas 라이브러리를 활용하면 효율적으로 누적합을 계산할 수 있습니다. for 루프를 사용한
        누적합 계산 아래의 예시 코드를 통해 for 루프를 사용한 누적합 계산 방법을 살펴봅시다.
        누적합은 데이터 분석에서 중요한 개념으로, 데이터의 추이와 변화를 파악하는 데에 유용합니다.
        파이썬에서는 for 루프를 사용하거나 NumPy와 Pandas 라이브러리를 활용하여 효율적으로 누적합을
        계산할 수 있습니다. 데이터 분석 작업에서 누적합을 적절히 활용하면 데이터의 동향을 더 잘
        이해하고 의사 결정에 도움을 줄 수 있습니다. 데이터 분석은 현대 사회에서 많은 분야에서 중요한
        역할을 담당하고 있습니다. 데이터를 분석하고 해석하는 과정에서 중요한 개념 중 하나는
        누적합(cumulative sum)입니다. 누적합은 데이터의 변화를 추적하고 추이를 파악하는 데에
        유용하며, 이를 파이썬을 통해 계산하는 방법을 알아보겠습니다. 누적합의 개념 누적합은 각
        항목의 값을 이전 항목들과 더한 결과를 순차적으로 계산한 값입니다. 예를 들어, [1, 2, 3, 4,
        5]라는 리스트가 있다면 누적합은 [1, 3, 6, 10, 15]로 계산됩니다. 누적합을 계산하면 데이터의
        증가 또는 감소 추이를 파악할 수 있습니다. 파이썬에서의 누적합 계산 파이썬에서는 다양한
        방법으로 누적합을 계산할 수 있습니다. 가장 간단한 방법은 for 루프를 사용하여 이전 항목과
        현재 항목을 더해가는 방식입니다. 또한, NumPy와 Pandas 라이브러리를 활용하면 효율적으로
        누적합을 계산할 수 있습니다. for 루프를 사용한 누적합 계산 아래의 예시 코드를 통해 for
        루프를 사용한 누적합 계산 방법을 살펴봅시다. 누적합은 데이터 분석에서 중요한 개념으로,
        데이터의 추이와 변화를 파악하는 데에 유용합니다. 파이썬에서는 for 루프를 사용하거나 NumPy와
        Pandas 라이브러리를 활용하여 효율적으로 누적합을 계산할 수 있습니다. 데이터 분석 작업에서
        누적합을 적절히 활용하면 데이터의 동향을 더 잘 이해하고 의사 결정에 도움을 줄 수 있습니다.
        데이터 분석은 현대 사회에서 많은 분야에서 중요한 역할을 담당하고 있습니다. 데이터를 분석하고
        해석하는 과정에서 중요한 개념 중 하나는 누적합(cumulative sum)입니다. 누적합은 데이터의
        변화를 추적하고 추이를 파악하는 데에 유용하며, 이를 파이썬을 통해 계산하는 방법을
        알아보겠습니다. 누적합의 개념 누적합은 각 항목의 값을 이전 항목들과 더한 결과를 순차적으로
        계산한 값입니다. 예를 들어, [1, 2, 3, 4, 5]라는 리스트가 있다면 누적합은 [1, 3, 6, 10, 15]로
        계산됩니다. 누적합을 계산하면 데이터의 증가 또는 감소 추이를 파악할 수 있습니다.
        파이썬에서의 누적합 계산 파이썬에서는 다양한 방법으로 누적합을 계산할 수 있습니다. 가장
        간단한 방법은 for 루프를 사용하여 이전 항목과 현재 항목을 더해가는 방식입니다. 또한, NumPy와
        Pandas 라이브러리를 활용하면 효율적으로 누적합을 계산할 수 있습니다. for 루프를 사용한
        누적합 계산 아래의 예시 코드를 통해 for 루프를 사용한 누적합 계산 방법을 살펴봅시다.
        누적합은 데이터 분석에서 중요한 개념으로, 데이터의 추이와 변화를 파악하는 데에 유용합니다.
        파이썬에서는 for 루프를 사용하거나 NumPy와 Pandas 라이브러리를 활용하여 효율적으로 누적합을
        계산할 수 있습니다. 데이터 분석 작업에서 누적합을 적절히 활용하면 데이터의 동향을 더 잘
        이해하고 의사 결정에 도움을 줄 수 있습니다. 데이터 분석은 현대 사회에서 많은 분야에서 중요한
        역할을 담당하고 있습니다. 데이터를 분석하고 해석하는 과정에서 중요한 개념 중 하나는
        누적합(cumulative sum)입니다. 누적합은 데이터의 변화를 추적하고 추이를 파악하는 데에
        유용하며, 이를 파이썬을 통해 계산하는 방법을 알아보겠습니다. 누적합의 개념 누적합은 각
        항목의 값을 이전 항목들과 더한 결과를 순차적으로 계산한 값입니다. 예를 들어, [1, 2, 3, 4,
        5]라는 리스트가 있다면 누적합은 [1, 3, 6, 10, 15]로 계산됩니다. 누적합을 계산하면 데이터의
        증가 또는 감소 추이를 파악할 수 있습니다. 파이썬에서의 누적합 계산 파이썬에서는 다양한
        방법으로 누적합을 계산할 수 있습니다. 가장 간단한 방법은 for 루프를 사용하여 이전 항목과
        현재 항목을 더해가는 방식입니다. 또한, NumPy와 Pandas 라이브러리를 활용하면 효율적으로
        누적합을 계산할 수 있습니다. for 루프를 사용한 누적합 계산 아래의 예시 코드를 통해 for
        루프를 사용한 누적합 계산 방법을 살펴봅시다. 누적합은 데이터 분석에서 중요한 개념으로,
        데이터의 추이와 변화를 파악하는 데에 유용합니다. 파이썬에서는 for 루프를 사용하거나 NumPy와
        Pandas 라이브러리를 활용하여 효율적으로 누적합을 계산할 수 있습니다. 데이터 분석 작업에서
        누적합을 적절히 활용하면 데이터의 동향을 더 잘 이해하고 의사 결정에 도움을 줄 수 있습니다.
      </div>
    </div>
  );
}
