import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

const statesToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});
const connector = connect(statesToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PrivateRouteType = PrivateRouteProps & PropsFromRedux;

function PrivateRoute({exact, path, render, authorizationStatus}: PrivateRouteType): JSX.Element {
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

export {PrivateRoute};
export default connector(PrivateRoute);
