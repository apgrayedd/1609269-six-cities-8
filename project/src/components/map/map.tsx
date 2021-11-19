import {Icon, Marker} from 'leaflet';
import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMap from '../../hooks/use-map';
import { changeHoverHostel } from '../../store/action';
import 'leaflet/dist/leaflet.css';
import { Hostel } from '../../types/hostel';
import { getHoverMarker } from '../../store/user-hover/selectors';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

type MapOptions = {
  hostels: Hostel[],
  activeHostelId?: number | undefined,
};

function Map({hostels, activeHostelId}: MapOptions): JSX.Element {
  const hoverMarker = useSelector(getHoverMarker);
  const dispatch = useDispatch();
  const setHostelId = useCallback((id: number | undefined) =>
    dispatch(changeHoverHostel(id)), [dispatch]);

  const mapRef = useRef(null);
  const city = hostels[0].city;
  const map = useMap(mapRef,{...city.location});

  useEffect(() => {
    if (!map) {
      return;
    }
    const markers:Marker[] = [];
    hostels.forEach((hostel) => {
      const marker = new Marker({
        lat: hostel.location.latitude,
        lng: hostel.location.longitude,
      });

      marker.on('mouseover', (evt) => {
        evt.target.setIcon(currentCustomIcon);
        setHostelId(hostel.id);
      });

      marker.on('mouseout', (evt) => {
        if (hoverMarker === undefined && activeHostelId !== hostel.id) {
          evt.target.setIcon(defaultCustomIcon);
        }
        setHostelId(undefined);
      });

      marker.on('click', () => {
        window.location.href = `/property/${hostel.id}`;
      });

      marker
        .setIcon(
          (hoverMarker === hostel.id || activeHostelId === hostel.id)
            ? currentCustomIcon
            : defaultCustomIcon,
        )
        .addTo(map);

      markers.push(marker);
    });

    return(() => {
      markers.forEach((marker:Marker) => {
        map.removeLayer(marker);
      });
    });
  }, [map, hostels, hoverMarker, setHostelId, activeHostelId]);

  return <div style = {{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
