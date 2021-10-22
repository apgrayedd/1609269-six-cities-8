import { Hostel } from '../../mocks/hostel';
import PointItem from './point-item';

type PointListOption = {
  hostels: Hostel[],
};

export default function PointList ({hostels}: PointListOption):  JSX.Element {
  const hostelsList = hostels.map((hostel) => <PointItem key = {hostel.id} hostel = {hostel}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}
