var fs = require("fs");
var chalk = require('chalk');
module.exports = function getFilesUrl(path) {
    return new Promise((resolve, reject) => {
        return fs.readdir(path, function (err, files) {
            err ? reject(err) : resolve(files);
        })
    })
}

   getFiles = async function  (path) {
   return await getFilesUrl(path)
        .then((files,rejectValue)=>{
            if (rejectValue) {
                console.log(chalk.red('there is some err on getFilesUrl Funciton and the rejectValue is :' + rejectValue));
                throw Error();
            }
            files.map((file)=> {
                let filePath = path + file;
                if (path != './' && path != '/') {
                    filePath = path + '/' + file;
                }
                let stat = fs.lstatSync(filePath);
                if(stat.isFile()) {
                    array.push(filePath);
                }else if(stat.isDirectory()) {
                    getFiles(filePath,array);
                }
            });
        })
        // .catch(err => {
        //     console.log(chalk.bold.red('ERR:meet err:' + err));
        // });
}


