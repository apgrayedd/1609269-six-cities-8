/* eslint-disable semi */

/* eslint-disable no-console */
import {Icon, Marker} from 'leaflet';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Hostel } from '../../types/hostel';

type MapOptions = {
  hostels: Hostel[];
  selectedHostel: (Hostel | undefined)[] | Hostel | undefined;
  setHoverElement: (id: number | undefined) => void;
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

export default function Map({hostels, selectedHostel, setHoverElement}: MapOptions): JSX.Element {
  const mapRef = useRef(null);
  const city = hostels[0].city;
  const map = useMap(mapRef, {...city.location});

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
        setHoverElement(hostel.id);
      });

      marker.on('mouseout', (evt) => {
        if (selectedHostel !== undefined && (
          Array.isArray(selectedHostel)
            ? selectedHostel.some((selectHostel) =>
              selectHostel ? selectHostel.id === hostel.id : undefined)
            : selectedHostel.id !== hostel.id)) {
          evt.target.setIcon(defaultCustomIcon);
        }
        setHoverElement(undefined);
      });

      marker.on('click', () => {
        window.location.href = `/property/${hostel.id}`;
      });

      marker
        .setIcon(
          selectedHostel !== undefined && (
            Array.isArray(selectedHostel)
              ? selectedHostel.some((selectHostel) =>
                selectHostel ? selectHostel.id === hostel.id : undefined)
              : selectedHostel.id === hostel.id)
            ? currentCustomIcon
            : defaultCustomIcon,
        )
        .bindPopup('<a href=#>Text</a>')
        .addTo(map);

      markers.push(marker);
    });

    return(() => {
      markers.forEach((marker:Marker) => {
        map.removeLayer(marker);
      });
    });
  }, [map, hostels, selectedHostel, setHoverElement]);

  return <div style = {{maxWidth: '300px', maxHeight: '300px'}} ref={mapRef}></div>;
}
