#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.1', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((a, b) => {
    const result = Number(a) + Number(b);
    console.log(result);
  })
  .parse(process.argv);

console.log(process.argv);
