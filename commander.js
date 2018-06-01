#!/usr/bin/env node
'use strict';
var push = require('./upload');
var program = require('commander');


// program
//     .usage('<command> [options]')
//     .version(require('./package.json').version,'-v','--version')
//     //需要读取文件的根目录,具体到最后一层文件夹
//     .option('-p, --path <string>','your local path such as ./')
//     //上传文件的空间(bucket)对应的机房
//     .option('-z, --zone <string>','your online zone \n'
//        +'there are some options: \n'
//        +'                           华东：qiniu.zone.Zone_z0 \n'
//        +'                           华北：qiniu.zone.Zone_z1 \n'
//        +'                           华南：qiniu.zone.Zone_z2 \n'
//        +'                           北美：qiniu.zone.Zone_na0 \n')
//     //上传文件的空间名
//     .option('-b, --bucket <string>','your online bucket such as "mybucket"')
//     //上传文件的前缀
//     .option('-pr, --prefix <string>','your upload prefix such "test\\"')
//     .parse(process.argv)
//     console.log(program.path)
    //添加环境变量
program
    .command('addkey <ak> <sk>' , 'add environment variables: accesskey secretKey')
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
    .option('-pr, --prefix <string>','your upload prefix such "test\\"')
    .action(function(cmd,ak,sk){
       process.env.accessKey = ak;
       process.env.secretKey = sk;
        push(program.path,program.zone,program.bucket,program.prefix,ak,sk);
    })
    .parse(process.argv)
  //  let argv = program.parse(process.argv)
   

// program
//     .command('pushq','start to push to qiniu')
//     .alias('pq')
//     .action(function(){
//         console.log(this.parse(process.argv))
//         // console.log(argv)
//         // let path = argv.path;
//         // let zone = argv.zone;
//         // let bucket = argv.bucket;
//         // let prefix = argv.prefix;
//         // let ak = process.env.accessKey;
//         // let sk = process.env.secretKey;
//        // push(path,zone,bucket,prefix,ak,sk);
//     })
    
program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

