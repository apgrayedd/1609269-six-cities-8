import { Hostel } from './hostel';

export type State = {
  city:string,
  hostels: Hostel[],
  sorting: string,
  hoverHostel: number | undefined,
  hoverMarker:(number | undefined)[] | number | undefined,
};
