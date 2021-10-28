import { Hostel } from '../../types/hostel';
import PointItem from './point-item';

type PointListOption = {
  hostels: Hostel[],
  onEnterFunction: (value: Hostel | undefined) => void,
  hoverElementId: number | undefined,
};

export default function PointList ({hostels,onEnterFunction, hoverElementId}: PointListOption):  JSX.Element {
  const hostelsList = hostels.map((hostel) =>
    <PointItem key = {hostel.id} onEnterFunction = {onEnterFunction} hostel = {hostel} hoverStatus = {hostel.id === hoverElementId}/>);
  return (
    <div className="cities__places-list places__list tabs__content">
      {hostelsList}
    </div>
  );
}
