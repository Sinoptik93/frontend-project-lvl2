import _ from 'lodash';

/**
 * Get diff array.
 * @param itemBefore{JSON}
 * @param itemAfter{JSON}
 * @returns {{key: string, value: any, status: string}[]}
 */
const getDiff = (itemBefore, itemAfter) => {
  const keysList = [...Object.keys(itemBefore), ...Object.keys(itemAfter)];
  const sortedKeysList = _.sortBy(_.union(keysList));

  return sortedKeysList.map((key) => {
    const valueBefore = itemBefore[key];
    const valueAfter = itemAfter[key];

    if (!_.has(itemAfter, key)) {
      return {
        key,
        value: valueBefore,
        status: 'removed',
      };
    }

    if (!_.has(itemBefore, key)) {
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

export default (itemBefore, itemAfter) => (
  {
    status: 'root',
    children: getDiff(itemBefore, itemAfter),
  }
);
