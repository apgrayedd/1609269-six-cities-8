import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { State } from '../../../types/state';
import PropertyComment from '../property-comment/property-comment';
import PropertyReviewsList from './property-reviews-list';

const stateToProps = ({commentsProperty, authorizationStatus}:State) => ({
  commentsProperty,
  authorizationStatus,
});
const connector = connect(stateToProps);
type ReviewsID = {id: number};
type PropsFromRedux = ConnectedProps<typeof connector> & ReviewsID;

function RropertyReviews({commentsProperty, authorizationStatus, id}: PropsFromRedux): JSX.Element {
  return (
    <section className="property__reviews reviews">
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

export {RropertyReviews};
export default connector(RropertyReviews);
