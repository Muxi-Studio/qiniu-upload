var fs = require("fs");


function getFilesUrl(path) {
    // let resolve = function(files) {
    //     console.log('filse:'+files);
    //     return filse;
    // }
    // let reject = function(err) {
    //     throw err;
    // }
    return new Promise((resolve,reject)=>{
        return fs.readdir(path,function(err,files) {
            err !== undefined ? reject(err) : resolve(files);
        })
    }) 
}



exports.getFilesUrl =  getFilesUrl;

