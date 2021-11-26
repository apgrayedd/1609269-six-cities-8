import { makeFakeHostel } from '../../../utils/makeFakeHostel';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import PropertyComment from './property-comment';
import PropertyCommentTextArea from './property-comment-textArea';
import userEvent from '@testing-library/user-event';
import PropertyCommentStarList from './property-comment-start-list';
import { starsTitlesInReview } from '../../../const';
import PropertyCommentStarItem from './property-comment-star-item';

const STAR_COUNT = 0;
const PARSE_RADIX = 10;
const TEST_COMMENT_TEXT = 'Test';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Компонент: Property-Comments', () => {
  const testHostel = makeFakeHostel();

  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyComment id = {testHostel.id}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});

describe('Компонент: Property-Comment-TextArea', () => {

  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyCommentTextArea />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
  });

  it('проверка на написание комментария', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyCommentTextArea />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByRole('textbox'), TEST_COMMENT_TEXT);
    expect(screen.getByText(TEST_COMMENT_TEXT)).toBeInTheDocument();
  });
});

describe('Компонент: Property-Comment-Start-List', () => {
  it('проверка на правильный рендер', () => {
    let starCount = STAR_COUNT;
    const setStar = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, PARSE_RADIX)));
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyCommentStarList setStar = {setStar} starCount = {starCount}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('comment-star-list')).toBeInTheDocument();
  });
});

describe('Компонент: Property-Comment-Start-Item', () => {
  let starCount = STAR_COUNT;
  const starNumber = Math.floor(Math.random() * starsTitlesInReview.length);
  const starTitle = starsTitlesInReview[starNumber];

  it('проверка на правильный рендер', () => {
    starCount = STAR_COUNT;
    const setRating = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, PARSE_RADIX)));
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyCommentStarItem
            starNumber = {starNumber}
            starTitle = {starTitle}
            setRating = {setRating}
            status = {starNumber + 1 === starCount}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(`star-${starNumber}`)).toBeInTheDocument();
  });

  it('проверка на правильность изменения оценки', () => {
    starCount = STAR_COUNT;
    const setRating = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, PARSE_RADIX)));
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyCommentStarItem
            starNumber = {starNumber}
            starTitle = {starTitle}
            setRating = {setRating}
            status = {starNumber + 1 === starCount}
          />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId(`star-${starNumber}`));
    expect(starCount - 1).toBe(starNumber);
  });
});
