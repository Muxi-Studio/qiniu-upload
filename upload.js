var getFiles = require('./readfile');
var qiniu = require("qiniu");
var fs = require('fs');


 exports.push = function(path , zone ,bucket , prefix, accessKey, secretKey ) {
//需要用户输入的命令行参数

// console.log('into:'+path);
// console.log('into:'+zone);
// console.log('into:'+bucket)
// console.log('into:'+prefix);
// console.log('into:'+accessKey)
// console.log('into:'+secretKey)

   

   

    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = zone;


    // var accessKey = '0bNiwJGpdwmvvuVAzLDjM6gnxj9MiwmSagVpIW81';
    // var secretKey = 'zHA9w8PoSfL6D4dvWNwU2GF4XHUn9MalynbANE3_';
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
    var uploadToken=putPolicy.uploadToken(mac);
    console.log(uploadToken)
    var formUploader = new qiniu.form_up.FormUploader(config);
    console.log(formUploader)
    var putExtra = new qiniu.form_up.PutExtra();
    console.log(putExtra)

    // 文件上传
    
    getFiles.getFilesUrl(path)
        .then((files,rejectValue)=>{
            if(rejectValue){
                console.log('there is some err on getFilesUrl Funciton and the rejectValue is :' + rejectValue);
                throw Error();
            } 
            //筛选出文件，防止上传文件夹而导致的错误
        let filesPaths = files.reduce((acc,file) => {
            let filePath = path + file;
        
            if(path!='./' || path != '/'){
                filePath =  path +'/'+ file;
            }
           
                let stat = fs.lstatSync(filePath);
                if(stat.isFile()) { 
                    acc.push(filePath);
                    return acc;
                }else{
                    console.log("Warn!!!it isn't a file that can't to be uploaded :  " + file)
                }
            },[]);
          console.log(filesPaths)
        // //console.log(files)
          filesPaths.map(file => {
                var key = prefix + file;
                //var localFile = file;
                var localFile = file;
               
                formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                    respBody, respInfo) {
                        console.log('into')
                    if (respErr) {
                        throw respErr;
                    }
                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                } else {
                    console.log("there may be some err with code :" + respInfo.statusCode +'and Info : ' + respBody)           
                }
            });
            console.log('异步')
        });

        })
        .catch(err => {
            
            console.log('meet err:'+err);
        });
   

}




