/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getValuesFromListByKey = (values: any, key: string) => {
  const results:any[] = [];
  values.forEach((obj: any) => {
    results.push(obj[key]);
  });
  return results;
};

export const getTitleListFromListByKey = (values: any, key: string) => {
  type resultType = {
    'key': string,
    'values': any[],
  };

  const result:resultType[] = [];
  Object.keys(values).forEach((keyValue) => {
    const keyInfo = values[keyValue][key]['name'];
    const resultKeys = getValuesFromListByKey(result, 'key');
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
