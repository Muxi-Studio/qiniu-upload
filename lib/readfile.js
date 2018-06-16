var fs = require("fs");

function getFilesUrl(path) {
    return new Promise((resolve, reject) => {
        return fs.readdir(path, function (err, files) {
            err ? reject(err) : resolve(files);
        })
    })
}

module.exports = getFilesUrl;

