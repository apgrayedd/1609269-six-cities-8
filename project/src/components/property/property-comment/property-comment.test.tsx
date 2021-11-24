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

    userEvent.type(screen.getByRole('textbox'), 'Test');
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('Компонент: Property-Comment-Start-List', () => {
  it('проверка на правильный рендер', () => {
    let starCount = 0;
    const setStar = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, 10)));
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
  let starCount = 0;
  const starNumber = Math.floor(Math.random() * starsTitlesInReview.length);
  const starTitle = starsTitlesInReview[starNumber];

  it('проверка на правильный рендер', () => {
    starCount = 0;
    const setRating = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, 10)));
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
    starCount = 0;
    const setRating = jest.fn((item) =>
      starCount = (parseInt((item.target as HTMLInputElement).value, 10)));
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
