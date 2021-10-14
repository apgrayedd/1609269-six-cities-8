/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';

type pageErrorOptions = {
  authorizationStatus: AuthorizationStatus,
};

export default function Page404({authorizationStatus}: pageErrorOptions): JSX.Element {
  return (
    <div className = 'page'>
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
      <div className = "error error--404" style = {{
        height: '50vh',
        width: '1144px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '58px',
        paddingRight: '58px',
      }}
      >
        <Link to = '/'>
          <p style = {{
            fontSize: '78px',
            marginBottom: '20px',
          }}
          >
            Ошибка 404
          </p>
          <span>Страница не была найдена :&apos;(</span>
        </Link>
      </div>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}
