#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((pathfile1, pathfile2) => {
    gendiff(pathfile1, pathfile2);
  })

  .parse(process.argv);
