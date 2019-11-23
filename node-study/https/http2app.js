/**
 * @file http2 server end
 * @author hwm(huangwenming@baidu.com)
 *
 * 使用express + spdy搭建http2服务
 */

const spdy = require('spdy');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('*', function (req, res) {
    res.writeHead(200);
    res.end('this is a http2 service!');
});

const options = {
    key: fs.readFileSync('./key-pem-crt/server.key'),
    cert: fs.readFileSync('./key-pem-crt/server.crt'),
};
spdy.createServer(options, app).listen(8080, function (error) {
    if (!error) {
        console.log('修改host，然后访问：https://test.baidu.com:8080');
    } else  {
        console.log('fail start port 8080');
    }
});

