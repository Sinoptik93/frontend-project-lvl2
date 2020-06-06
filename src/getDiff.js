import { has, union } from 'lodash';

const getDiff = (file1, file2) => {
  const allKeys = union([...Object.keys(file1), ...Object.keys(file2)]);

  return allKeys.map((key) => {
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      return {
        key,
        value: getDiff(file1[key], file2[key]),
        status: 'nested',
      };
    }

    if (!has(file1, key)) {
      return {
        key,
        value: file2[key],
        status: 'added',
      };
    }

    if (!has(file2, key)) {
      return {
        key,
        value: file1[key],
        status: 'removed',
      };
    }

    if ((typeof file1[key] !== typeof file2[key]) || (file1[key] !== file2[key])) {
      return {
        key,
        value: [file1[key], file2[key]],
        status: 'updated',
      };
    }

    return {
      key,
      value: file1[key],
      status: 'unchanged',
    };
  });
};

export default getDiff;
