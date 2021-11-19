import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkAppDispatch } from '../../types/action';
import { logoutAction } from '../api/api-action';

function LoginLinkLogged(): JSX.Element {
  const dispatch = useDispatch();
  const logoutTemplate = () =>
    (dispatch as ThunkAppDispatch)(logoutAction());

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

export default LoginLinkLogged;
