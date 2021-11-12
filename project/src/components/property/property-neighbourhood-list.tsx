import { connect, ConnectedProps } from 'react-redux';
import { MAX_NEIGHBOURHOOD_ITEMS } from '../../const';
import { State } from '../../types/state';
import PointItem from '../point/point-item';

const stateToProps = ({nearbyHostelsProperty}:State) => ({
  nearbyHostelsProperty,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PropertyNeighbourhoodList({nearbyHostelsProperty}:PropsFromRedux):JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {
          nearbyHostelsProperty && nearbyHostelsProperty.map((hostel) =>
            <PointItem hostel = {hostel} key = {hostel.id}/>).splice(0, MAX_NEIGHBOURHOOD_ITEMS)
        }
      </div>
    </section>
  );
}

export {PropertyNeighbourhoodList};
export default connector(PropertyNeighbourhoodList);
