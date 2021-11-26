import { makeFakeHostel, makeFakeHostelComment } from '../../../utils/makeFakeHostel';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import PropertyReviews from './property-reviews';
import PropertyReviewsList from './property-reviews-list';
import PropertyReviewsItem from './property-reviews-item';
import dayjs from 'dayjs';

const TEST_COMMENTS_AMOUNT = 3;

const testComments = Math.random() < 0.5 ? [...Array(TEST_COMMENTS_AMOUNT)].fill(makeFakeHostelComment()) : [];
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  'DATA': {
    commentsProperty: testComments,
  },
  'USER_PROCESS': {
    authorizationStatus: Math.random() < 0.5,
  },
});

describe('Компонент: Property-Reviews', () => {
  const testHostel = makeFakeHostel();

  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyReviews id = {testHostel.id}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('property-reviews')).toBeInTheDocument();
    // eslint-disable-next-line jest/no-conditional-expect
    testComments.length > 0 && expect(screen.getByText(testComments.length)).toBeInTheDocument();
  });
});

describe('Компонент: Property-Reviews-List', () => {
  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyReviewsList commentsProperty = {testComments}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});

describe('Компонент: Property-Reviews-Item', () => {
  const testComment = makeFakeHostelComment();
  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyReviewsItem comment = {testComment}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('comment-user-name').textContent)
      .toBe(testComment.user.name);
    expect(screen.getByTestId('comment-comment').textContent)
      .toBe(testComment.comment);
    expect(screen.getByTestId('comment-date').textContent)
      .toBe(dayjs(testComment.date).format('MMMM YYYY'));
  });
});
