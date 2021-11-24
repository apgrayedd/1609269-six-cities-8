import { combineReducers } from 'redux';
import { DataProcess } from './data-process/data-process';
import { UserHover } from './user-hover/user-hover';
import { UserProcess } from './user-process/user-process';

export enum NameSpace {
  data = 'DATA',
  userProcess = 'USER_PROCCES',
  userHover = 'USER_HOVER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: DataProcess,
  [NameSpace.userProcess]: UserProcess,
  [NameSpace.userHover]: UserHover,
});

export type RootState = ReturnType<typeof rootReducer>;
