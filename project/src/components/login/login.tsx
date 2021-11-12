import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postlogin } from '../..';
import Logo from '../logo/logo';

export default function FavoritesEmpty(): JSX.Element {
  const formRef = useRef(null);
  const history = useHistory();
  const submitTemplate = (evt: any) => {
    evt.preventDefault();
    const data = evt.target.elements;
    postlogin({
      login: data.email.value,
      password: data.password.value,
      action: () => history.push('/'),
    });
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
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
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
