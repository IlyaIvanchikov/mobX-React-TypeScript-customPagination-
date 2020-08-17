import React, { useContext } from 'react';
import classes from './main.module.scss';
import MainStore from '../../store/mainStore';

interface IMain {
  handleClickLeft: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleClickRight: (e: React.MouseEvent<HTMLDivElement>) => void;
  checkSummaruSize: (sizeItem: number) => void;
  filterPagination: () => string[];
}
const MainView = ({
  handleClickLeft,
  handleClickRight,
  checkSummaruSize,
  filterPagination,
}: IMain) => {
  const mainStore = useContext(MainStore);
  const { storePagination, handleClickPagination } = mainStore;
  const currentPage = storePagination.currentPage;

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
export default MainView;
