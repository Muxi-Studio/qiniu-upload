#!/usr/bin/env node
'use strict';

var program = require('commander');
var CLI = require('./upload');
var CONF  = require('./config').config;
program
    .option('-p, --path <string>','your local path such as ./')
    // .parse(process.argv)
    .command('push <ak> <sk>')
    .action(function (ak,sk) {
      
      let path = program.path || CONF.path;
      let zone = program.zone || CONF.zone;
      let bucket = program.bucket || CONF.bucket;
      let prefix = program.prefix || CONF.prefix;
   

      if(!path||!zone||!bucket||!prefix) {
        console.log('please give all parameters')
      } else {
        CLI.push(path,zone,bucket,prefix,ak,sk);
      }
    })
    //上传文件的空间(bucket)对应的机房
    .option('-z, --zone <string>','your online zone \n'
       +'there are some options: \n'
       +'                           华东：huad \n'
       +'                           华北：huab \n'
       +'                           华南：huan \n'
       +'                           北美：beim \n')
    //上传文件的空间名
    .option('-b, --bucket <string>','your online bucket such as "mybucket"')
    //上传文件的前缀
    .option('-f, --prefix <string>','your upload prefix such "test\\"')
    
  

program.parse(process.argv)
  
if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

