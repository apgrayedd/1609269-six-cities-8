import { Hostel } from '../../types/hostel';
import PointItem from './point-item';

type PointListOption = {
  hostels: Hostel[],
  onEnterFunction: (id?: number) => void,
};

export default function PointList ({hostels,onEnterFunction}: PointListOption):  JSX.Element {
  const hostelsList = hostels.map((hostel) => <PointItem key = {hostel.id} onEnterFunction = {onEnterFunction} hostel = {hostel}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}
