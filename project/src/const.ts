export const DEFAULT_ACTIVE_CITY = 'Amsterdam';

export const REVIEWS_TEXT_AMOUNT = 50;

export const starsTitlesInReview  = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
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
