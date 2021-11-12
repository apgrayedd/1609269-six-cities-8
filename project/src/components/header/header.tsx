import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';

const stateToProps = ({filteredHostels, authorizationStatus}:State) => ({
  filteredHostels,
  authorizationStatus,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({authorizationStatus}:PropsFromRedux): JSX.Element {
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

export {Header};
export default connector(Header);
