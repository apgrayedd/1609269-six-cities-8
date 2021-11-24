import {
    changeAuthorizationStatus, changeFavorites
  } from '../action';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from './user-process';
import { makeFakeHostel } from '../../utils/makeFakeHostel';
  
  describe('Редьюсер: User-Process', () => {
    it('изменение статуса авторизации', () => {
      const listAuthorizationStatus = Object.values(AuthorizationStatus);
      const testAuthorizationStatus = listAuthorizationStatus[Math.floor(Math.random() * Object.values(listAuthorizationStatus).length)];
      const newAuthorizationStatus = listAuthorizationStatus[Math.floor(Math.random() * Object.values(listAuthorizationStatus).length)];
      const state = {
        authorizationStatus: testAuthorizationStatus,
        favorites: [],
      };
      expect(UserProcess(state, changeAuthorizationStatus(newAuthorizationStatus))).toEqual({
        authorizationStatus: newAuthorizationStatus,
        favorites: [],
      });
    });

    it('изменение понравившихся отелей', () => {
      const testHostels = [...Array(5)].fill(makeFakeHostel());
      const newTestHostels = [...Array(5)].fill(makeFakeHostel());
      const state = {
        authorizationStatus: AuthorizationStatus.Unknown,
        favorites: testHostels,
      };
      expect(UserProcess(state, changeFavorites(newTestHostels))).toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        favorites: newTestHostels,
      });
    });
  });
  