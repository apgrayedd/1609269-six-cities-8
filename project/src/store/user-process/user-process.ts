import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserProcessState } from '../../types/state';
import { changeAuthorizationStatus, changeFavorites } from '../action';

const initialState:UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favorites: [],
};

export const UserProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});


