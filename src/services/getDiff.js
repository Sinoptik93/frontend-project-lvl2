import _ from 'lodash';

/**
 * Get diff array.
 * @param file1{JSON}
 * @param file2{JSON}
 * @returns {{key: string, value: any, status: string}[]}
 */
const getDiff = (file1, file2) => {
  const keysList = [...Object.keys(file1), ...Object.keys(file2)];
  const sortedKeysList = _.sortBy(_.union(keysList));

  return sortedKeysList.map((key) => {
    const valueBefore = file1[key];
    const valueAfter = file2[key];

    if (!_.has(file2, key)) {
      return {
        key,
        value: valueBefore,
        status: 'removed',
      };
    }

    if (!_.has(file1, key)) {
      return {
        key,
        value: valueAfter,
        status: 'added',
      };
    }

    if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      const children = getDiff(valueBefore, valueAfter);
      return {
        key,
        status: 'nested',
        children,
      };
    }

    if (!_.isEqual(valueBefore, valueAfter)) {
      return {
        key,
        value: [valueBefore, valueAfter],
        status: 'updated',
      };
    }

    return {
      key,
      value: valueBefore,
      status: 'unchanged',
    };
  });
};

export default getDiff;
