module.exports = getExtension = (localFile) => {
    const extension = /(\/)?[\w]+\.([\w]+)+$/.exec(localFile)[2];
    return extension;
}