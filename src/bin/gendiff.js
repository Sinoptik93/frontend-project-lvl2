#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.1', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((pathFile1, pathFile2) => {
    console.log(pathFile1, pathFile2);
  })
  .parse(process.argv);
