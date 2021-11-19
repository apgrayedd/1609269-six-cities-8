import { State } from '../../types/state';
import { NameSpace } from '../reducer';

export const getHoverMarker = (state:State):number | undefined => state[NameSpace.userHover].hoverMarker;
export const getHoverHostel = (state:State):number | undefined => state[NameSpace.userHover].hoverHostel;
