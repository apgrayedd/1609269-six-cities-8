import { REVIEWS_TEXT_AMOUNT } from '../../../const';
import PropertyCommentStarList from './property-comment-start-list';
import PropertyCommentTextArea from './property-comment-textArea';

export default function PropertyComment(): JSX.Element {
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      {<PropertyCommentStarList />}
      {<PropertyCommentTextArea />}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
            stay with at least{' '}
          <b className="reviews__text-amount">{REVIEWS_TEXT_AMOUNT} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
