import { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { changeAuthorizationStatus } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

const stateToProps = ({hostels,authorizationStatus}:State) => ({
  hostels,
  authorizationStatus,
});
const dispatchToProps = (dispatch:Dispatch<Actions>) => ({
  setAuthorizationStatus(authorizationStatus: AuthorizationStatus) {
    dispatch(changeAuthorizationStatus(authorizationStatus));
  },
});
const connector = connect(stateToProps, dispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginLinkLogged({setAuthorizationStatus}:PropsFromRedux): JSX.Element {
  const logoutTemplate = () => setAuthorizationStatus(AuthorizationStatus.NoAuth);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to = '/favorites'>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to = '/login' onClick = {logoutTemplate}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
}

export {LoginLinkLogged};
export default connector(LoginLinkLogged);
