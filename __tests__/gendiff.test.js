import path from 'path';
import gendiff from '../src/index.js';

const resultFlat = (
  `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

const resultTree = (
  `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
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
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);

const relativePathTo = (fileName) => `./__tests__/__fixtures__/json/${fileName}`;
const absolutePathTo = (fileName) => path.join(__dirname, '__fixtures__', 'json', fileName);
const testFiles = [
  ['before.json', 'after.json', 'JSON'],
];

describe('Flat', () => {
  test.each(testFiles)('%s format (relative path):', (file1, file2) => {
    expect(gendiff(
      relativePathTo(file1),
      relativePathTo(file2),
    ))
      .toBe(resultFlat);
  });
  test.each(testFiles)('%s %s | %s format (absolute path):', (file1, file2) => {
    expect(gendiff(
      absolutePathTo(file1),
      absolutePathTo(file2),
    ))
      .toBe(resultFlat);
  });
});

describe('Gendiff recursive tree', () => {
  test('JSON format (relative/absolute path)', () => {
    expect(gendiff(
      relativePathTo('beforeTree.json'),
      relativePathTo('afterTree.json'),
    ))
      .toBe(resultTree);
    expect(gendiff(
      absolutePathTo('beforeTree.json'),
      absolutePathTo('afterTree.json'),
    ))
      .toBe(resultTree);
  });
});
