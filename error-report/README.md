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

```javascript
    let errorHandler = new ErrorReport({
        supportType: 'vue', // 支持vue项目
        vueIns: Vue, // 传入vue对象
        project: 'collection' // 页面所属的项目
    });
	errorHandler.enableCatchError();
```
