import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import Page404 from '../page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { getLoadingStatus } from '../../store/data-process/selectors';

function App(): JSX.Element {
  const statusLoading = useSelector(getLoadingStatus);
  if (statusLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = {AppRoute.Root}>
          <Main />
        </Route>
        <Route exact path = {AppRoute.Main}>
          <Main />
        </Route>
        <Route exact path = {AppRoute.SignIn}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route exact path = {AppRoute.Room}>
          <Property />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
