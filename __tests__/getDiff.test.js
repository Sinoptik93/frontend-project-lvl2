import getDiff from '../src/services/getDiff.js';
import getJsonFile from '../src/services/getJsonFile.js';

const testFilesJson = {
  before: getJsonFile('__tests__/__fixtures__/json/before.json'),
  after: getJsonFile('__tests__/__fixtures__/json/after.json'),
  beforeTree: getJsonFile('__tests__/__fixtures__/json/beforeTree.json'),
  afterTree: getJsonFile('__tests__/__fixtures__/json/afterTree.json'),
};
const testFilesYml = {
  before: getJsonFile('__tests__/__fixtures__/yml/before.yml'),
  after: getJsonFile('__tests__/__fixtures__/yml/after.yml'),
};
const testFilesIni = {
  before: getJsonFile('__tests__/__fixtures__/ini/before.ini'),
  after: getJsonFile('__tests__/__fixtures__/ini/after.ini'),
};

const resultFlat = [
  {
    key: 'host',
    status: 'unchanged',
    value: 'hexlet.io',
  },
  {
    key: 'timeout',
    status: 'updated',
    value: [
      50,
      20,
    ],
  },
  {
    key: 'proxy',
    status: 'removed',
    value: '123.234.53.22',
  },
  {
    key: 'follow',
    status: 'removed',
    value: false,
  },
  {
    key: 'verbose',
    status: 'added',
    value: true,
  },
];
const resultIniFlat = [
  {
    key: 'host',
    status: 'unchanged',
    value: 'hexlet.io',
  },
  {
    key: 'timeout',
    status: 'updated',
    value: [
      '50',
      '20',
    ],
  },
  {
    key: 'proxy',
    status: 'removed',
    value: '123.234.53.22',
  },
  {
    key: 'follow',
    status: 'removed',
    value: false,
  },
  {
    key: 'verbose',
    status: 'added',
    value: true,
  },
];
const resultNested = [
  {
    key: 'common',
    status: 'nested',
    value: [
      {
        key: 'setting1',
        status: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        status: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        status: 'updated',
        value: [
          true,
          null,
        ],
      },
      {
        key: 'setting6',
        status: 'nested',
        value: [
          {
            key: 'key',
            status: 'unchanged',
            value: 'value',
          },
          {
            key: 'doge',
            status: 'nested',
            value: [
              {
                key: 'wow',
                status: 'updated',
                value: [
                  '',
                  'so much',
                ],
              },
            ],
          },
          {
            key: 'ops',
            status: 'added',
            value: 'vops',
          },
        ],
      },
      {
        key: 'follow',
        status: 'added',
        value: false,
      },
      {
        key: 'setting4',
        status: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
    ],
  },
  {
    key: 'group1',
    status: 'nested',
    value: [
      {
        key: 'baz',
        status: 'updated',
        value: [
          'bas',
          'bars',
        ],
      },
      {
        key: 'foo',
        status: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        status: 'updated',
        value: [
          {
            key: 'value',
          },
          'str',
        ],
      },
    ],
  },
  {
    key: 'group2',
    status: 'removed',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    status: 'added',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

describe('|Get different flat|', () => {
  test('.json:', () => {
    expect(getDiff(testFilesJson.before, testFilesJson.after)).toStrictEqual(resultFlat);
  });
  test('.yml:', () => {
    expect(getDiff(testFilesYml.before, testFilesYml.after)).toStrictEqual(resultFlat);
  });
  test('.ini:', () => {
    expect(getDiff(testFilesIni.before, testFilesIni.after)).toStrictEqual(resultIniFlat);
  });
});

describe('|Get different nested|', () => {
  test('.json:', () => {
    expect(getDiff(testFilesJson.beforeTree, testFilesJson.afterTree)).toStrictEqual(resultNested);
  });
});
