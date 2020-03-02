#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.1', '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  // eslint-disable-next-line no-undef
  .parse(process.argv);
