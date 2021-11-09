import { connect, ConnectedProps } from 'react-redux';
import {Link} from 'react-router-dom';
import { State } from '../../types/state';
import Header from '../header/header';
import Logo from '../logo/logo';

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

const stateToProps = ({authorizationStatus}:State) => ({
  authorizationStatus,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Page404({authorizationStatus}: PropsFromRedux): JSX.Element {
  return (
    <div className = 'page'>
      <Header authorizationStatus = {authorizationStatus} />
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

export {Page404};
export default connector(Page404);
