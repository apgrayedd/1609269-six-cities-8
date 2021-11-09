/* eslint-disable no-console */
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { loginAction } from '../api/api-action';

export default function Logo(): JSX.Element {
  loginAction({login: '111', password: '111'});

  return (
    <Link className="header__logo-link header__logo-link--active" to = {AppRoute.Root}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}
