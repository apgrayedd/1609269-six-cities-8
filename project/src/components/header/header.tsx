import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

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

export default Header;
