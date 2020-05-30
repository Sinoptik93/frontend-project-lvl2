import path from 'path';
import gendiff from '../src/index.js';
import { AssertionError } from 'assert';

const example = (
  `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`);

const relativePathTo = (fileName) => path.join('__tests__', '__fixtures__', fileName);
const absolutePathTo = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const testFiles = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];


describe('Gendiff test', () => {
  test.each(testFiles)('relative path | %s %s', (file1, file2) => {
    expect(gendiff(relativePathTo(file1), relativePathTo(file2))).toMatch(example);
  });
  test.each(testFiles)('absolute path | %s %s', (file1, file2) => {
    expect(gendiff(absolutePathTo(file1), absolutePathTo(file2))).toMatch(example);
  });
});
