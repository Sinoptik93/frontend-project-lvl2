import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import process from 'process';
import stylish from './services/stylish.js';
import getDiff from './services/getDiff.js';

const isValid = (filepath) => filepath.slice(0, 2) === './' || filepath.slice(0, 3) === '../';

const normalizePath = (filepath) => (
  isValid(filepath)
    ? path.resolve(process.cwd(), filepath)
    : filepath
);

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
      throw new Error(`Unknown file extension '${fileFormat}'.\nPlease, check file at directory: ${filepath}`);
  }
  return parse;
};

const gendiff = (filepath1, filepath2) => {
  const fileParser1 = chooseParserBy(filepath1);
  const fileParser2 = chooseParserBy(filepath2);

  const parsedFile1 = fileParser1(fs.readFileSync(normalizePath(filepath1), 'utf-8'));
  const parsedFile2 = fileParser2(fs.readFileSync(normalizePath(filepath2), 'utf-8'));

  const result = getDiff(parsedFile1, parsedFile2);
  return stylish(result);
};

console.log(path.resolve());

export default gendiff;
