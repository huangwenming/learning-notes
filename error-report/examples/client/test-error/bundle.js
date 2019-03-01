/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/test-error/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/util.js */ "../libs/util.js");
/**
 * @file 错误异常收集
 *
 */



/**
 * 错误上报类
 *
 * @class
 */
class ErrorReport {
    /**
     * ErrorReport构造函数
     * @param options
     * @required options.collectAddress 日志收集后端接口地址
     */
    constructor(options) {
        // 注册一个error的缓存，重复的错误无需重复提交
        this.errorCache = {};
        // 项目或产品线
        this.project = options.project || 'collection';
        // 日志收集后端接口地址
        this.collectAddress = options.collectAddress || 'http://localhost:8080/middleware/errorMsg/';
        // sourceMap的存放地址
        this.sourceMapAddress = options.sourceMapAddress || '';
        // 错误信息收集类型（window, vue, react）
        this.supportType = options.supportType || 'window';
        this.supportIns = options.supportIns || window;
    }

    /**
     * 开启获取error信息
     */
    enableCatchError() {
        let self = this;
        // 默认采用window.onerror来捕获error信息
        window.onerror = function () {
            self.sendErrorInfo(self.formatError('window', arguments));
        };
        // 捕获vue项目中的error信息
        if (self.supportType === 'vue') {
            self.supportIns.config.errorHandler = function (error) {
                self.sendErrorInfo(self.formatError('vue', error));
            };
        }
    }

    /**
     * 关闭获取error信息
     */
    disableCatchError() {
        window.onerror = function () {};
        if (self.supportType === 'vue') {
            self.supportIns.config.errorHandler = function () {};
        }

    }

    /**
     * 格式化error信息
     * @param type {string} 错误捕获类型['window', 'vue']
     * @param errorObj {Object|Array} 错误信息
     * @returns {{message: string, script: string, lineNo: string, columnNo: string, stack: string, project: (*|string)}}
     */
    formatError(type, errorObj) {
        let self = this;
        // 标准输出错误信息的格式
        let formatError = {
            message: '',
            script: '',
            lineNo: '',
            columnNo: '',
            stack: '',
            project: self.project
        };
        // window.onerror类型错误处理
        if (type === 'window') {
            let [message, script, lineNo, columnNo, error] = errorObj;
            formatError.message = message || '';
            formatError.script = script || '';
            formatError.lineNo = lineNo || '';
            formatError.columnNo = columnNo || '';
            formatError.stack = error && error.stack ? error.stack : '';
        }
        // vue.config.errorHandler类型错误处理
        if (type === 'vue') {
            let {line: lineNo, column: columnNo, sourceURL: script, message, stack} = errorObj;
            // 如果vue不能正常解析error，则解析stack
            if (!(script && lineNo)) {
                // 利用正则，筛出scriptURI, lineNo, columnNo
                // todo 正则或许与浏览器有关系
                let regResult = /\(([^\(\)]*)\)/.exec(stack);
                if (regResult[0] && regResult[1]) {
                    let results = regResult[1].split(':');
                    let length = results.length;
                    lineNo = results[length - 2] || null;
                    columnNo = results[length - 1] || null;

                    let index = regResult[1].indexOf(':' + lineNo);
                    if (index > -1) {
                        script = regResult[1].substring(0, index);
                    }
                }
            }
            formatError.message = message || '';
            formatError.script = script || '';
            formatError.lineNo = lineNo || '';
            formatError.columnNo = columnNo || '';
            formatError.stack = stack || '';
        }
        return formatError;
    }

    /**
     * 上报错误信息
     * @param errorObj {Object} 错误信息
     */
    sendErrorInfo(errorObj) {
        let url = this.collectAddress;
        // 可以考虑将errObj整体做为一个json串传递到后端，以便做扩展
        // 读取errorCache，进行重复消息过滤; key值为message + script + lineNo + columnNo
        let key = (errorObj.message + errorObj.script + errorObj.lineNo + errorObj.columnNo).trim().replace(/\s/g, '');
        if (key in this.errorCache) {
            return;
        } else {
            this.errorCache[key] = 1;
        }
        // 上传时携带上sourceMap文件的地址
        errorObj.sourceMapAddress= this.sourceMapAddress;
        _libs_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].jsonp(url, errorObj, function (data) {
            console.log('error message has been send to server successfully');
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ErrorReport);


/***/ }),

/***/ "../libs/util.js":
/*!***********************!*\
  !*** ../libs/util.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
window.jsonpcb = {};
/* harmony default export */ __webpack_exports__["default"] = ({
    /**
     * jsonp请求
     * @param {string} url 请求url
     * @param {Object} data 请求参数
     * @param {Function} successCb 回调函数
     * @param {Function} failCb 回调函数
     * @param {string} cbParamType url中回调函数参数名，默认为【callback】
     * @return {boolean} false
     */
    jsonp: function (url, data, successCb, failCb, cbParamType) {
        let md5 = Math.ceil(Math.random() * 100000);
        let cbn = 'jsonpcb' + md5;
        cbParamType = cbParamType || 'callback';
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + cbParamType + '=window.jsonpcb.' + cbn;
        data.ctime = new Date().getTime();
        for (let key in data) {
            // 需要对stack中的内容进行encodeURIComponent处理，避免由于stack中的特殊字符导致http请求被blocked
            if (key === 'stack' && data[key]) {
                data[key] = encodeURIComponent(data[key]);
            }
            if (typeof data[key] === 'object') {
                url += '&' + key + '=' + JSON.stringify(data[key]);
            }
            else {
                url += '&' + key + '=' + data[key];
            }
        }
        let script = document.createElement('script');
        window.jsonpcb[cbn] = (response)=> {
            script.parentNode.removeChild(script);
            successCb && successCb(response);
            window.jsonpcb[cbn] = null;
        };
        script.onerror = ()=> {
            script.parentNode.removeChild(script);
            failCb && failCb();
            window.jsonpcb[cbn] = null;
        };
        // console.log(url);
        script.type = 'text/javascript';
        script.src = url;
        // 请求2s延缓发出，尽量在页面加载的时候，不占用资源
        setTimeout(()=>{document.body.appendChild(script);}, 2000);
    }
});


/***/ }),

/***/ "./client/test-error/index.js":
/*!************************************!*\
  !*** ./client/test-error/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../index.js */ "../index.js");


var errorHandler = new _index_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    supportType: 'window',
    project: 'test',
    collectAddress: 'http://localhost:8585/middleware/errorMsg/',
    sourceMapAddress: 'http://localhost:8585/client/test-error/'
});
errorHandler.enableCatchError();

console.log(a);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map