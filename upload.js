var getFiles = require('./readfile');
var qiniu = require("qiniu");
var fs = require('fs');


exports.push = function (path, zone, bucket, prefix, accessKey, secretKey) {
    //需要用户输入的命令行参数

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    if(zone == "huad") {
        config.zone = qiniu.zone.Zone_z0;
    } else if(zone == 'huab') {
        config.zone = qiniu.zone.Zone_z1;
    } else if(zone == "huan") {
        config.zone = qiniu.zone.Zone_z2;
    } else if(zone == 'beim') {
        config.zone = qiniu.zone.Zone_na0;
    } else {
        config.zone = qiniu.zone.Zone_z0;
    }
    
    

    // var path = './';
    // var zone = 'qiniu.zone.Zone_z0';
    // var bucket = 'test-sdk';
    // var prefix = 'test/';


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
    var uploadToken = putPolicy.uploadToken(mac);
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();


    // 文件上传

    getFiles.getFilesUrl(path)
        .then((files, rejectValue) => {
            if (rejectValue) {
                console.log('there is some err on getFilesUrl Funciton and the rejectValue is :' + rejectValue);
                throw Error();
            }
            //筛选出文件，防止上传文件夹而导致的错误
            let filesPaths = [] ;
            files.map((file) => {
                let filePath = path + file;
                if (path != './' && path != '/') {
                    filePath = path + '/' + file;
                } 
                let stat = fs.lstatSync(filePath);
                if (stat.isFile()) {
                    filesPaths.push(file);
                } else {
                    console.log("Warn!!!it isn't a file that can't to be uploaded :  '" + file + "'")
                }
            });
          
            filesPaths.map(file => {
               let key = prefix + file;
               let filePath = path + file;
                if (path != './' && path != '/') {
                    filePath = path + '/' + file;
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
                        console.log("there may be some err with code :" + respInfo.statusCode + 'and Info : ' + respBody)
                    }
                   
                });
                console.log("push successfully!!! there are responses :")
          });

        })
        .catch(err => {
            console.log('meet err:' + err);
        });
}




