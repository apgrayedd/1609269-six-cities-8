import { Comment } from '../../../mocks/comment';
import PropertyReviewsItem from './property-reviews-item';

type RropertyReviewsListOptions = {
  comments: Comment[],
};

export default function RropertyReviewsList({comments}: RropertyReviewsListOptions): JSX.Element {
  const reviewsArray = comments.map((comment) => <PropertyReviewsItem key = {comment.id} comment = {comment}/>);
  return (
    <ul className="reviews__list">
      {reviewsArray}
    </ul>
  );
}

