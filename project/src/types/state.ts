import { AuthorizationStatus } from '../const';
import { Comment } from './comment';
import { Hostel } from './hostel';

export type State = {
  city:string,
  hostels: Hostel[],
  filteredHostels: Hostel[],
  nearbyHostels: Hostel[],
  favorites: Hostel[],
  comments: Comment[],
  sorting: string,
  hoverHostel: number | undefined,
  hoverMarker: number | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
