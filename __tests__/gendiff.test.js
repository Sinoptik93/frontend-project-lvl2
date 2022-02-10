import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const getResult = (fileName) => fs.readFileSync(
  `./__tests__/__fixtures__/results/${fileName}`,
  'utf-8',
).trim();

const relativePathTo = (fileName, ext) => `./__tests__/__fixtures__/${ext}/${fileName}`;
const absolutePathTo = (fileName, ext) => path.join(__dirname, '__fixtures__', ext, fileName);
const testFiles = [
  ['before.json', 'after.json', 'json'],
  ['before.yml', 'after.yml', 'yml'],
];

describe('Flat', () => {
  test.each(testFiles)('%s format:', (file1, file2, ext) => {
    expect(gendiff(
      relativePathTo(file1, ext),
      absolutePathTo(file2, ext),
    ))
      .toBe(getResult('resultFlat.txt'));
  });
});

describe('Tree', () => {
  test('JSON format', () => {
    expect(gendiff(
      relativePathTo('beforeTree.json', 'json'),
      relativePathTo('afterTree.json', 'json'),
      'stylish',
    ))
      .toBe(getResult('resultTree.txt'));
  });
});

describe('Plain', () => {
  test('JSON format', () => {
    expect(gendiff(
      relativePathTo('beforeTree.json', 'json'),
      relativePathTo('afterTree.json', 'json'),
      'plain',
    ))
      .toBe(getResult('resultPlainTree.txt'));
  });
});

describe('JSON', () => {
  test('JSON format', () => {
    expect(gendiff(
      absolutePathTo('beforeTree.json', 'json'),
      absolutePathTo('afterTree.json', 'json'),
      'json',
    ))
      .toBe(getResult('result.json'));
  });
});
