/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortingList } from '../const';
import { hostels } from '../mocks/hostels';
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

export const sortHostels = (hostelsFromState: Hostel[], sortType:string, cityForPopular:string):Hostel[] => {
  switch (sortType) {
    case SortingList.Popular.name:
      return hostels.filter((hostel) => (hostel.city.name.toLowerCase() === cityForPopular.toLowerCase()));
    case SortingList.PriceLowToHigh.name:
      return new Array(...hostelsFromState.sort(SortingList.PriceLowToHigh.funct));
    case SortingList.PriceHighToLow.name:
      return new Array(...hostelsFromState.sort(SortingList.PriceHighToLow.funct));
    case SortingList.TopRatedFirst.name:
      return new Array(...hostelsFromState.sort(SortingList.TopRatedFirst.funct));
    default:
      throw new Error('Неизвестная сортировка');
  }
};
