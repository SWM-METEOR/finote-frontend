import React, { useRef, forwardRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import TrendsArticleBox from '@/app/components/TrendsArticleList/TrendsArticleBox';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useScroll } from '@use-gesture/react';
interface PropsType {
  articleList: {
    id: number;
    title: string;
    body: string;
    totalLike: number;
    reply: number;
    authorNickname: string;
    date: string;
    thumbnail: string;
  }[];
  loadMoreItems: () => Promise<void>;
}

// TODO: 고차 컴포넌트로 분리

export default function TrendsArticleListView({ articleList, loadMoreItems }: PropsType) {
  const itemCount = articleList.length + 1; // +1 for loading indication
  const itemWidth = 440;
  const itemHeight = 250;

  const isItemLoaded = (index: number) => index < articleList.length;

  return (
    <div className="w-full h-full mt-[40px]">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.ceil(width / itemWidth);
          const rowCount = Math.ceil(itemCount / columnCount);
          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  // className="grid grid-cols-3 main-md:grid-cols-2 main-sm:grid-cols-1 gap-[40px]"
                  style={{ overflowX: 'hidden' }}
                  columnCount={columnCount}
                  rowCount={rowCount}
                  columnWidth={itemWidth}
                  rowHeight={itemHeight}
                  width={width}
                  height={height}
                  ref={ref}
                  outerElementType={outerElementType}
                  onItemsRendered={(gridProps) => {
                    onItemsRendered({
                      overscanStartIndex: gridProps.overscanRowStartIndex * columnCount,
                      overscanStopIndex: gridProps.overscanRowStopIndex * columnCount,
                      visibleStartIndex: gridProps.visibleRowStartIndex * columnCount,
                      visibleStopIndex: gridProps.visibleRowStopIndex * columnCount,
                    });
                  }}
                >
                  {({ columnIndex, rowIndex, style }) => {
                    const index = rowIndex * columnCount + columnIndex;
                    const article = articleList[index];

                    // if (!article) {
                    //   return <div style={style}>로딩중...</div>;
                    // }

                    if (!article) {
                      return null;
                    }

                    return (
                      <div style={style}>
                        <TrendsArticleBox key={article.id} {...article} />
                      </div>
                    );
                  }}
                </Grid>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </div>
  );
}
const emptyFunction = (): void => {
  return;
};

type DocumentPropsType = React.HTMLProps<HTMLElement>;

// eslint-disable-next-line react/display-name
export const outerElementType = forwardRef<HTMLElement, DocumentPropsType>(
  ({ onScroll, children }, forwardedRef) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useScroll(
      () => {
        if (!(onScroll instanceof Function)) {
          return;
        }

        const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollHeight, scrollWidth } =
          document.documentElement;

        if (onScroll != null) {
          onScroll({
            currentTarget: {
              clientHeight,
              clientWidth,
              scrollLeft,
              addEventListener: emptyFunction,
              removeEventListener: emptyFunction,
              dispatchEvent: () => false,
              scrollTop:
                scrollTop -
                (containerRef.current
                  ? containerRef.current.getBoundingClientRect().top + scrollTop
                  : 0),
              scrollHeight,
              scrollWidth,
            },
          } as unknown as React.UIEvent<HTMLElement>);
        }
      },
      { target: window }
    );

    if (forwardedRef != null && !(forwardedRef instanceof Function)) {
      forwardedRef.current = document.documentElement;
    }

    return (
      <div ref={containerRef} style={{ position: 'relative' }}>
        {children}
      </div>
    );
  }
);
