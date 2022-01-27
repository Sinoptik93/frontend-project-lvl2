#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-v, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((pathFile1, pathFile2) => {
    console.log(gendiff(pathFile1, pathFile2, program.format));
  })
  .parse(process.argv);
