import { Map, TileLayer } from 'leaflet';
import {useEffect, useState, MutableRefObject} from 'react';

type Coordinates = {
  'latitude': number,
  'longitude': number,
  'zoom': number,
}

export default function useMap(mapRef:MutableRefObject<HTMLElement | null>, coordinates: Coordinates): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    if (map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        zoom: coordinates.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);
      setMap(instance);
    } else {
      map.flyTo([coordinates.latitude, coordinates.longitude], coordinates.zoom);
    }
  }, [mapRef, map, coordinates]);

  return map;
}
