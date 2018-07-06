var  getFilesUrl = require("./readfile");
var qiniu = require("qiniu");
var fs = require("fs");
var chalk = require("chalk");

const HUAD = "huad";
const HUAB = "huab";
const HUAN = "huan";
const BEIM = "beim";

exports.push = function (path, zone, bucket, prefix, accessKey, secretKey) {
	//需要用户输入的命令行参数
	var config = new qiniu.conf.Config();
	// 空间对应的机房
	const zoneMap = new Map();
	zoneMap.set(HUAD, qiniu.zone.Zone_z0);
	zoneMap.set(HUAB, qiniu.zone.Zone_z1);
	zoneMap.set(HUAN, qiniu.zone.Zone_z2);
	zoneMap.set(BEIM, qiniu.zone.Zone_na0);

	if(zoneMap.has(zone)) {
		config.zone = zoneMap.get(zone);
	} else {
		console.log(chalk.red(zone +"is a invalid zone! please give a valid zone!"));
		throw Error("invalid zone");
	}

  

	//编写上传回复设置
	var options = {
		//上次的空间
		scope: bucket,
		//返回的数据形式
		returnBody: "{\"key\":\"$(key)\",\"hash\":\"$(etag)\",\"fsize\":$(fsize),\"bucket\":\"$(bucket)\",\"name\":\"$(x:name)\"}"
	};
	// 覆盖默认的上传回复设置
	var putPolicy = new qiniu.rs.PutPolicy(options);
	//根据Key生成独一无二的mac值
	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	//根据mac值生成独一无二的上传token
	var uploadToken = putPolicy.uploadToken(mac);
	var formUploader = new qiniu.form_up.FormUploader(config);
	var putExtra = new qiniu.form_up.PutExtra();

	// 文件上传
	getFilesUrl(path)
		.then((files, rejectValue) => {
			if (rejectValue) {
				console.log(chalk.red("there is some err on getFilesUrl Funciton and the rejectValue is :" + rejectValue));
				throw Error();
			}
			//筛选出文件，防止上传文件夹而导致的错误
			let filesPaths = [];
			files.map((file) => {
				let filePath = path + file;
				if (path != "./" && path != "/") {
					filePath = path + "/" + file;
				}
				let stat = fs.lstatSync(filePath);
				if (stat.isFile()) {
					filesPaths.push(file);
				} else if(stat.isDirectory()){

					console.log(chalk.yellow("Warn!!!it isn't a file that can't to be uploaded :  '" + file + "'"));

				}
			});

			filesPaths.map(file => {
				let key = prefix + file;
				let filePath = path + file;
				if (path != "./" && path != "/") {
					filePath = path + "/" + file;
				}
				let localFile = filePath;
				formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
					respBody, respInfo) {

					if (respErr) {
						throw respErr;
					}
					if (respInfo.statusCode == 200) {

						console.log(respBody);
					} else {
						console.log(chalk.red("ERROR:there may be some err with code :" + respInfo.statusCode + "and Info : " + respBody));
					}
				});
			});
			console.log(chalk.bold.green("push successfully!!! there are responses :"));
		})
		.catch(err => {
			console.log(chalk.bold.red("ERR:meet err:" + err));
		});
};




