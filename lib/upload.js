const qiniu = require("qiniu");
const fs = require("fs");
const logger = require("../util/logger");
const barFn = require("../util/processBar");
const Zone = require("./const");

exports.upload = function(
  path,
  zone,
  bucket,
  prefix,
  accessKey,
  secretKey,
  recursion
) {
  // Command line parameters that require user input
  const config = new qiniu.conf.Config();
  // Space corresponding computer room
  const zoneMap = new Map();
  zoneMap.set(Zone.HUAD, qiniu.zone.Zone_z0);
  zoneMap.set(Zone.HUAB, qiniu.zone.Zone_z1);
  zoneMap.set(Zone.HUAN, qiniu.zone.Zone_z2);
  zoneMap.set(Zone.BEIM, qiniu.zone.Zone_na0);

  if (zoneMap.has(zone)) {
    config.zone = zoneMap.get(zone);
  } else {
    logger.error(`${zone}is a invalid zone! please give a valid zone!`);
    throw Error("invalid zone");
  }

  // Write an upload response setting
  const options = {
    // Upload space
    scope: bucket,
    // Returned data form
    returnBody:
      '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  };
  // Override the default upload response settings
  const putPolicy = new qiniu.rs.PutPolicy(options);
  // Generate unique mac values based on Key
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  // Generate unique token  based on mac values
  const uploadToken = putPolicy.uploadToken(mac);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  //Push files to qiniu cloud
  const push = function(file) {
    const localFile = file;
    const len = path.length;
    // Subtract the current directory name
    let key = file.slice(len);
    if (key[0] === ".") {
      key = prefix.concat(key.slice(1));
    } else if (key[0] === "/") {
      key = prefix.concat(key);
    } else {
      key = `${prefix}/${key}`;
    }
    //Using the upload interface that Officially provided
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
  // Get all file names array
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
          `Warn!!!it isn't a file that can't  be uploaded :  '${file}'`,
          "yellow"
        );
      }
      return file;
    });
    return pathArr;
  };
  // Progress bar prompts and feedback results
  const command = async () => {
    const pathArr = await getFiles(path);
    const bar = barFn(pathArr.length);
    logger.log("the file you will push:", "blue");
    console.log(`[qiniu-upload-tool] ${pathArr}`);
    pathArr.forEach(file => {
      push(file).then(bar.tick());
    });
    logger.success("successfully!");
  };
  command();
};
