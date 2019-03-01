# 前端程序异常上报方法类

## 功能点

1. 支持window.onerror和vue.config.errorHandler的错误信息捕捉；
2. 将错误信息格式统一，然后通过jsonp格式进行上报。

错误信息的格式如下
```javascript
	let errorObj = {
        project: '', // 页面所属项目
    	message: '',
    	script: '',
    	lineNo: '',
    	columnNo: '',
        stack: '',
    };
```
## 使用方法
```bash
  npm i --save custom-error-report
```

```javascript
    import ErrorReport from 'custom-error-report';
    
    let errorHandler = new ErrorReport({
        supportType: 'vue', // 支持vue项目
        vueIns: Vue, // 传入vue对象
        project: 'collection', // 页面所属的项目
        collectAddress: 'http://localhost:8585/middleware/errorMsg/', // 接受错误信息的服务地址(需要结合自己的项目配置)
        sourceMapAddress: 'http://localhost:8585/client/test-error/' // sourceMap的访问地址(需要结合自己的项目配置)
    });
	errorHandler.enableCatchError();
```
## 示例
参考examples文件夹下的readme文件
