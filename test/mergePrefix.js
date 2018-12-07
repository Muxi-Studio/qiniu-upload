module.exports = (file, prefix, path = ``) => {
  // path：用户输入的本地上传目录或文件路径
  // prefix：前缀
  // file：当前上传文件路径
  let newPrefix = prefix;
  if (prefix[prefix.length - 1] === `/`) {
    newPrefix = prefix.slice(0, prefix.length - 1);
  }
  const len = path.length;
  let key = file.slice(len);
  if (key[0] === `.`) {
    key = newPrefix.concat(key.slice(1));
  } else if (key[0] === `/`) {
    key = newPrefix.concat(key);
  } else {
    key = `${newPrefix}/${key}`;
  }
  return key;
};
