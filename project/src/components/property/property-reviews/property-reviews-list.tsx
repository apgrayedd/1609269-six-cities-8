import { Comment } from '../../../types/comment';
import PropertyReviewsItem from './property-reviews-item';

type ReviewsListOption = {
  commentsProperty: Comment[];
};

export default function RropertyReviewsList({commentsProperty}: ReviewsListOption): JSX.Element {

  const reviewsArray = commentsProperty &&
    commentsProperty.map((comment) => <PropertyReviewsItem key = {comment.id} comment = {comment}/>);
  return (
    <ul className="reviews__list">
      {reviewsArray}
    </ul>
  );
}
