# qiniu-upload-tool

This is a tool for pushing static files to QiNiu by Command Line.

## Install

    npm install -g qiniu-upload-tool

## Link

    npm link qinu-upload-tool

## Config using CLI

- first , you need to give process.env.AK and process.env.SK by this way

```js
    //in Windows
    $ set AK=ak SK=sk

    //or

    //in Unix
    $ export AK=ak SK=sk
```

- using options with '-'

         qiniu-upload push  -p path -z zone -b bucket -f prefix - r yes

## Config using FILE with other options

- first, you need to give your config file path by a option: `-w filePath` ,which is relative to your executing the command line directory.

- second, you need to make sure that the file path you give corresponds to a file whose content looks like this:

```js
module.exports = {
  accessKey: "your accessKey",
  secretKey: "your secretKey",
  path: "./",
  zone: "huad",
  bucket: "test-sdk",
  prefix: "test/",
  recursion: "yes"
};
```

_Make sure that don't push this file to public! Otherwise, others will know your keys and do something you don't expect._

**then enter these in the command line:**

    qiniu-upload push -c configPath

## Options

```js
"-p, --path <string>", "your local path such as ./";
//上传文件的空间(bucket)对应的机房
"-z, --zone <string>", "your online zone ,";
("there are some options: \n");
("                                  华东：huad ");
("                                  华北：huab ");
("                                  华南：huan ");
("                                  北美：beim ");
//上传文件的空间名
"-b, --bucket <string>", 'your online bucket such as "mybucket"';

//上传文件的前缀
"-f, --prefix <string>", 'your upload prefix such "test"';

"-c,--config <string>",
  "your config file's path which is relative to executing the command line directory";

"-r, --recursion <string>",
  'whether to upload subdirectories, if you want , please give "yes" otherwise, please give "no"';
```
