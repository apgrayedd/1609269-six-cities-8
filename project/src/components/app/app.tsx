import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import Page404 from '../page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { Hostel } from '../../mocks/hostel';

type countPoints = {
  authorizationStatus: AuthorizationStatus,
  hostels: Hostel[],
};

function App({hostels, authorizationStatus}: countPoints): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = {AppRoute.Root}>
          <Main authorizationStatus={authorizationStatus} hostels = {hostels}/>
        </Route>
        <Route exact path = {AppRoute.Main}>
          <Main authorizationStatus={authorizationStatus} hostels = {hostels}/>
        </Route>
        <Route exact path = {AppRoute.SignIn}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render={() => <Favorites authorizationStatus={authorizationStatus} hostels = {hostels}/>}
          authorizationStatus={authorizationStatus}
        >
        </PrivateRoute>
        <Route exact path = {AppRoute.Room}>
          <Property hostels= {hostels} authorizationStatus={authorizationStatus} />
        </Route>
        <Route>
          <Page404 authorizationStatus={authorizationStatus} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
