const logger = require("../util/logger");

module.exports = function print(path, zone, bucket, prefix, ak, sk, recursion) {
  logger.log(`path: ${path}`);
  logger.log(`zone: ${zone}`);
  logger.log(`bucket: ${bucket}`);
  logger.log(`prefix: ${prefix}`);
  logger.log(`recursion: ${recursion}`);
  logger.log(`accessKey: ${ak}`);
  logger.log(`screctKey: ${sk}`);
};
