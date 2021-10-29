import {Icon, Marker} from 'leaflet';
import { useRef, useEffect, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import useMap from '../../hooks/useMap';
import { changeHoverHostelAction } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

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

const stateToProps = ({hostels, hoverMarker}:State) => ({
  hostels,
  hoverMarker,
});
const dispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setHostelId(id: number | undefined) {
    dispatch(changeHoverHostelAction(id));
  },
});
const connector = connect(stateToProps, dispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Map({hostels, setHostelId, hoverMarker}: PropsFromRedux): JSX.Element {
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
        setHostelId(hostel.id);
      });

      marker.on('mouseout', (evt) => {
        // eslint-disable-next-line no-console
        console.log(hoverMarker);
        if (hoverMarker === undefined || (
          Array.isArray(hoverMarker)
            ? hoverMarker.some((hoverMarkerItem) =>
              hoverMarkerItem && hoverMarkerItem !== hostel.id)
            : hoverMarker !== hostel.id)) {
          evt.target.setIcon(defaultCustomIcon);
        }
        setHostelId(undefined);
      });

      marker.on('click', () => {
        window.location.href = `/property/${hostel.id}`;
      });

      marker
        .setIcon(
          hoverMarker !== undefined && (
            Array.isArray(hoverMarker)
              ? hoverMarker.some((hoverMarkerItem) =>
                hoverMarkerItem && hoverMarkerItem === hostel.id)
              : hoverMarker === hostel.id)
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
  }, [map, hostels, hoverMarker, setHostelId]);

  return <div style = {{maxWidth: '300px', maxHeight: '300px'}} ref={mapRef}></div>;
}

export {Map};
export default connector(Map);