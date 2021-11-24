import { useSelector } from 'react-redux';
import { MAX_NEIGHBOURHOOD_ITEMS } from '../../const';
import { getNearbyHostels } from '../../store/data-process/selectors';
import PointItem from '../point/point-item';

function PropertyNeighbourhoodList():JSX.Element {
  const nearbyHostelsProperty = useSelector(getNearbyHostels);

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

export default PropertyNeighbourhoodList;
