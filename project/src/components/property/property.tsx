/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getHostelProperty } from '../../store/data-process/selectors';
import { ThunkAppDispatch } from '../../types/action';
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
  useEffect(() => {
    (dispatch as ThunkAppDispatch)(fetchCommentsInfo(parseInt(id, 10)))
      .then(() => (dispatch as ThunkAppDispatch)(fetchNearByHostelsInfo(parseInt(id, 10))))
      .then(() => (dispatch as ThunkAppDispatch)(fetchOfferInfo(parseInt(id, 10))))
      .catch(() => setError(true));
  }, [dispatch, id]);

  if (!statusError && hostelProperty) {
    return <PropertyInfo hostel = {hostelProperty}/>;
  } else if (statusError) {
    return <Page404 />;
  }

  return <LoadingSpinner />;
}

export default Property;
