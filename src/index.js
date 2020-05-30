import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import process from 'process';
import compareFiles from './parser.js';

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

  if (fileFormat === '.json') {
    parse = JSON.parse;
  } else if (fileFormat === '.yml') {
    parse = yaml.safeLoad;
  }
  // switch (fileFormat) {
  //   case fileFormat === ".json":
  //     parse = JSON.parse;
  //     break;
  //   case fileFormat === ".yml":
  //     parse = yaml.safeLoad;
  //     break;
  //   default:
  //     console.log(`Filepath: ${filepath}\nFile format: ${fileFormat}\n`);
  //     throw new Error('Unknown file extention!');
  // }
  return parse;
};

const gendiff = (filepath1, filepath2) => {
  const fileParser1 = chooseParserBy(filepath1);
  const fileParser2 = chooseParserBy(filepath2);

  const parsedFile1 = fileParser1(fs.readFileSync(normolizePath(filepath1), 'utf-8'));
  const parsedFile2 = fileParser2(fs.readFileSync(normolizePath(filepath2), 'utf-8'));

  const result = compareFiles(parsedFile1, parsedFile2);

  console.log(result);
  return result;
};

export default gendiff;
