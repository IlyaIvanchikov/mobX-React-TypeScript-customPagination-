import React, { useContext, useState } from 'react';
import classes from './main.module.scss';
import MainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';

const Main: React.FC = () => {
  const mainStore = useContext(MainStore);
  const {
    storePagination,
    handleClickPagination,
    countItemPagination,
  } = mainStore;
  const namePage = storePagination.namePage;
  const currentPage = storePagination.currentPage;
  const portionSize = storePagination.portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(1);
  // const portionNumber = storePagination.portionNumber;
  const portionCount = Math.ceil(countItemPagination / portionSize);
  const leftPortPageNumber = (portionNumber - 1) * portionSize - 1;
  const rightPortPageNumber = portionNumber * portionSize;

  return (
    <div className={classes.wrapper}>
      {portionNumber > 1 && (
        <div
          className={classes.pagination}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          left
        </div>
      )}
      {/* {namePage.map((item: string, index: number) => (
        <div
          className={
            currentPage === index + 1
              ? classes.selectedPage
              : classes.pagination
          }
          key={Math.random() * index}
          onClick={() => handleClickPagination(index + 1)}
        >
          {item}
        </div>
      ))} */}
      {namePage
        .filter(
          (item: string, index: number) =>
            index >= leftPortPageNumber && index <= rightPortPageNumber
        )
        .map((item: string, index: number) => (
          <div
            className={
              currentPage === index + 1
                ? classes.selectedPage
                : classes.pagination
            }
            key={Math.random() * index}
            onClick={() => handleClickPagination(index + 1)}
          >
            {item}
          </div>
        ))}
      {portionCount > portionNumber && (
        <div
          className={classes.pagination}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          right
        </div>
      )}
    </div>
  );
};
export default observer(Main);
