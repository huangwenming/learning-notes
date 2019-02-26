/**
 * @file 错误异常收集
 *
 */

import util from './libs/util.js';

/**
 * 错误上报类
 *
 * @class
 */
class ErrorReport {
    constructor(options) {
        // 注册一个error的缓存，重复的错误无需重复提交
        this.errorCache = {};
        // 项目或产品线
        this.project = options.project || 'collection';
        // 日志收集后端接口地址
        this.collectAddress = options.collectAddress || 'http://localhost:8080/middleware/errorMsg/';
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
    reporError(errorObj) {
        let url = this.collectAddress;
        // 可以考虑将errObj整体做为一个json串传递到后端，以便做扩展
        // 读取errorCache，进行重复消息过滤; key值为message + script + lineNo + columnNo
        let key = (errorObj.message + errorObj.script + errorObj.lineNo + errorObj.columnNo).trim().replace(/\s/g, '');
        if (key in this.errorCache) {
            return;
        } else {
            this.errorCache[key] = 1;
        }
        util.jsonp(url, errorObj, function (data) {
            console.log('error message has been send to server successfully');
        })
    }
}

export default ErrorReport;
