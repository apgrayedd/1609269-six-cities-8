import { Comment } from '../../types/comment';
import { Hostel } from '../../types/hostel';
import { State } from '../../types/state';
import { NameSpace } from '../reducer';

export const getCity = (state: State):string => state[NameSpace.data].city;
export const getFilteredHostels = (state:State):Hostel[] => state[NameSpace.data].filteredHostels;
export const getNearbyHostels = (state:State):Hostel[] | undefined => state[NameSpace.data].nearbyHostelsProperty;
export const getHostelProperty = (state:State):Hostel | undefined => state[NameSpace.data].hostelProperty;
export const getLoadingStatus = (state:State):boolean => state[NameSpace.data].isDataLoading;
export const getCommentsProperty = (state:State):Comment[] | undefined => state[NameSpace.data].commentsProperty;
export const getSorting = (state:State):string => state[NameSpace.data].sorting;
