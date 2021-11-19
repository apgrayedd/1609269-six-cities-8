import { AuthorizationStatus } from '../const';
import { RootState } from '../store/reducer';
import { Comment } from './comment';
import { Hostel } from './hostel';

export type State = RootState;

export type DataProcessState = {
  city: string,
  isDataLoading: boolean,
  hostels: Hostel[],
  hostelProperty: Hostel | undefined,
  filteredHostels: Hostel[],
  nearbyHostelsProperty: Hostel[] | undefined,
  commentsProperty: Comment[] | undefined,
  sorting: string,
};

export type UserProcessState = {
  authorizationStatus: AuthorizationStatus,
  favorites: Hostel[],
};

export type UserHoverState = {
  hoverHostel: number | undefined,
  hoverMarker: number | undefined,
};
