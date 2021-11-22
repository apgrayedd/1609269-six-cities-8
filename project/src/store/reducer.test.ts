import { DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT, SortingList } from '../const';
import { getByKey, sortHostels } from '../utils/common';
import { makeFakeHostel, makeFakeHostelComment } from '../utils/makeFakeHostel';
import {
  addCommentProperty,
  changeCity,
  changeCommentsProperty,
  changeHostelProperty,
  changeLoaderStatus,
  changeNearbyHostelsProperty,
  changeSorting
} from './action';
import { DataProcess } from './data-process/data-process';

describe('Тесты редьюсера', () => {
  it('Тест изменения города', () => {
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    expect(DataProcess(state, changeCity('Amsterdam'))).toEqual({
      isDataLoading: false,
      city: 'Amsterdam',
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест изменения статуса лоадера', () => {
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    expect(DataProcess(state, changeLoaderStatus(true))).toEqual({
      isDataLoading: true,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест изменения отеля для страницы предложения', () => {
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    const testHostel = makeFakeHostel();
    expect(DataProcess(state, changeHostelProperty(testHostel))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: testHostel,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест изменения комментариев для страницы предложения', () => {
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    const testCommenstHostel = [...Array(5)].fill(() => makeFakeHostelComment());
    expect(DataProcess(state, changeCommentsProperty(testCommenstHostel))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: testCommenstHostel,
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест изменения отелей поблизости для страницы предложения', () => {
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    const nearbyHostels = [...Array(3)].fill(() => makeFakeHostel());
    expect(DataProcess(state, changeNearbyHostelsProperty(nearbyHostels))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: nearbyHostels,
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест добавления комментария для страницы предложения', () => {
    const testCommenstHostel = [...Array(5)].fill(() => makeFakeHostelComment());
    const newComment = makeFakeHostelComment();
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: testCommenstHostel,
      sorting: DEFAULT_ACTIVE_SORT,
    };
    expect(DataProcess(state, addCommentProperty(newComment))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: [],
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: testCommenstHostel.concat(newComment),
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('Тест изменения сортировки отелей', () => {
    const testFilteredHostels = [...Array(3)].fill(() => makeFakeHostel());
    const testSortingName = getByKey(Object.values(SortingList), 'name')[Math.floor(Math.random() * Object.values(SortingList).length)];
    const sortingFilteredHostels = sortHostels(testFilteredHostels, testSortingName,DEFAULT_ACTIVE_CITY, testFilteredHostels);
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: testFilteredHostels,
      hostelProperty: undefined,
      filteredHostels: testFilteredHostels,
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    expect(DataProcess(state, changeSorting(testSortingName))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: testFilteredHostels,
      hostelProperty: undefined,
      filteredHostels: sortingFilteredHostels,
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: testSortingName,
    });
  });
});
