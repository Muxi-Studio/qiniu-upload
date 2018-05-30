var  getFiles = require('./readfile');
var qiniu = require("qiniu");


//需要用户输入的参数
//需要读取文件的根目录
process.env.path = './';
//上传文件的空间(bucket)对应的机房
process.env.zone = 'qiniu.zone.Zone_z0';
//上传文件的空间名
process.env.bucket = 'test-sdk';
//上传文件的前缀
process.env.prefix = 'test/';



var filesPath ;
getFiles.getFilesUrl(process.env.path).then(files=>{
    console.log('into');
    console.log(files)
    filesPath = files;
}).catch(err => {
    console.log('into err');
    throw new Error()
})





// var config = new qiniu.conf.Config();
// // 空间对应的机房
// config.zone = qiniu.zone.Zone_z0;

// var accessKey = 
// var secretKey =
// var options = {
//     scope: process.env.bucket,
//     returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
// }
// var putPolicy = new qiniu.rs.PutPolicy(options);
// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// var uploadToken=putPolicy.uploadToken(mac);

// // var localFile = "./file.js";
// var formUploader = new qiniu.form_up.FormUploader(config);
// var putExtra = new qiniu.form_up.PutExtra();

// // 文件上传
// var respBodyArr = [];

// filesPath.forEach(file => {
//     var key = prefix + file;
//     var localFile =  file;
//     formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
//         respBody, respInfo) {
//         if (respErr) {
//           throw respErr;
//         }
//         respBody.status = respInfo.statusCode;
//         respBodyArr.push(respBody);
//         // if (respInfo.statusCode == 200) {
//         //   //console.log(respBody);
            
//         //   respBodyArr.push(respBody);
//         // } else {
//         //   console.log(respInfo.statusCode);
//         //   respBodyArr.push(respBody);
//         // }
//       });
//     console.log(respBodyArr);
// });
