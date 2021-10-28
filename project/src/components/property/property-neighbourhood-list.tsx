import { Hostel } from '../../types/hostel';
import PointItem from '../point/point-item';

type PropertyNeighbourhoodListOptions = {
  hostels: Hostel[],
  hostelInProperty: Hostel,
  onEnterFunction: (value: Hostel | undefined) => void,
  hoverElementId: number | undefined,
}

export default function PropertyNeighbourhoodList(
  {hostels, onEnterFunction, hostelInProperty, hoverElementId}:PropertyNeighbourhoodListOptions,
):JSX.Element {
  const hostelsOnNeighbourhood = hostels.filter((hostel) => hostel.id !== hostelInProperty.id);
  const arrayPoints = hostelsOnNeighbourhood.map((hostel) =>
    <PointItem hoverStatus = {hoverElementId === hostel.id} hostel = {hostel} key = {hostel.id} onEnterFunction = {onEnterFunction}/>);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {arrayPoints}
      </div>
    </section>
  );
}
