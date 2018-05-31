#!/usr/bin/env node
'use strict';
var push = require('./upload');
var program = require('commander');


program
    .version(require('./package.json').version,'-v','--version')
    //需要读取文件的根目录,具体到最后一层文件夹
    .option('-p, --path <path>','your local path such as ./')
    //上传文件的空间(bucket)对应的机房
    .option('-z, --zone <zone>','your online zone \n'
       +'there are some options: \n'
       +'                           华东：qiniu.zone.Zone_z0 \n'
       +'                           华北：qiniu.zone.Zone_z1 \n'
       +'                           华南：qiniu.zone.Zone_z2 \n'
       +'                           北美：qiniu.zone.Zone_na0 \n')
    //上传文件的空间名
    .option('-b, --bucket <bucket>','your online bucket such as "mybucket"')
    //上传文件的前缀
    .option('-pre, --prefix <prefix>','your upload prefix such "test\\"')
    .parse(process.argv)
//添加环境变量
program
    .command('addkey <ak> <sk>' , 'add environment variables: accesskey secretKey')
    .alias('addkey <ak> <sk>')
    .action(function(cmd,ak,sk){
       process.env.accessKey = ak;
       process.env.secretKey = sk;
    })
    program.parse(process.argv)

program
    .command('pushq','start to push to qiniu')
    .alias('pq')
    .action(function(){
        push();
    })
    program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
  }