var chalk = require("chalk");
module.exports = function print(path, zone, bucket, prefix, ak, sk, recursion) {
	console.log(chalk.green("path: "+ path +"\nzone: " + zone +"\nbucket: "+ bucket + "\nprefix: " + prefix));
	console.log(chalk.green("accessKey: ", ak));
	console.log(chalk.green("screctKey: ", sk));
	console.log(chalk.green("recursion: ", recursion));
};