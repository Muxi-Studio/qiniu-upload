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

const fileConf = {};
const OPTIONS = [
  `path`,
  `zone`,
  `bucket`,
  `prefix`,
  `recursion`,
  `accessKey`,
  `secretKey`
];
const defaultConf = {
  prefix: `/`,
  recursion: `yes`
};

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

      let conf;
      try {
        conf = require(path.resolve(process.cwd(), program.config));
      } catch (err) {
        logger.error(`config file path is wrong `);
        process.exit(1);
      }
      OPTIONS.forEach(option => {
        fileConf[option] = conf[option];
      });
    }
    // if there is no accessKey or secretKey in the config file
    if (!fileConf.accessKey || !fileConf.secretKey) {
      // and if there is no AK or SK in processs.env
      if (!process.env.AK || !process.env.SK) {
        logger.error(
          `please give accessKey and secretKey  in the config file or by CLI such as："set AK=ak SK=sk" in Windows or "export AK=ak SK=sk" in Unix`
        );
        process.exit(1);
      } else {
        program.accessKey = process.env.AK;
        program.secretKey = process.env.SK;
      }
    }
    const cliConf = {};
    OPTIONS.forEach(option => {
      cliConf[option] = program[option];
    });
    const cliArr = Object.keys(cliConf);
    // If some options are not given by the user through the command line
    cliArr.forEach(key => {
      if (cliConf[key] === undefined) {
        delete cliConf[key];
      }
    });
    // cliConf have higher priority
    const finalObj = Object.assign({}, defaultConf, fileConf, cliConf);
    const finalKeyArr = Object.keys(finalObj);
    let giveAll = true;

    // If users don't give all the options
    finalKeyArr.forEach(key => {
      if (finalObj[key] === undefined) {
        giveAll = false;
        logger.error(`please give the option : '${key}'`);
      }
    });
    if (!giveAll) {
      process.exit(1);
    }
    print(finalObj);
    CLI.upload(finalObj);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
