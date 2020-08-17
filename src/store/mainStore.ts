import { observable, action, computed } from 'mobx';
import { createContext } from 'react';

export interface IStore {
  currentPage: number;
  portionSize: number;
  namePage: string[];
}

class MainStore {
  @observable storePagination: IStore = {
    currentPage: 1,
    namePage: [
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'nineth',
      'tenth',
      'eleventh',
      'twelfth',
      'thirteenth',
      'fourteenth',
      'fifteenth',
      'sixteenth',
      'seventeenth',
      'eighteenth',
    ],
    portionSize: 3,
  };

  @action handleClickPagination = (id: number) => {
    this.storePagination.currentPage = id;
  };

  @action handleNextItem = (id = -1) => {
    if (id === -1) {
      this.storePagination.currentPage = 1;
    } else {
      this.storePagination.currentPage = this.storePagination.currentPage + id;
    }
  };

  @action handlePrevItem = (id = -1) => {
    id === -1
      ? (this.storePagination.currentPage =
          this.storePagination.currentPage - 1)
      : (this.storePagination.currentPage = id);
  };

  @action incrementPortionSize = () => {
    this.storePagination.portionSize = this.storePagination.portionSize + 1;
  };

  @action decrementPortionSize = () => {
    this.storePagination.portionSize = this.storePagination.portionSize - 1;
  };

  @computed get countItemPagination(): number {
    return this.storePagination.namePage.length;
  }
}

export default createContext(new MainStore());
