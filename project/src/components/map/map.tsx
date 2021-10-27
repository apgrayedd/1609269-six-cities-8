import {Icon, Marker} from 'leaflet';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Hostel } from '../../types/hostel';
import { getByKey } from '../../utils/common';

type MapOptions = {
  hostels: Hostel[];
  selectedHostel: (Hostel | undefined)[] | Hostel | undefined;
};

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

export default function Map({hostels, selectedHostel}: MapOptions): JSX.Element {
  const mapRef = useRef(null);
  const city = hostels[0].city;
  const map = useMap(mapRef, {...city.location});

  useEffect(() => {
    if (map) {
      const markers:Marker[] = [];
      hostels.forEach((hostel) => {
        const marker = new Marker({
          lat: hostel.location.latitude,
          lng: hostel.location.longitude,
        });

        marker
          .setIcon(
            selectedHostel !== undefined && (
              Array.isArray(selectedHostel)
                ? getByKey(selectedHostel, 'id').includes(hostel.id)
                : selectedHostel.id === hostel.id)
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
    }
  }, [map, hostels, selectedHostel]);

  return <div style = {{maxWidth: '300px', maxHeight: '300px'}} ref={mapRef}></div>;
}
