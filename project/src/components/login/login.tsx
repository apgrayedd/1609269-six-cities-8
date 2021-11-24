import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../logo/logo';
import { ThunkAppDispatch } from '../../types/action';
import { loginAction } from '../api/api-action';
import { changeAuthorizationStatus, changeLoaderStatus } from '../../store/action';
import { AuthData } from '../../types/auth-data';
import { AuthorizationStatus } from '../../const';
import { useDispatch } from 'react-redux';

function FavoritesEmpty(): JSX.Element {
  const dispatch = useDispatch();
  const postLogin = ({login, password}:AuthData,  actionOnEnd:() => void) =>
    (dispatch as ThunkAppDispatch)(loginAction({login: login, password: password}))
      .then(() => {
        dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
        actionOnEnd();
        dispatch(changeLoaderStatus(false));
      })
      .catch((err) => Promise.reject(err));
  const setLoaderStatus = (status: boolean) =>
    dispatch(changeLoaderStatus(status));

  const formRef = useRef(null);
  const history = useHistory();
  const submitTemplate = (evt: any) => {
    evt.preventDefault();
    setLoaderStatus(true);
    const data = evt.target.elements;
    postLogin(
      {
        login: data.email.value,
        password: data.password.value,
      },
      () => history.push('/'),
    );
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="/login" method="post"
              ref = {formRef} onSubmit = {submitTemplate}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid = 'email'
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid = 'password'
                />
              </div>
              <button className="login__submit form__submit button" type="submit" data-testid = 'buttonSignIn'>
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className = "locations__item-link" to = '/main/amsterdam'>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesEmpty;
