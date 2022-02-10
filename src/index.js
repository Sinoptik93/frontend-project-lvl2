import path from 'path';
import fs from 'fs';
import getDiff from './services/getDiff.js';
import parse from './services/parse.js';
import format from './formatters/index.js';

/**
 * Get normalize file path.
 * @param filePath{string}
 * @returns {string}
 * @example
 * normalizePath('./filepath/targetFile.json') // usr/local/Desktop/filepath/targetFile.json
 */
const normalizePath = (filePath) => path.resolve(filePath);

const readFile = (filePath) => fs.readFileSync(normalizePath(filePath), 'utf-8');

const getFormat = (filePath) => path.extname(filePath).substring(1);

const getData = (filePath) => parse(readFile(filePath), getFormat(filePath));

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedFile1 = getData(filepath1);
  const parsedFile2 = getData(filepath2);

  const diffResult = getDiff(parsedFile1, parsedFile2);
  return format(diffResult, formatName);
};

export default gendiff;
