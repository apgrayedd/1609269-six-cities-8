import { AuthorizationStatus } from '../../const';
import { Hostel } from '../../types/hostel';
import { State } from '../../types/state';
import { NameSpace } from '../reducer';

export const getFavorites = (state: State):Hostel[] => state[NameSpace.userProcess].favorites;
export const getAuthorizationStatus = (state: State):AuthorizationStatus => state[NameSpace.userProcess].authorizationStatus;
