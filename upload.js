var getFiles = require('./readfile');
var qiniu = require("qiniu");
var fs = require('fs');
var argv = require('commander').parse(process.argv)


function warn (arg) {
    console.log(`Warn: please give me the ${arg} !!!`) ;
}

//需要用户输入的命令行参数
var path , zone ,bucket , prefix;

path = argv.path ? argv.path : warn("path");
zone = argv.zone ? argv.zone : warn("zone");
bucket = argv.bucket ? argv.bucket : warn("bucket");
prefix = argv.prefix ? argv.prefix : warn("prefx")

// process.env.path = './';

// process.env.zone = 'qiniu.zone.Zone_z0';

// process.env.bucket = 'test-sdk';

// process.env.prefix = 'test/';



var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

// 华东：qiniu.zone.Zone_z0
// 华北：qiniu.zone.Zone_z1
// 华南：qiniu.zone.Zone_z2
// 北美：qiniu.zone.Zone_na0

var accessKey = '0bNiwJGpdwmvvuVAzLDjM6gnxj9MiwmSagVpIW81';
var secretKey = 'zHA9w8PoSfL6D4dvWNwU2GF4XHUn9MalynbANE3_';


//编写上传回复设置
var options = {
    //上次的空间
    scope: bucket, 
    //返回的数据形式
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}' 
}
// 覆盖默认的上传回复设置
var putPolicy = new qiniu.rs.PutPolicy(options);
//根据Key生成独一无二的mac值
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//根据mac值生成独一无二的上传token
var uploadToken=putPolicy.uploadToken(mac);

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

// 文件上传
if(path && zone && bucket && prefix)
getFiles.getFilesUrl(path)
    .then((files,rejectValue)=>{
        if(rejectValue){
            console.log('there is some err on getFilesUrl Funciton and the rejectValue is :' + rejectValue);
             throw Error();
        } 
        //筛选出文件，防止上传文件夹而导致的错误
      let filesPath = files.filter(file => {
            let stat = fs.lstatSync(file);
            if(stat.isFile()) {
                return file;
            }else{
                console.log("Warn!!!it isn't a file that can't to be uploaded :  " + file)
            }
        });
        filesPath.forEach(file => {
            var key = prefix + file;
            var localFile =  file;
            formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log("there may be some err with code :" + respInfo.statusCode +'and Info : ' + respBody)           
            }
       });
   });

    })
    .catch(err => {
        console.log('meet err');
    });
   






