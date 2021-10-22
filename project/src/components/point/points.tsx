import { Hostel } from '../../mocks/hostel';
import Point from './point';

type PointList = {
  hostels: Hostel[],
};

export default function Points ({hostels}: PointList):  JSX.Element {
  const hostelsList = hostels.map((hostel) => <Point key = {hostel.id} hostel = {hostel}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}
