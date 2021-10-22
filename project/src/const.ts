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
