# qiniu-upload

This is a tool for pushing static files to QiNiu by Command Line.

## Install
    npm install -g qiniu-upload
## Config using CLI
  
- using options with '-'

         qiniu-upload push accessKey screctKey CLI -p path -z zone -b bucket -f prefix
   
- using options with description
   
        qiniu-upload push accessKey screctKey CLI
    
    **then the command line will remind you to enter one by one , like:**
   
        path:
        zone:
        bucket:
        prefix:
  
## Config using FILE
qiniu-upload will find **qiniu-upload.config.js** under the working directory, **qiniu-upload.config.js**  is a file like this:
```js
    module.exports = {
      path : './',
      zone :'huad',
      bucket :'test-sdk',
      prefix : 'test/'
    }
```
**then enter these in the command line:**

    qiniu-upload push accessKey screctKey FILE

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