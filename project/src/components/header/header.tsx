import { AuthorizationStatus } from '../../const';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';

type HeaderOptions = {
  authorizationStatus: AuthorizationStatus,
}

export default function Header({authorizationStatus}:HeaderOptions): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <LoginLink authorizationStatus = {authorizationStatus} />
          </nav>
        </div>
      </div>
    </header>
  );
}
