import { createReducer } from '@reduxjs/toolkit';
import { UserHoverState } from '../../types/state';
import { changeHoverHostel, changeHoverMarker } from '../action';

const initialState:UserHoverState = {
  hoverHostel: undefined,
  hoverMarker: undefined,
};

export const UserHover = createReducer(initialState, (builder) => {
  builder
    .addCase(changeHoverHostel, (state, action) => {
      state.hoverHostel = action.payload;
    })
    .addCase(changeHoverMarker, (state, action) => {
      state.hoverMarker = action.payload;
    });
});
