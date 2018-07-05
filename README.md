# qiniu-upload-tool

This is a tool for pushing static files to QiNiu by Command Line.

## Install
    npm install -g qiniu-upload-tool
## Link 
    npm link qinu-upload-tool

 **Make sure that don't push this file to public!**  


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

qiniu-upload will find **qiniu-upload.config.js** under the working directory, **qiniu-upload.config.js**  is a file like this:
```js
    module.exports = {
      accessKey:"your accessKey",
      screctKey:"your screctKey",
      path : './',
      zone :'huad',
      bucket :'test-sdk',
      prefix : 'test/',
      recursion: 'yes',
    }
```
*Warn!!!: if there are folders in the path which you give,the tool will ignore them!*

**then enter these in the command line:**

    qiniu-upload push FILE

## Options

```js
  '-p, --path <string>', 'your local path such as ./'
  //上传文件的空间(bucket)对应的机房
  '-z, --zone <string>', 'your online zone ,' 'there are some options: 华东：huad  华北：huab 华南：huan 北美：beim '
  //上传文件的空间名
 '-b, --bucket <string>', 'your online bucket such as "mybucket"'
  //上传文件的前缀
 '-f, --prefix <string>', 'your upload prefix such "test\\"'
  
```