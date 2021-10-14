import { AuthorizationStatus } from '../../const';
import LoginLinkLogged from './login-link-logged';
import LoginLinkNotLogged from './login-link-not-logged';

type LoginStatus = {
  authorizationStatus: AuthorizationStatus,
};

export default function LoginLink({authorizationStatus}: LoginStatus): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ?
      <LoginLinkLogged />
      :
      <LoginLinkNotLogged />
  );
}
