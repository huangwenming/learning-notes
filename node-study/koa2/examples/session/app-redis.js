/**
 * @file session demo
 * @author hwm
 * @desc session利用redis做到共享
 */
const redisStore = require('koa-redis');
const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

const app = new Koa();
app.keys = ['tesghs'];

const SESSION_CONFIG = {
    key: 'hwm:test',
    maxAge: 86400000,
    httpOnly: true,
    // 为session添加签名，利用hash算法
    // feature1：把不定长摘要定长结果，如huangwenming -> h4w3m4
    // feature2：雪崩效应
    signed: true,

};
app.use(session(SESSION_CONFIG, app));

app.use(cxt => {

});
