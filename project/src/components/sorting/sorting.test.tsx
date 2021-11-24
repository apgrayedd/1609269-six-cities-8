import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { getByKey } from '../../utils/common';
import Sorting from './sorting';
import {SortingList} from '../../const';

describe('Компонент: Sorting', () => {
  const sortingNames = getByKey(Object.values(SortingList), 'name');
  const testSortingName = sortingNames[Math.floor(Math.random() * Object.values(SortingList).length)];
  const sortingNamesWithoutActiveSort = sortingNames.filter((name:string) => name !== testSortingName);
  const mockStore = configureMockStore();
  const store = mockStore({
    'DATA': {
      sorting: testSortingName,
    },
  });
  const history = createMemoryHistory();

  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Sorting />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText(testSortingName).length).toBe(2);
    sortingNamesWithoutActiveSort.forEach((name:string) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
