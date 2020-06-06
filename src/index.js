import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import process from 'process';
import stylish from './stylish.js';
import getDiff from './getDiff.js';

const normolizePath = (filepath) => {
  if (filepath.slice(0, 2) === './' || filepath.slice(0, 3) === '../') {
    const currentDirectory = process.cwd();
    const absolutePath = path.resolve(currentDirectory, filepath);
    return absolutePath;
  }
  return filepath;
};

const chooseParserBy = (filepath) => {
  let parse;
  const fileFormat = path.extname(filepath);

  switch (fileFormat) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yml':
      parse = yaml.safeLoad;
      break;
    case '.ini':
      parse = ini.parse;
      break;
    default:
      throw new Error(`Unknown file extention '${fileFormat}'.\nPlease, check file at directory: ${filepath}`);
  }
  return parse;
};

const gendiff = (filepath1, filepath2) => {
  const fileParser1 = chooseParserBy(filepath1);
  const fileParser2 = chooseParserBy(filepath2);

  const parsedFile1 = fileParser1(fs.readFileSync(normolizePath(filepath1), 'utf-8'));
  const parsedFile2 = fileParser2(fs.readFileSync(normolizePath(filepath2), 'utf-8'));

  const result = getDiff(parsedFile1, parsedFile2);
  const styledResult = stylish(result);
  return styledResult;
};

// TEST
const relativePathTo = (fileName) => `./__tests__/__fixtures__/${fileName}`;
gendiff(relativePathTo('beforeTree.json'), relativePathTo('afterTree.json'));

export default gendiff;
