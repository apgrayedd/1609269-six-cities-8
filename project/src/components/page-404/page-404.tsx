import {Link} from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import {
  ErrorDescriptionStyle,
  ErrorDivStyle
} from './page-404.style';

export default function Page404(): JSX.Element {
  return (
    <div className = 'page'>
      <Header />
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
