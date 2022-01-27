import stylish from './services/stylish.js';
import getDiff from './services/getDiff.js';
import getJsonFile from './services/getJsonFile.js';
import getPlain from './services/plain.js';

const formatter = {
  stylish: (diffList) => stylish(diffList),
  plain: (diffList) => getPlain(diffList),
  json: (diffList) => JSON.stringify(diffList),
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedFile1 = getJsonFile(filepath1);
  const parsedFile2 = getJsonFile(filepath2);

  const diffResult = getDiff(parsedFile1, parsedFile2);
  return formatter[formatName](diffResult);
};

export default gendiff;
