import { connect, ConnectedProps } from 'react-redux';
import { MAX_NEIGHBOURHOOD_ITEMS } from '../../const';
import { Hostel } from '../../types/hostel';
import { State } from '../../types/state';
import PointItem from '../point/point-item';

type PropertyNeighbourhoodListOptions = {
  hostelInProperty: Hostel,
}

const stateToProps = ({filteredHostels}:State) => ({
  filteredHostels,
});
const connector = connect(stateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PropertyNeighbourhoodListOptions;

function PropertyNeighbourhoodList({filteredHostels, hostelInProperty}:ConnectedComponentProps):JSX.Element {
  const hostelsOnNeighbourhood = filteredHostels.filter((hostel) => hostel.id !== hostelInProperty.id);
  const arrayPoints = hostelsOnNeighbourhood.map((hostel) =>
    <PointItem hostel = {hostel} key = {hostel.id}/>).splice(0, MAX_NEIGHBOURHOOD_ITEMS);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {arrayPoints}
      </div>
    </section>
  );
}

export {PropertyNeighbourhoodList};
export default connector(PropertyNeighbourhoodList);
