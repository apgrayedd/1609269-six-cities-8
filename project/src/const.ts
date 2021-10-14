export enum AppRoute {
  Main = '/',
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
