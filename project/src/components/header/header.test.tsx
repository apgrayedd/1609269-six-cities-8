import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Header from './header';
import { Router } from 'react-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Компонент: Header', () => {

  it('проврека на правильный рендер', () => {
    const store = mockStore({'USER_PROCESS': {authorizationStatus: Math.random() < 0.5}});
    render(
      <Provider store={store}>
        <Router history = {history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });
});
