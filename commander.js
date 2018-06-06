#!/usr/bin/env node
'use strict';

var program = require('commander');
var CLI = require('./upload');
var CONF  = require('./config').config;

program
    .command('push <ak> <sk>' , 'add environment variables: accesskey secretKey')
    .action(function(cmd,ak,sk){
      //  process.env.accessKey = ak;
      //  process.env.secretKey = sk;

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
    .option('-p, --path <string>','your local path such as ./')
    //上传文件的空间(bucket)对应的机房
    .option('-z, --zone <string>','your online zone \n'
       +'there are some options: \n'
       +'                           华东：qiniu.zone.Zone_z0 \n'
       +'                           华北：qiniu.zone.Zone_z1 \n'
       +'                           华南：qiniu.zone.Zone_z2 \n'
       +'                           北美：qiniu.zone.Zone_na0 \n')
    //上传文件的空间名
    .option('-b, --bucket <string>','your online bucket such as "mybucket"')
    //上传文件的前缀
    .option('-f, --prefix <string>','your upload prefix such "test\\"')
    
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

