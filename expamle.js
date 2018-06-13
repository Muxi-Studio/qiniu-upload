#!/usr/bin/env node
'use strict';
var program = require('commander');
var CLI = require('./upload');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');

program
    .command('up <ak> <sk> <ifcli>' , 'first argument : accessKey , second argument: screctKey, third argument: if use cli ,choise:[CLI,CON]')
    .action(function (ak,sk,ifcli) { 
      
      if(ifcli === 'CLI') {
        if(program.path && program.zone && program.bucket && program.prefix) {
          console.log(chalk.green('path: %s zone: %s bucket: %s prefix: %s ',program.path,program.zone,program.bucket,program.prefix));
          console.log(chalk.green('accessKey: %s',ak));
          console.log(chalk.green('screctKey: %s',ck));
          CLI.push(program.path,program.zone,progrm.bucket,program.prefix,ak,sk);  
        } else {
          co(function *() {
            var path = yield prompt(chalk.cyan('path（上传文件所在路径）:'));
            var zone = yield prompt(chalk.cyan('zone（上传目的空间所在地区）:'));
            var bucket = yield prompt(chalk.cyan('bucket（上传目的空间名）:'));
            var prefix = yield prompt(chalk.cyan('prefix（上传文件需要添加的前缀）:'));
            console.log(chalk.green('path: %s zone: %s bucket: %s prefix: %s ',path,zone,bucket,prefix));
            console.log(chalk.green('accessKey: %s',ak));
            console.log(chalk.green('screctKey: %s',ck));
            CLI.push(path,zone,bucket,prefix,ak,sk);  
          })
      }
       
      }
      else if(ifcli === 'CON'){
        var CONF  = require('../../qiniu-upload-config');
        if(CONF.path &&   CONF.zone && CONF.bucket && CONF.prefix) {
          var path =  CONF.path ;
          var zone =  CONF.zone ;
          var bucket =  CONF.bucket ;
          var prefix =  CONF.prefix ;
          console.log(chalk.green('path:'+ path + 'zone: ' + zone + ' bucket:' + bucket + 'prefix:'  + prefix ));
          console.log(chalk.green('accessKey:',ak));
          console.log(chalk.green('screctKey:',sk));
          CLI.push(path,zone,bucket,prefix,ak,sk);
          
        } else  {
          console.log(chalk.red('ERROR:please give all parameter include :"ptah","zone","bucket","prefix" in the "qiniu-upload-config.js" '));
          process.exit(1);
        }
      } else  {
        console.log(chalk.red('ERROR:please give true command'));
        program.outputHelp();
      }
     
    })
    .option('-p, --path <string>','your local path such as ./')
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
