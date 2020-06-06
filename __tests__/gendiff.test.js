import path from 'path';
import gendiff from '../src/index.js';

const example = (
  `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);

const exampleTree = (
  `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
    - group2: {
        abc: 12345
    }
    + group3: {
        fee: 100500
    }
}`);

const relativePathTo = (fileName) => `./__tests__/__fixtures__/${fileName}`;
const absolutePathTo = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const testFiles = [
  ['before.json', 'after.json', 'JSON'],
  ['before.yml', 'after.yml', 'YAML'],
  ['before.ini', 'after.ini', 'INI'],
];

describe('Gendiff flat tree', () => {
  test.each(testFiles)('%s %s | %s format (relative/absolute path):', (file1, file2) => {
    expect(gendiff(relativePathTo(file1), relativePathTo(file2))).toBe(example);
    expect(gendiff(absolutePathTo(file1), absolutePathTo(file2))).toBe(example);
  });
});

describe('Gendiff recursive tree', () => {
  test('JSON format (relative/absolute path)', () => {
    expect(gendiff(relativePathTo('beforeTree.json'), relativePathTo('afterTree.json'))).toBe(exampleTree);
    expect(gendiff(absolutePathTo('beforeTree.json'), absolutePathTo('afterTree.json'))).toBe(exampleTree);
  });
});
