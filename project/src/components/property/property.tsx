import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  changeCommentsProperty,
  changeHostelProperty,
  changeNearbyHostelsProperty
} from '../../store/action';
import { getHostelProperty } from '../../store/data-process/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { Comment } from '../../types/comment';
import { Hostel } from '../../types/hostel';
import {
  fetchCommentsInfo,
  fetchNearByHostelsInfo,
  fetchOfferInfo
} from '../api/api-action';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Page404 from '../page-404/page-404';
import PropertyInfo from './property-info';


function Property(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const [statusError, setError] = useState<boolean>(false);
  const hostelProperty = useSelector(getHostelProperty);
  const dispatch = useDispatch();
  const getOfferInfo = () =>
    (dispatch as ThunkAppDispatch)(fetchCommentsInfo(parseInt(id, 10)))
      .then((comments:Comment[]) => dispatch(changeCommentsProperty(comments)))

      .then(() => (dispatch as ThunkAppDispatch)(fetchNearByHostelsInfo(parseInt(id, 10))))
      .then((hostels:Hostel[]) => dispatch(changeNearbyHostelsProperty(hostels)))

      .then(() => (dispatch as ThunkAppDispatch)(fetchOfferInfo(parseInt(id, 10))))
      .then((offerInfo:Hostel) => {dispatch(changeHostelProperty(offerInfo));})

      .catch(() => setError(true));

  if ((hostelProperty === undefined) || (hostelProperty && hostelProperty.id !== parseInt(id,10))) {
    getOfferInfo();

    return <LoadingSpinner />;
  }

  return (
    statusError || hostelProperty === undefined
      ? <Page404 />
      : <PropertyInfo hostel = {hostelProperty}/>
  );
}

export default Property;
