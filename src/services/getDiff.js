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

    const result = { key };

    if (!_.has(file2, key)) {
      result.value = valueBefore;
      result.status = 'removed';
    } else if (!_.has(file1, key)) {
      result.value = valueAfter;
      result.status = 'added';
    } else if (_.isPlainObject(valueBefore) && _.isPlainObject(valueAfter)) {
      result.children = getDiff(valueBefore, valueAfter);
      result.status = 'nested';
    } else if (!_.isEqual(valueBefore, valueAfter)) {
      result.value = [valueBefore, valueAfter];
      result.status = 'updated';
    } else {
      result.value = valueBefore;
      result.status = 'unchanged';
    }

    return result;
  });
};

export default getDiff;
