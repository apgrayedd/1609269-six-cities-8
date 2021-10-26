import {Icon, Marker} from 'leaflet';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Hostel } from '../../types/hostel';

type MapOptions = {
  hostels: Hostel[];
  selectedHostel: Hostel | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
            selectedHostel !== undefined && hostel.id === selectedHostel.id
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

  return <div ref={mapRef}></div>;
}
