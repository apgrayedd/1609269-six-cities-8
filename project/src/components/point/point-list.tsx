import { useSelector } from 'react-redux';
import { getFilteredHostels } from '../../store/data-process/selectors';
import Sorting from '../sorting/sorting';
import PointItem from './point-item';

function PointList ():  JSX.Element {
  const filteredHostels = useSelector(getFilteredHostels);
  const hostelsList = filteredHostels.map((hostel) =>
    <PointItem key = {hostel.id} hostel = {hostel}/>);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{filteredHostels.length} places to stay in Amsterdam</b>
      <Sorting />
      <div className="cities__places-list places__list tabs__content">
        {hostelsList}
      </div>
    </section>
  );
}

export default PointList;
