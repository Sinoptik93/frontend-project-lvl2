import stylish from './services/stylish.js';
import getDiff from './services/getDiff.js';
import getJsonFile from './services/getJsonFile.js';

const gendiff = (filepath1, filepath2) => {
  const parsedFile1 = getJsonFile(filepath1);
  const parsedFile2 = getJsonFile(filepath2);

  const result = getDiff(parsedFile1, parsedFile2);
  return stylish(result);
};

export default gendiff;
