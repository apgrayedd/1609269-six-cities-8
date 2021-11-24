import { Cities, DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT, SortingList } from '../../const';
import { Comment } from '../../types/comment';
import { Hostel } from '../../types/hostel';
import { getByKey, sortHostels } from '../../utils/common';
import { makeFakeHostel, makeFakeHostelComment } from '../../utils/makeFakeHostel';
import {
  addCommentProperty,
  changeCity,
  changeCommentsProperty,
  changeHostelProperty,
  changeHostels,
  changeLoaderStatus,
  changeNearbyHostelsProperty,
  changeSorting
} from '../action';
import { DataProcess } from './data-process';

describe('Редьюсер: Data-Process', () => {
  it('изменение города', () => {
    const newCity = Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)].toLowerCase();
    const testHostels:Hostel[] = [...Array(5)].fill(makeFakeHostel());
    const filteredTestHostels = testHostels.filter((hostel) =>
      hostel.city.name.toLowerCase() === newCity.toLowerCase());
    const state = {
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: testHostels,
      hostelProperty: undefined,
      filteredHostels: [],
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    };
    expect(DataProcess(state, changeCity(newCity))).toEqual({
      isDataLoading: false,
      city: newCity,
      hostels: testHostels,
      hostelProperty: undefined,
      filteredHostels: filteredTestHostels,
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });

  it('изменение статуса лоадера', () => {
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

  it('изменение отеля для страницы предложения', () => {
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

  it('изменение комментариев для страницы предложения', () => {
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
    const testCommenstHostel:Comment[] = [...Array(5)].fill(makeFakeHostelComment());
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

  it('изменение отелей поблизости для страницы предложения', () => {
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
    const nearbyHostels:Hostel[] = [...Array(3)].fill(makeFakeHostel());
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

  it('добавление комментария для страницы предложения', () => {
    const testCommenstHostel:Comment[] = [...Array(5)].fill(makeFakeHostelComment());
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

  it('изменение сортировки отелей', () => {
    const testFilteredHostels:Hostel[] = [...Array(3)].fill(makeFakeHostel());
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

  it('изменение отелей', () => {
    const newHostels = [...Array(5)].fill(makeFakeHostel());
    const newFilteredHostels = newHostels.filter((hostel) =>
      hostel.city.name.toLowerCase() === DEFAULT_ACTIVE_CITY.toLowerCase());
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
    expect(DataProcess(state, changeHostels(newHostels))).toEqual({
      isDataLoading: false,
      city: DEFAULT_ACTIVE_CITY,
      hostels: newHostels,
      hostelProperty: undefined,
      filteredHostels: newFilteredHostels,
      nearbyHostelsProperty: [],
      commentsProperty: [],
      sorting: DEFAULT_ACTIVE_SORT,
    });
  });
});
