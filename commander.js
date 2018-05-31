#!/usr/bin/env node
'use strict';
var program = require('commander');
// //命令行参数
program
    .usage('<command> [options]')
    .version(require('./package.json').version)
    //需要读取文件的根目录,具体到最后一层文件夹
    .option('-p, --path <path>','your local path')
    //上传文件的空间(bucket)对应的机房
    .option('-z, --zone <zone>','your online zone')
    //上传文件的空间名
    .option('-b, --bucket <bucket>','your online bucket')
    //上传文件的前缀
    .option('-pre, --prefix <prefix>','your upload prefix')



// program
//     .command('qiniu-upload')
//     .action(function(){
//         console.log(program.parse(process.argv).path);
//     })
//     program.parse(process.argv);

// console.log()
console.log(process.argv )
//process.argv
//node.exe绝对路径+node所执行文件的绝对路径+所传参数
// console.log(program.parse(process.argv))





// program.parse(process.argv)
// if(!program.args.length) {
//     program.help();
// }
