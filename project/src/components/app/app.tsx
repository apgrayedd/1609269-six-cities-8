import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites-list';
import Property from '../property/property';
import Page404 from '../page-404/page-404';
import PrivateRoute from '../private-route/private-route';

type countPoints = {
  count: number,
  authorizationStatus: AuthorizationStatus,
};

function App({count, authorizationStatus}: countPoints): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = {AppRoute.Main}>
          <Main authorizationStatus={authorizationStatus} count = {count}/>
        </Route>
        <Route exact path = {AppRoute.SignIn}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render={() => <Favorites authorizationStatus={authorizationStatus} count = {0}/>}
          authorizationStatus={authorizationStatus}
        >
        </PrivateRoute>
        <Route exact path = {AppRoute.Room}>
          <Property authorizationStatus={authorizationStatus} />
        </Route>
        <Route>
          <Page404 authorizationStatus={authorizationStatus} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
