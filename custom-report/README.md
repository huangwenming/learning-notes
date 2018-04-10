# 前端程序异常收集与上报

## 功能点

1 接收错误信息，错误信息的格式如下

```javascript
	var errorObj = {
    	message: '',
    	script: '',
    	lineNo: '',
    	columnNo: '',
        stack: '',
    };
```

2 支持get和post请求

3 如果有对应的source-map文件，则解析出源文件中的报错位置，存储在数据库中；否则直接存储错误信息

4 source-map文件优先从本地读取，没有的话，从远程读取，读取后存储在本地，相应的文件夹为`.server/mapfiles/`

5 错误信息存储的mongodb库为：report->errorinfos, 表的设计文件在`.server/database/model.js`

## 如何使用

1 开启mongodb进程，默认端口即可

2 只使用收集功能，项目目录下`npm run dev`启动服务；借用前端页面进行测试，`npm run test`，然后访问http://localhost:8585/

3 node版本：node > 6.0

