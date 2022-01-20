import path from 'path';

const absoluteFilePath = '/Users/sinner93/Development/hexlet/frontend-project-lvl2/__tests__/__fixtures__/json/after.json';
const testPaths = [
  '__tests__/__fixtures__/json/after.json',
  './__tests__/__fixtures__/json/after.json',
  '../frontend-project-lvl2/__tests__/__fixtures__/json/after.json',
];

describe('|Normalize path|', () => {
  test.each(testPaths)('Relative: %s', (filePath) => {
    expect(path.resolve(filePath)).toBe(absoluteFilePath);
  });
  test('Absolute:', () => {
    expect(path.resolve(absoluteFilePath)).toBe(absoluteFilePath);
  });
});
