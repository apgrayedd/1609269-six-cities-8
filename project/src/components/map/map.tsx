import {Icon, Marker} from 'leaflet';
import { useRef, useEffect, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import useMap from '../../hooks/useMap';
import { changeHoverHostel } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';
import 'leaflet/dist/leaflet.css';
import { Hostel } from '../../types/hostel';

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

const stateToProps = ({hoverMarker}:State) => ({
  hoverMarker,
});
const dispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setHostelId(id: number | undefined) {
    dispatch(changeHoverHostel(id));
  },
});

type MapOptions = {
  hostels: Hostel[],
  activeHostelId?: number | undefined,
};
const connector = connect(stateToProps, dispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapOptions;

function Map({hostels, setHostelId, hoverMarker, activeHostelId}: ConnectedComponentProps): JSX.Element {
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

export {Map};
export default connector(Map);
