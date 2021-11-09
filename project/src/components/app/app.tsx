import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import Page404 from '../page-404/page-404';
import PrivateRoute from '../private-route/private-route';
import { Comment } from '../../types/comment';
// import { isCheckedAuth } from '../../utils/common';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import LoadingSpinner from '../loading-spinner/loading-spinner';

type countPoints = {
  comments: Comment[],
};

const stateToProps = ({isDataLoaded, authorizationStatus}:State) => ({
  isDataLoaded,
  authorizationStatus,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App({comments, isDataLoaded, authorizationStatus}: PropsFromRedux & countPoints): JSX.Element {
  if (isDataLoaded) {
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
          <Property comments = {comments} />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
