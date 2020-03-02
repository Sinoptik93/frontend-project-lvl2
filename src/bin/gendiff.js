#!/usr/bin/env node
import program from 'commander';

program
  .version('1.0.1', '-v, --VERSION', 'output the version number')
  .description('Compares two configuration files and shows a difference.'
);
// eslint-disable-next-line no-undef
program.parse(process.argv);
