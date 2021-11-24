import LoginLink from '../login/login-link/login-link';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  return (
    <header className="header" data-testid = 'header'>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <LoginLink />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
