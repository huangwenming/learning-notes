/**
 * @file https server end
 * @author hwm(huangwenming@baidu.com)
 */

const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./key-pem-crt/server.key'),
    cert: fs.readFileSync('./key-pem-crt/server.crt'),
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('this is a https service!');
}).listen(8080);

console.log('修改host，然后访问：https://test.baidu.com:8080');
