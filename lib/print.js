module.exports = function print(path, zone, bucket, prefix, ak, sk) {
    console.log(chalk.green('path:' + path +' zone: ' + zone +' bucket: '+ bucket + ' prefix:' + prefix));
    console.log(chalk.green('accessKey: ', ak));
    console.log(chalk.green('screctKey: ', sk));
  }