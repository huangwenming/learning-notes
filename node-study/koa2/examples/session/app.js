/**
 * @file session demo
 * @author hwm
 * @desc session根实例绑定，不能做到共享
 */
const Koa = require('koa');
const session = require('koa-session');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.keys = ['tesghs'];

const SESSION_CONFIG = {
    // cookie的键名
    key: 'hSession',
    maxAge: 86400000,
    // cookie值只能用于传输，不能被前端document.cookie读取
    httpOnly: true,
    // 添加hSession.sig键名，为session添加签名，利用hash算法
    // feature1：把不定长摘要定长结果，如huangwenming -> h4w3m4
    // feature2：雪崩效应
    signed: true
};
// 注册session中间件
app.use(session(SESSION_CONFIG, app));

// 使用cookie-session进行鉴权
app.use(async (ctx, next) => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;
    // 放行login接口
    if (ctx.url === '/login') {
        next();
        return;
    }
    // 取出cookie中的session进行校验
    console.log(ctx.request.header.cookie);
    console.log(ctx.session.huid);
    if (!ctx.session.huid) {
        ctx.body = {
            msg: '未登录，访问/login进行登录'
        };
    } else {
        next();
    }

});

// 模拟登录，写入cookie-session
router.get('/login', ctx => {
    // 对session值进行加密生成hSession和hSession.sig
    ctx.session.huid = Math.floor(Math.random() * 898989);
    ctx.body = {
        msg: '登录成功',
        userInfo: {
            huid: ctx.session.huid
        }
    };
});

// 获取用于信息接口
router.get('/getUserInfo', ctx => {
    ctx.body = {
        msg: '获取用户信息成功',
        userInfo: {
            huid: ctx.session.huid
        }
    };
});

app.use(router.routes());
app.listen(8090, err => {
    console.log('server listen on 8090');
});
