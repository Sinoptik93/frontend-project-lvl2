import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

/**
 * Get normalize file path.
 * @param filePath{string}
 * @returns {string}
 * @example
 * normalizePath('./filepath/targetFile.json') // usr/local/Desktop/filepath/targetFile.json
 */
const normalizePath = (filePath) => path.resolve(filePath);

/**
 * Get parsed string
 * @param filePath{string} - file path
 * @returns {string}
 */
const getStringFrom = (filePath) => fs.readFileSync(normalizePath(filePath), 'utf-8');

/**
 * Get parsed json file.
 * @param filePath{string} path to the target file.
 * @returns {JSON}
 * @link https://ru.hexlet.io/courses/js-polymorphism/lessons/dispatch-functions-by-key/theory_unit
 * @example
 * getJsonFile('./test.json') // {"testKey": "testValue"}
 */
const getJsonFile = (filePath) => {
  const data = getStringFrom(filePath);
  const fileExtension = path.extname(filePath).substring(1);

  const getJson = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };

  return getJson[fileExtension](data);
};

export default getJsonFile;
