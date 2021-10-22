import {Link} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';

type pageErrorOptions = {
  authorizationStatus: AuthorizationStatus,
};

const ErrorDivStyle = {
  HEIGHT: '50vh',
  WIDTH: '1144px',
  MARGIN_LEFT: 'auto',
  MARGIN_RIGHT: 'auto',
  PADDING_LEFT: '58px',
  PADDING_RIGHT: '58px',
};

const ErrorDescriptionStyle = {
  FONT_SIZE: '78px',
  MARGIN_BOTTOM: '20px',
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
        height: ErrorDivStyle.HEIGHT,
        width: ErrorDivStyle.WIDTH,
        marginLeft: ErrorDivStyle.MARGIN_LEFT,
        marginRight: ErrorDivStyle.MARGIN_RIGHT,
        paddingLeft: ErrorDivStyle.PADDING_LEFT,
        paddingRight: ErrorDivStyle.MARGIN_RIGHT,
      }}
      >
        <Link to = '/'>
          <p style = {{
            fontSize: ErrorDescriptionStyle.FONT_SIZE,
            marginBottom: ErrorDescriptionStyle.MARGIN_BOTTOM,
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
