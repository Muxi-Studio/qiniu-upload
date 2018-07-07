const qiniu = require("qiniu");
const fs = require("fs");
const logger = require("../util/logger");
const barFn = require("../util/processBar");

const HUAD = "huad";
const HUAB = "huab";
const HUAN = "huan";
const BEIM = "beim";

exports.push = function(
  path,
  zone,
  bucket,
  prefix,
  accessKey,
  secretKey,
  recursion
) {
  // 需要用户输入的命令行参数
  const config = new qiniu.conf.Config();
  // 空间对应的机房
  const zoneMap = new Map();
  zoneMap.set(HUAD, qiniu.zone.Zone_z0);
  zoneMap.set(HUAB, qiniu.zone.Zone_z1);
  zoneMap.set(HUAN, qiniu.zone.Zone_z2);
  zoneMap.set(BEIM, qiniu.zone.Zone_na0);

  if (zoneMap.has(zone)) {
    config.zone = zoneMap.get(zone);
  } else {
    logger.error(`${zone}is a invalid zone! please give a valid zone!`);
    throw Error("invalid zone");
  }

  // 编写上传回复设置
  const options = {
    // 上次的空间
    scope: bucket,
    // 返回的数据形式
    returnBody:
      '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  };
  // 覆盖默认的上传回复设置
  const putPolicy = new qiniu.rs.PutPolicy(options);
  // 根据Key生成独一无二的mac值
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  // 根据mac值生成独一无二的上传token
  const uploadToken = putPolicy.uploadToken(mac);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  const PUT = function(file) {
    const localFile = file;
    const len = path.length;
    let key = file.slice(len);
    if (key[0] === ".") {
      key = prefix.concat(key.slice(1));
    } else if (key[0] === "/") {
      key = prefix.concat(key);
    } else {
      key = `${prefix}/${key}`;
    }

    return new Promise(resolve =>
      formUploader.putFile(
        uploadToken,
        key,
        localFile,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode === 200) {
            resolve(respBody);
          } else {
            logger.error(
              `ERROR:there may be some err with code :${
                respInfo.statusCode
              },ERR Info :`
            );
            console.log(respBody);
          }
        }
      )
    );
  };
  const getFiles = innerpath => {
    const files = fs.readdirSync(innerpath);
    let pathArr = [];
    files.map(file => {
      let filePath = innerpath + file;
      if (innerpath !== "./" && innerpath !== "/") {
        filePath = `${innerpath}/${file}`;
      }
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        pathArr.push(filePath);
      } else if (stat.isDirectory() && recursion === "yes") {
        pathArr = pathArr.concat(getFiles(filePath));
      } else {
        logger.log(
          `Warn!!!it isn't a file that can't to be uploaded :  '${file}'`,
          "yellow"
        );
      }
      return file;
    });
    return pathArr;
  };

  const command = async () => {
    const pathArr = await getFiles(path);
    const bar = barFn(pathArr.length);
    logger.log("the file you will push:", "yellow");
    console.log(`[qiniu-upload-tool] ${pathArr}`);
    pathArr.forEach(file => {
      PUT(file).then(bar.tick());
    });
    logger.success("successfully!");
  };
  command();
};
