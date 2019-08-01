const express = require('express');
const fs = require('fs');
const router = express.Router();
const sourceMap = require('source-map');

const path = require('path');
const request = require('request');
const resolve = file => path.resolve(__dirname, file);

// 定义post接口
router.post('/errorMsg/', function(req, res) {
	// POST: 错误信息存储在req.body
    console.log(req.body);
	let error = req.body;
    requestHander(error, req, res);
});
router.get('/errorMsg/', function (req, res) {
    // console.log(req.query);
    // console.log(req.method);
    // GET: 错误信息存储在req.query中
    let query = req.query;
    requestHander(query, req, res);
});
// 吐出错误信息，供amis使用
router.get('/errorMsgList/', function (req, res) {
    let query = req.query;
    findFromDb(query, req, res);
})

// 请求的回调函数
function requestHander(errorInfo, req, res) {
    let url = errorInfo.script; // 压缩文件路径
    if (url) {
        let fileUrl = url + '.map'; // map文件路径
        try {
            // console.log(fileUrl);
            // 尝试读取本地文件，本地不成功，则读取线上的map文件，然后存储在本地
            // map文件路径
            let localFileUrl = url.slice(url.indexOf('js/')) + '.map';
            // map文件优先从请求中传入的地址读取
            const adressFromQuery = errorInfo.sourceMapAddress ? errorInfo.sourceMapAddress + localFileUrl : '';
            let sourceMapAddress = adressFromQuery || resolve('./mapfiles/static/' + localFileUrl);

            try {
                let originError = getOriginalPosition(sourceMapAddress, errorInfo);
                saveToDb(originError, req, res);
            } catch(err) {
                let stream = fs.createWriteStream(sourceMapAddress);
                console.log('start: 加载远程map文件到本地');
                request(fileUrl).pipe(stream).on('close', function () {
                    console.log('end: 加载远程map文件到本地');
                    let originError = getOriginalPosition(sourceMapAddress, errorInfo);
                    saveToDb(originError, req, res);
                });
            }

        } catch(err) {
            saveToDb(errorInfo, req, res);
        }

    } else {
        saveToDb(errorInfo, req, res);
    }
}

// 读取本地source-map文件，返回error信息的源信息
function getOriginalPosition(sourceMapFile, errorInfo) {
    console.log('start: 尝试读取本地map文件');
    let ret = {};
    try {
        let rawSourceMap = JSON.parse(fs.readFileSync(sourceMapFile, 'utf8'));
        console.log('end: 尝试读取本地map文件');

        console.log('start: 尝试解析本地map文件');
        let consumer = sourceMap.SourceMapConsumer(rawSourceMap);
        ret = consumer.originalPositionFor({
            // 压缩后的行号
            line: parseInt(errorInfo.lineNo, 10),
            // 压缩后的列号
            column: parseInt(errorInfo.columnNo, 10)
        });
        console.log('end: 尝试解析本地map文件');
    } catch (e) {

    }
    let timeInfo = new Date();
    return {
        project: errorInfo.project,
        message: errorInfo.message,
        script: ret.source || '',
        columnNo: ret.column || '',
        lineNo: ret.line || '',
        stack: errorInfo.stack,
        time: timeInfo.getFullYear() + '/' + (timeInfo.getMonth() + 1) + '/' + timeInfo.getDate() + ' ' + timeInfo.getHours() + ':' + timeInfo.getMinutes()
    };
}

// 存储error信息的源信息到相应的数据库
function saveToDb(errorInfo, req, res) {
    let result = saveErrorToDb(errorInfo, req, res);
    let saveResult = result.next();
    saveResult.value.then(function () {
        console.log('success-存储信息成功');
        result.next();
    });
}
// 从相应的数据库拉取error信息的源信息
function findFromDb(condition, req, res) {
    let result = getErrorListFromDb(condition, req, res);
    let findResult = result.next();
    findResult.value.then(function (data) {
        // console.log(data)
        console.log('success-拉取信息成功');
        result.next(data);
    });
}

// 数据库操作——》存储
function* saveErrorToDb(data, req, res) {
    let model = 'errorInfo';
    const Model = global.dbHandle.getModel(model);
    // console.log(data);
    const newModel = yield Model.create(data);
    console.log('返回请求结果');
    var resposeData = {
        errorNo: 0,
        message: 'error info has been received by ERROR_CENTER'
    };
    responseFunc(req, res, resposeData);
}

// 数据库操作——》拉取
function* getErrorListFromDb(condition, req, res) {
    let model = 'errorInfo';
    const Model = global.dbHandle.getModel(model);
    const docs = yield Model.find({project: condition.project}).sort({_id: -1}).limit(condition.limit);
    console.log('返回请求结果');
    // console.log(docs);
    responseFunc(req, res, docs);
}

// 响应请求
function responseFunc(req, res, resposeData) {
    const formatedResponseData = {
        message: 'done',
        errno: 0,
        data: resposeData
    }
    if (req.method === 'GET') {
        var _callback = req.query.callback;
        if (_callback) {
            res.type('text/javascript');
            res.send(_callback + '(' + JSON.stringify(formatedResponseData) + ')');
        }
        else {
            res.json(formatedResponseData);
        }
    }
    if (req.method === 'POST') {
        res.json(formatedResponseData);
    }
}

module.exports = router;
