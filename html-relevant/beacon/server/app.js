/**
 * @file app.js
 * @desc node服务入口文件
 * @type {createApplication}
 */

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

// 处理formdata参数
const multiparty = require('connect-multiparty');

const app = new express();

// 处理日志post请求
app.post('/log', multiparty(), (req, res)=> {
    console.log(req.body);
    res.json({
        errorNo: 0,
        message: 'beacon info has been received by server'
    });
    res.end();
});

// 指定静态目录
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// 指定监听端口
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server started at localhost:${port}`);
});
