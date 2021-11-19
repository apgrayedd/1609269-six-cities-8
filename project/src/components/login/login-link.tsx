import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoginLinkLogged from './login-link-logged';
import LoginLinkNotLogged from './login-link-not-logged';

export default function LoginLink(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <LoginLinkLogged />
      : <LoginLinkNotLogged />
  );
}
