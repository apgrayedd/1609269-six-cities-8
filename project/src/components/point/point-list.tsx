import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import PointItem from './point-item';

const stateToProps = ({hostels}:State) => ({
  hostels,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PointList ({hostels}:PropsFromRedux):  JSX.Element {
  const hostelsList = hostels.map((hostel) =>
    <PointItem key = {hostel.id} hostel = {hostel}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}

export {PointList};
export default connector(PointList);
