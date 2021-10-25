import { useMemo } from 'react';
import { Comment } from '../../../mocks/comment';

type RropertyReviewsItemOptions = {
  comment: Comment,
}

export default function RropertyReviewsItem({comment}: RropertyReviewsItemOptions): JSX.Element {
  const raiting = useMemo(() => Math.round(comment.rating) * 20, [comment.rating]);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatar_url}
            alt="Reviews avatar"
            width={54}
            height={54}
          />
        </div>
        <span className="reviews__user-name" style = {{textTransform: 'capitalize'}}>{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${raiting}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={comment.date}>
          {comment.date}
        </time>
      </div>
    </li>
  );
}

