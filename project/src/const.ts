import { Hostel } from './types/hostel';

export const DEFAULT_ACTIVE_CITY = 'Amsterdam';
export const DEFAULT_ACTIVE_SORT = 'Popular';
export const REVIEWS_TEXT_AMOUNT = 50;

export const starsTitlesInReview  = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
];

export const SortingList = [
  {name: 'Popular', funct: undefined},
  {name: 'Price: low to high', funct: (hostelA:Hostel, hostelB:Hostel):number => hostelA.price - hostelB.price},
  {name: 'Price: high to low', funct: (hostelA:Hostel, hostelB:Hostel):number => hostelB.price - hostelA.price},
  {name: 'Top rated first', funct: (hostelA:Hostel, hostelB:Hostel):number => hostelA.rating - hostelB.rating},
];

export enum AppRoute {
  Root = '/',
  Main = '/main/:activeCity',
  SignIn = '/login',
  Favorites = '/favorites',
  Page404 = '/page-404',
  Room = '/property/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Cities {
  Paris = 'PARIS',
  Cologne = 'COLOGNE',
  Brussels = 'BRUSSELS',
  Amsterdam = 'AMSTERDAM',
  Hamburg = 'HAMBURG',
  Dusseldorf = 'DUSSELDORF',
}
