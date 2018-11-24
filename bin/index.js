#!/usr/bin/env node
/**
 * CLI 命令的入口文件。主要作用是搜集来自配置文件，命令行参数，环境变量的参数，整合之后，传给 lib 下面的上传程序处理。
 * 命令行参数的优先级高于配置文件。
 */
const path = require(`path`);
const program = require(`commander`);
const CLI = require(`../lib/upload`);
const print = require(`../lib/print`);
const logger = require(`../util/logger`);

let fileConf = {};
let accessKey;
let screctKey;

program
  .version(require(`../package.json`).version)
  .option(`-p, --path <string>`, `your local path such as ./assets`)
  .option(
    `-z, --zone <string>`,
    `your  zone ,there are some options: \n` +
      `                                  华东：huad \n` +
      `                                  华北：huab \n` +
      `                                  华南：huan \n` +
      `                                  北美：beim \n`
  )
  .option(`-b, --bucket <string>`, `your target bucket such as "mybucket"`)
  .option(`-f, --prefix <string>`, `your upload prefix such as "project/assets`)
  .option(
    `-c,--config <string>`,
    `your config file's path which is relative to executing the command line directory`
  )
  .option(
    `-r, --recursion <string>`,
    `whether to upload subdirectories, if you want , please give "yes" `
  )
  .command(`push`)
  .action(() => {
    // if using config file
    if (program.config) {
      // get config content
      // CONF 为什么要大写
      // try catch 一下，不然用户输入的路径是错的，找不到文件怎么办。如果文件读不到直接就报错 exit 了
      const CONF = require(path.resolve(process.cwd(), program.config));

      // 这边可以搞一个 const OPTIONS = ["path", "zone", "bucket", ...] 这样的常量，然后遍历这个常量 
      // 做赋值 底下的 cliConf 也是一样的。这样的好处是代码更简洁，然后选项变化的时候只要修改配置就行。
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
    // if there is no accessKey or screctKey in the config file
    if (!fileConf.accessKey || !fileConf.screctKey) {
      // and if there is no AK or SK in processs.env
      if (!process.env.AK || !process.env.SK) {
        logger.error(
          `please give accessKey and screctKey by CLI such as："set AK=ak SK=sk" in Windows or "export AK=ak SK=sk" in Unix`
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
    // If some options are not given by the user through the command line
    cliArr.forEach(key => {
      if (cliConf[key] === undefined) {
        delete cliConf[key];
      }
    });
    // cliConf have higher priority
    const finalObj = Object.assign({}, fileConf, cliConf);
    const finalKeyArr = Object.keys(finalObj);
    let giveAll = true;

    // 这里不需要这么写，finalObj 里的 key 有两类，一类是必须穿的，一类是可以不传的，比如 recursion，prefix，这种如果不传是可以直接给默认值的。
    // 所以这边的校验，可以写成 React 那种 propType 和 defaultProps 类似的方式。把要有的 key 列出来，把key 的缺省值也列出来。然后来对传入的对象做处理。

    // If users don't give all the options
    finalKeyArr.forEach(key => {
      if (finalObj[key] === undefined) {
        giveAll = false;
        logger.error(`please give the option : '${key}'`);
      }
      return key;
    });
    if (!giveAll) {
      process.exit(1);
    }

    print(finalObj);

    // 直接把整个obj传进去就行，然后在upload的参数那边用 { path, zone }这样的结构赋值就行。不然你加个参数这边就要改代码。代码看起来也很乱。
    CLI.upload(
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
