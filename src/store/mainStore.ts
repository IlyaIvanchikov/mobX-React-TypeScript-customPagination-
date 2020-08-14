import { observable, action, computed } from 'mobx';
import { createContext } from 'react';

export interface IStore {
  currentPage: number;
  portionSize: number;
  // portionNumber: number;
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
    portionSize: 5,
    // portionNumber: 1,
  };

  @action handleClickPagination = (id: number) => {
    this.storePagination.currentPage = id;
  };

  @computed get countItemPagination(): number {
    return this.storePagination.namePage.length;
  }
}

export default createContext(new MainStore());
