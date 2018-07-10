#!/usr/bin/env node

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
  .option(`-p, --path <string>`, `your local path such as ./`)
  .option(
    `-z, --zone <string>`,
    `your online zone ,there are some options: \n` +
      `                                  华东：huad \n` +
      `                                  华北：huab \n` +
      `                                  华南：huan \n` +
      `                                  北美：beim \n`
  )
  .option(`-b, --bucket <string>`, `your online bucket such as "mybucket"`)
  .option(`-f, --prefix <string>`, `your upload prefix such as "test"`)
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
      const CONF = require(path.resolve(process.cwd(), program.config));
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
