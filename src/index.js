import fs from 'fs';
import path from 'path';
import process from 'process';

const compareFunction = (file1, file2) => {
  const compareResult = [];
  const allKeys = [...new Set([...Object.keys(file1), ...Object.keys(file2)])];
  // Lint error: https://eslint.org/docs/rules/no-prototype-builtins
  const hasProperty = (file, key) => Object.prototype.hasOwnProperty.call(file, key);

  allKeys.forEach((key) => {
    // Similar keys and ...
    if (hasProperty(file1, key) && hasProperty(file2, key)) {
      // similar values.
      if (file1[key] === file2[key]) {
        compareResult.push([' ', key, file1[key]]);
      } else {
        // different values.
        let valueGreater;
        let valueSmaller;
        if (file1[key] > file2[key]) {
          [valueGreater, valueSmaller] = [file1[key], file2[key]];
          compareResult.push(['+', key, valueSmaller], ['-', key, valueGreater]);
        } else {
          [valueSmaller, valueGreater] = [file1[key], file2[key]];
          compareResult.push(['-', key, valueSmaller], ['+', key, valueGreater]);
        }
      }
    } else if (hasProperty(file1, key) && !hasProperty(file2, key)) {
      // No key in file2.
      compareResult.push(['-', key, file1[key]]);
    } else {
      // No key in file1.
      compareResult.push(['+', key, file2[key]]);
    }
  });

  let stringifiedResult = '';
  // Make result string
  compareResult.forEach((stringData) => {
    const compareResultString = `${stringData[0]} ${stringData[1]}: ${stringData[2]}`;
    stringifiedResult = `${stringifiedResult}\n${compareResultString}`;
  });
  console.log(`{${stringifiedResult}\n}`);
  return `{${stringifiedResult}\n}`;
};

const gendiff = (filepath1, filepath2) => {
  const normolizePath = (filepath) => {
    if (filepath.slice(0, 2) === './' || filepath.slice(0, 3) === '../') {
      const currentDirectory = process.cwd();
      const absolutePath = path.resolve(currentDirectory, filepath);
      return absolutePath;
    }
    return filepath;
  };

  const stringifiedFile1 = JSON.parse(fs.readFileSync(normolizePath(filepath1), 'utf-8'));
  const stringifiedFile2 = JSON.parse(fs.readFileSync(normolizePath(filepath2), 'utf-8'));

  const result = compareFunction(stringifiedFile1, stringifiedFile2);
  return result;
};

export default gendiff;
