const express = require('express');
const bodyParser = require('body-parser');

// 构造web服务
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/302', function (req, res) {
    const query = req.query;
    // 判断是否登录，通过query中的login参数来模拟
    if (query.login) {
        res.send('you are already logged in!');
    }
    // 未登录，则302到登录（测试wappass和baseshell的openapi登录）
    else {
        const destinationUrl = 'http://172.21.217.88:8000/302?login=1';
        const loginHost = query.loginType !== 'base' ? 'https://wappass.baidu.com/passport' : 'bdapi://';
        const loginParams = query.loginType !== 'base'
            ? '/?login&sms=1&tpl=map_auto_insurance&u=' + encodeURIComponent(destinationUrl)
            : 'login?login_page=normal&ext_param=' + JSON.stringify({url: 'https://www.baidu.com'});
        res.writeHead(302, {location: loginHost + loginParams});
        res.end('you need log in first!');
    }
});

app.listen(8800, function () {
    console.log('Example app listening on port 8800!');
});
