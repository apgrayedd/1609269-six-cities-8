import { AuthorizationStatus, SortingList } from '../const';
import { Hostel } from '../types/hostel';

export const getByKey = (values: any, key: string) => values.map((item: any) => item && item[key]);

export const getTitleList = (values: any, key: string) => {
  type resultType = {
    'key': string,
    'values': any[],
  };

  const result:resultType[] = [];
  Object.keys(values).forEach((keyValue) => {
    const keyInfo = values[keyValue][key]['name'];
    const resultKeys = getByKey(result, 'key');
    if (resultKeys.includes(keyInfo)) {
      for (const keyResult in result) {
        if (result[keyResult]['key'] === keyInfo) {
          result[keyResult]['values'].push(values[keyValue]);
        }
      }
    } else {
      result.push({
        'key': keyInfo,
        'values': [values[keyValue]],
      });
    }
  });

  return result;
};

export const sortHostels = (
  hostelsFromState: Hostel[],
  sortType:string,
  cityForPopular:string,
  hostelsFromServer:Hostel[],
):Hostel[] => {
  switch (sortType) {
    case SortingList.Popular.name:
      return hostelsFromServer.filter((hostel) => (hostel.city.name.toLowerCase() === cityForPopular.toLowerCase()));
    case SortingList.PriceLowToHigh.name:
      return [...hostelsFromState].sort(SortingList.PriceLowToHigh.funct);
    case SortingList.PriceHighToLow.name:
      return [...hostelsFromState].sort(SortingList.PriceHighToLow.funct);
    case SortingList.TopRatedFirst.name:
      return [...hostelsFromState].sort(SortingList.TopRatedFirst.funct);
    default:
      throw new Error('Неизвестная сортировка');
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const capitalizeText = (text:string):string => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
