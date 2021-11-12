import { AuthorizationStatus } from '../const';
import { Comment } from './comment';
import { Hostel } from './hostel';

export type State = {
  city:string,
  hostels: Hostel[],
  hostelProperty: Hostel | undefined,
  filteredHostels: Hostel[],
  nearbyHostelsProperty: Hostel[] | undefined,
  favorites: Hostel[],
  commentsProperty: Comment[] | undefined,
  sorting: string,
  hoverHostel: number | undefined,
  hoverMarker: number | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean,
};
