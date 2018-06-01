var getFiles = require('./readfile');
var qiniu = require("qiniu");
var fs = require('fs');


module.exports = function(path , zone ,bucket , prefix, accessKey, secretKey ) {
//需要用户输入的命令行参数


    // process.env.path = './';

    // process.env.zone = 'qiniu.zone.Zone_z0';

    // process.env.bucket = 'test-sdk';

    // process.env.prefix = 'test/';

   

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = zone;


    // var accessKey = '0bNiwJGpdwmvvuVAzLDjM6gnxj9MiwmSagVpIW81';
    // var secretKey = 'zHA9w8PoSfL6D4dvWNwU2GF4XHUn9MalynbANE3_';
    // accessKey = process.env.accessKey;
    // secretKey = process.env.secretKey;

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
   

}




