#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const CLI = require("../lib/upload.v2");
const print = require("../lib/print");
const logger = require("../util/logger");

// 获取环境变量 accessKey 和 screctKey
let fileConf = {};
let accessKey;
let screctKey;

const OPNUMBERS = 7;

program
  .version(require("../package.json").version)
  .option("-p, --path <string>", "your local path such as ./")
  // 上传文件的空间(bucket)对应的机房
  .option(
    "-z, --zone <string>",
    "your online zone ," +
      "there are some options: \n" +
      "                                  华东：huad \n" +
      "                                  华北：huab \n" +
      "                                  华南：huan \n" +
      "                                  北美：beim \n"
  )
  // 上传文件的空间名
  .option("-b, --bucket <string>", 'your online bucket such as "mybucket"')
  // 上传文件的前缀
  .option("-f, --prefix <string>", 'your upload prefix such "test"')
  .option(
    "-w,--with <string>",
    "your config file's path which is relative to executing the command line directory"
  )
  .option(
    "-r, --recursion <string>",
    'whether to upload subdirectories, if you want , please give "yes"'
  )
  .command("push")
  .action(() => {
    if (program.with) {
      const CONF = require(path.resolve(process.cwd(), program.with));
      fileConf = {
        path: CONF.path,
        zone: CONF.zone,
        bucket: CONF.bucket,
        prefix: CONF.prefix,
        recursion: CONF.recursion,
        accessKey: CONF.accessKey,
        screctKey: CONF.screctKey
      };
    }

    if (!fileConf.accessKey || !fileConf.screctKey) {
      if (!process.env.AK || !process.env.SK) {
        logger.error(
          'ERROR:please give accessKey and screctKey by CLI such as："set AK=ak" in Windows or "export AK=ak" in Unix'
        );
        process.exit(1);
      } else {
        accessKey = process.env.AK;
        screctKey = process.env.SK;
      }
    }

    const cliConf = {
      path: program.path,
      zone: program.zone,
      bucket: program.bucket,
      prefix: program.prefix,
      recursion: program.recursion,
      accessKey,
      screctKey
    };
    const cliArr = Object.keys(cliConf);
    cliArr.forEach(key => {
      if (cliConf[key] === undefined) {
        delete cliConf[key];
      }
    });
    const finalObj = Object.assign({}, fileConf, cliConf);
    const finalKeyArr = Object.keys(finalObj);
    if (finalKeyArr.length !== OPNUMBERS) {
      logger.error(
        "ERROR:please give all of path , zone ,bucket , prefix , accessKey and screctKey!"
      );
      process.exit(1);
    }
    finalKeyArr.map(key => {
      if (finalObj[key] === undefined) {
        logger.error(
          "ERROR:please give all of path , zone ,bucket , prefix , accessKey and screctKey!"
        );
        process.exit(1);
      }
      return key;
    });

    print(
      finalObj.path,
      finalObj.zone,
      finalObj.bucket,
      finalObj.prefix,
      finalObj.accessKey,
      finalObj.screctKey,
      finalObj.recursion
    );
    CLI.push(
      finalObj.path,
      finalObj.zone,
      finalObj.bucket,
      finalObj.prefix,
      finalObj.accessKey,
      finalObj.screctKey,
      finalObj.recursion
    );
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
