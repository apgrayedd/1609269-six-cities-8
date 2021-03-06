import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { REVIEWS_TEXT_AMOUNT } from '../../../const';
import { ThunkAppDispatch } from '../../../types/action';
import { PostComment } from '../../../types/comment';
import { fetchCommentsInfo, postCommentAction } from '../../api/api-action';
import PropertyCommentStarList from './property-comment-start-list';
import PropertyCommentTextArea from './property-comment-textArea';


export const initialComment = {
  commentText: '',
  starCount: 0,
};
type PropertyId = {id: number};

function PropertyComment({id}:PropertyId): JSX.Element {
  const dispatch = useDispatch();
  const postComment = ({comment, rating}:PostComment) =>
    (dispatch as ThunkAppDispatch)(postCommentAction(id, {comment, rating}))
      .then(() => (dispatch as ThunkAppDispatch)(fetchCommentsInfo(id)));

  const [starCount, setStar] = useState<number>(0);
  const [disableStatus, setDisableStatus] = useState<boolean>(true);
  const changeSubmitStatusTemplate = (evt:any) => {
    evt.preventDefault();
    const data = evt.currentTarget.elements;
    setDisableStatus(!(data.review.value.length > 0 && starCount !== 0));
  };
  const submitTemplate = (evt:any) => {
    evt.preventDefault();
    const data = evt.target.elements;
    postComment(
      {
        'comment': data.review.value,
        'rating': starCount,
      });
    data.review.value = initialComment.commentText;
    setStar(initialComment.starCount);
    setDisableStatus(true);
  };

  return (
    <form className="reviews__form form" method="post" onSubmit = {submitTemplate} onChange = {changeSubmitStatusTemplate}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      {<PropertyCommentStarList setStar = {setStar} starCount = {starCount}/>}
      {<PropertyCommentTextArea />}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set {' '}
          <span className="reviews__star">rating</span> and describe your
            stay with at least {' '}
          <b className="reviews__text-amount">{REVIEWS_TEXT_AMOUNT} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled = {disableStatus}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default PropertyComment;
