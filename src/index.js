import fs from 'fs';
import path from 'path';
import process from 'process';

const compareFunction = (file1, file2) => {
  const compareResult = [];
  const allKeys = [...new Set([...Object.keys(file1), ...Object.keys(file2)])];

  for (const key of allKeys) {
    // Similar keys and ...
    if (file1.hasOwnProperty(key) && file2.hasOwnProperty(key)) {
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
    } else if (file1.hasOwnProperty(key) && !file2.hasOwnProperty(key)) {
      // No key in file2.
      compareResult.push(['-', key, file1[key]]);
    } else {
      // No key in file1.
      compareResult.push(['+', key, file2[key]]);
    }
  }

  let string = '';
  // Make result string
  for (let i = 0; i < compareResult.length; i += 1) {
    if (i === 0) {
      string = '{';
    }
    const stringData = compareResult[i];
    const compareResultString = `${stringData[0]} ${stringData[1]}: ${stringData[2]}`;
    string = `${string}\n${compareResultString}`;
    if (i === compareResult.length - 1) {
      string = `${string}\n}`;
    }
  }
  console.log(string);
  return string;
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
