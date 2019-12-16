/**
 * @file express 基础使用
 * @description 主要用于和koa进行对比
 * @author hwm
 */
const express = require('express');
const router = express.Router();

const app = new express();

// 静态服务
app.use(express.static('./statics'));

// 路由
app.get('/gethtml', (req, res)=> {
    res.type('html');
    res.send(`<h2>hello, i am express</h2>`);
});

// invoked for any requests passed to this router
router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    next()
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
    // ..
});

// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);


app.listen(3001, err => {
    if (!err) {
        console.log('server is listenning on port 3001');
    }
    else {
        console.log('server fails to start on port 3001');
    }
});
