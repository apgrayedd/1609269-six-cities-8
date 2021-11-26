import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { getCommentsProperty } from '../../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import PropertyComment from '../property-comment/property-comment';
import PropertyReviewsList from './property-reviews-list';

type ReviewsID = {id: number};

function PropertyReviews({id}: ReviewsID): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const commentsProperty = useSelector(getCommentsProperty);

  return (
    <section className="property__reviews reviews" data-testid = 'property-reviews'>
      {
        (commentsProperty && commentsProperty.length > 0) &&
        <>
          <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{commentsProperty.length}</span>
          </h2>
          <PropertyReviewsList commentsProperty = {commentsProperty}/>
        </>
      }
      {
        authorizationStatus === AuthorizationStatus.Auth &&
        <PropertyComment id = {id}/>
      }
    </section>
  );
}

export default PropertyReviews;
