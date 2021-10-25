import { AuthorizationStatus } from '../../../const';
import { Comment } from '../../../mocks/comment';
import PropertyComment from '../property-comment/property-comment';
import PropertyReviewsList from './property-reviews-list';

type RropertyReviewsOptions = {
  comments: Comment[],
  authorizationStatus: AuthorizationStatus,
}

export default function RropertyReviews({comments, authorizationStatus}: RropertyReviewsOptions): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <PropertyReviewsList comments = {comments}/>
      {
        authorizationStatus === AuthorizationStatus.Auth &&
        <PropertyComment />
      }
    </section>
  );
}
