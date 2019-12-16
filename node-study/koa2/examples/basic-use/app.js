/**
 * @file koa2 基础使用
 * @description 主要用于和express进行对比
 * @author hwm
 */
const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');

const app = new Koa();

// 静态服务
app.use(KoaStatic('./statics'));

// 中间件
app.use((context, next)=> {
    context.body = {
        msg: 'hello, i am koa2'
    };
    next();
});

// 日志
app.use(async(context, next)=> {
    const start = new Date().getTime();
    await next();
    const end = new Date().getTime();
    console.log(`the time consuming of the gethtml api :${end - start}ms`);
});

app.use((context, next)=> {
    if (context.url === '/gethtml') {
        context.type = 'text/html; charset=utf-8';
        context.body = `<h3>${context.body.msg}</h3>`;
    }
    next();
});


// 路由
const router = new KoaRouter();
router.get('/html', (context, next)=> {
    context.type = 'text/html; charset=utf-8';
    context.body = `<h2>${context.body.msg}</h2>`;
    next();
});
app.use(router.routes());


app.listen(3000, err => {
    if (!err) {
        console.log('server is listenning on port 3000');
    }
    else {
        console.log('server fails to start on port 3000');
    }
});
