import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

function PrivateRoute({exact, path, render}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to = {AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
