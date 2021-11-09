import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import PointItem from './point-item';

const stateToProps = ({filteredHostels}:State) => ({
  filteredHostels,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PointList ({filteredHostels}:PropsFromRedux):  JSX.Element {
  const hostelsList = filteredHostels.map((hostel) =>
    <PointItem key = {hostel.id} hostel = {hostel}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}

export {PointList};
export default connector(PointList);
