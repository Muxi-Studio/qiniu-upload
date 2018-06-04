#!/usr/bin/env node
'use strict';
var program = require('commander');
var CLI = require('./config')

program
  .version('0.1.0')
  .command('rmdir <dir> [otherDirs...]')
  .action(function (dir, otherDirs) {
    console.log('rmdir %s', dir);
    CLI.show(dir);
  });

program.parse(process.argv);