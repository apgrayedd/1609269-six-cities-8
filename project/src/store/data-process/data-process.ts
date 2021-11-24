import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT } from '../../const';
import { DataProcessState } from '../../types/state';
import { sortHostels } from '../../utils/common';
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

const initialState: DataProcessState = {
  isDataLoading: false,
  city: DEFAULT_ACTIVE_CITY,
  hostels: [],
  hostelProperty: undefined,
  filteredHostels: [],
  nearbyHostelsProperty: [],
  commentsProperty: [],
  sorting: DEFAULT_ACTIVE_SORT,
};

export const DataProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.filteredHostels = state.hostels
        .filter((hostel) =>
          hostel.city.name.toLowerCase() === action.payload.toLowerCase());
    })
    .addCase(changeLoaderStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(changeHostelProperty, (state, action) => {
      state.hostelProperty = action.payload;
    })
    .addCase(changeCommentsProperty, (state, action) => {
      state.commentsProperty = action.payload;
    })
    .addCase(changeNearbyHostelsProperty, (state, action) => {
      state.nearbyHostelsProperty = action.payload;
    })
    .addCase(changeHostels, (state, action) => {
      state.hostels = action.payload;
      state.filteredHostels = action.payload
        .filter((hostel) =>
          hostel.city.name.toLowerCase() === state.city.toLowerCase());
    })
    .addCase(addCommentProperty, (state, action) => {
      state.commentsProperty = state.commentsProperty
        ? state.commentsProperty.concat(action.payload)
        : [action.payload];
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
      state.filteredHostels = sortHostels(state.filteredHostels, action.payload, state.city, state.hostels);
    });
});
