import React, { useContext, useState, useEffect } from 'react';
import MainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';
import MainView from './main.view';

const Main: React.FC = () => {
  const mainStore = useContext(MainStore);
  const {
    storePagination,
    countItemPagination,
    decrementPortionSize,
    incrementPortionSize,
    handleNextItem,
    handlePrevItem,
  } = mainStore;
  const [size, setSize] = useState<number>(window.innerWidth);
  const [summarySize, setSummarySize] = useState<number>(0);
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
      handlePrevItem(rightPortPageNumber - leftPortPageNumber + 1);
    } else {
      handlePrevItem();
    }
  };

  useEffect(() => {
    if (limitPageCount > summarySize + 300) {
      incrementPortionSize();
    } else if (limitPageCount < summarySize + 100 && portionSize > 1) {
      decrementPortionSize();
    }
  }, [size]);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  });

  const updateWidth = () => {
    setSize(window.innerWidth);
  };

  return (
    <MainView
      handleClickLeft={handleClickLeft}
      handleClickRight={handleClickRight}
      checkSummaruSize={checkSummaruSize}
      filterPagination={filterPagination}
    />
  );
};
export default observer(Main);
