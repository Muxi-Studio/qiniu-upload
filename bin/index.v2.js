#!/usr/bin/env node
'use strict';

var program = require('commander');
var CLI = require('../lib/upload');
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');
var CONF = require('../../../qiniu-upload.config');
const accessKey = CONF.accessKey;
const screctKey = CONF.screctKey;
if(!accessKey||!screctKey) {
    console.log(chalk.red('ERROR:please give accessKey and screctKey!'));
    process.exit(1);
}
function print(path, zone, bucket, prefix, ak, sk) {
  console.log(chalk.green('path: %s zone: %s bucket: %s prefix: %s ', path, zone, bucket, prefix));
  console.log(chalk.green('accessKey: %s', ak));
  console.log(chalk.green('screctKey: %s', sk));
}
program
  .version(require('../../package.json').version)
  .option('-p, --path <string>', 'your local path such as ./')
  //上传文件的空间(bucket)对应的机房
  .option('-z, --zone <string>', 'your online zone ,'
    + 'there are some options: \n'
    + '                                  华东：huad \n'
    + '                                  华北：huab \n'
    + '                                  华南：huan \n'
    + '                                  北美：beim \n')
  //上传文件的空间名
  .option('-b, --bucket <string>', 'your online bucket such as "mybucket"')
  //上传文件的前缀
  .option('-f, --prefix <string>', 'your upload prefix such "test\\"')
  .command('push  <ifcli>')
  .description('argument: whether use cli ,choise:[CLI,FILE]')
  .action(function (ifcli) {
    if (ifcli === 'CLI') {
      if (program.path && program.zone && program.bucket && program.prefix) {
        print(program.path, program.zone, program.bucket, program.prefix, ak, sk);
        CLI.push(program.path, program.zone, progrm.bucket, program.prefix, accessKey, screctKey);
      } else {
        co(function* () {
          var path = yield prompt(chalk.cyan('path（上传文件所在路径）:'));
          var zone = yield prompt(chalk.cyan('zone（上传目的空间所在地区）:'));
          var bucket = yield prompt(chalk.cyan('bucket（上传目的空间名）:'));
          var prefix = yield prompt(chalk.cyan('prefix（上传文件需要添加的前缀）:'));
          print(path, zone, bucket, prefix, accessKey, screctKey);
          CLI.push(path, zone, bucket, prefix, accessKey, screctKey);
        })
      }
    } else if (ifcli === 'FILE') {
     
      if (CONF.path && CONF.zone && CONF.bucket && CONF.prefix) {
        var path = CONF.path;
        var zone = CONF.zone;
        var bucket = CONF.bucket;
        var prefix = CONF.prefix;
        print(path, zone, bucket, prefix, accessKey, screctKey);
        CLI.push(path, zone, bucket, prefix, accessKey, screctKey);

      } else {
        console.log(chalk.red('ERROR:please give all parameter include :"ptah","zone","bucket","prefix" in the "qiniu-upload-config.js" '));
        process.exit(1);
      }
    } else {
      console.log(chalk.red('ERROR:please give true command'));
      program.outputHelp();
    }
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}


