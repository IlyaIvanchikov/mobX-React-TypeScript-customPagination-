import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import classes from './main.module.scss';
import MainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';

const Main: React.FC = () => {
  const mainStore = useContext(MainStore);
  const {
    storePagination,
    handleClickPagination,
    countItemPagination,
    decrementPortionSize,
    incrementPortionSize,
    handleNextItem,
    handlePrevItem,
  } = mainStore;
  const [size, setSize] = useState<number>(window.innerWidth);
  const [summarySize, setSummarySize] = useState<any>([]);
  const namePage = storePagination.namePage;
  const currentPage = storePagination.currentPage;
  const portionSize = storePagination.portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const portionCount = Math.ceil(countItemPagination / portionSize);
  const lastCountPagination =
    countItemPagination - (portionCount - 1) * portionSize;
  const leftPortPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortPageNumber = portionNumber * portionSize;
  const arrItem: number[] = [];

  const checkSummaruSize = (sizeItem: number) => {
    arrItem.push(sizeItem);
    const sumWidth = arrItem.reduce((sum: number, current: number) => {
      return sum + current;
    }, 0);
    setSummarySize(sumWidth + 110);
  };

  const filterPagination = () => {
    return namePage.filter(
      (item: string, index: number) =>
        index + 1 >= leftPortPageNumber && index + 1 <= rightPortPageNumber
    );
  };

  const limitPageCount = size / 2;
  const handleClickRight = () => {
    const currentSign = Math.sign(countItemPagination - rightPortPageNumber);
    if (currentPage === portionSize && currentSign !== 0) {
      setPortionNumber(portionNumber + 1);
      handleNextItem();
    } else if (
      (currentSign === 0 || currentSign === -1) &&
      lastCountPagination === currentPage
    ) {
      setPortionNumber(1);
      handleNextItem();
    } else {
      handleNextItem(1);
    }
  };

  const handleClickLeft = () => {
    if (leftPortPageNumber === 1 && currentPage === 1) {
      setPortionNumber(portionCount);
      handlePrevItem(lastCountPagination);
    } else if (currentPage === 1 && portionNumber !== 1) {
      setPortionNumber(portionNumber - 1);
      handlePrevItem(portionSize);
    } else {
      handlePrevItem();
    }
  };

  useLayoutEffect(() => {
    // portionCount = Math.ceil(countItemPagination / portionSize);
    // const lenArrItem = arrItem.length;
    // console.log(lenArrItem, arrItem, summarySize);
    if (limitPageCount > summarySize + 250) {
      incrementPortionSize();
    } else if (limitPageCount < summarySize + 50 && portionSize > 1) {
      decrementPortionSize();
    }
  }, [size, portionSize]);
  // console.log(size, limitPageCount, summarySize, portionSize);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    // setSlidesPerView(() => (size <= 375 ? 1 : 2));
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [size]);

  useEffect(() => {
    
  })
  const updateWidth = () => {
    setSize(window.innerWidth);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.paginationWrapper}>
        <div className={classes.pagination} onClick={handleClickLeft}>
          {`<`}
        </div>
        {filterPagination().map((item: string, index: number) => (
          <div
            className={
              currentPage === index + 1
                ? classes.selectedPage
                : classes.pagination
            }
            ref={(el: HTMLDivElement | null) => {
              if (!el) {
                return;
              }
              checkSummaruSize(el.getBoundingClientRect().width);
            }}
            key={Math.random() * index}
            onClick={() => handleClickPagination(index + 1)}
          >
            {item}
          </div>
        ))}
        <div className={classes.pagination} onClick={handleClickRight}>
          {`>`}
        </div>
      </div>
    </div>
  );
};
export default observer(Main);
