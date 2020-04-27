/*
 * @Author: huangwenming
 * @Date: 2020-04-27 10:36:54
 */
/**
 * @file index.js
 * @description storing images and files in indexedBD
 * @author hwm
 */

// indexedDB 用于存储大量的结构化数据，通常存储文件、图片等
// indexedDB 为key-value存储型数据库，索引实现对数据的高性能搜索

// 数据库特点
// indexedDB 是一个事务型数据库系统；在事务中完成数据的修改
// indexedDB 提供 同步和异步API，同步api只能在web-worker中使用，目前主流浏览器未支持同步api
// indexedDB 也有同源限制，不能跨域访问

// 使用方法
// 1.创建数据库 && 链接数据库
const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB
|| window.OIndexedDB || window.msIndexedDB;
// 数据库版本
const dbVersion = 2;

const request = indexedDB.open('testDB', dbVersion);
request.addEventListener('success', event => {
    console.log('连接数据库成功');
    // 3.创建读写事务
    const db = event.target.result;
    const tx = db.transaction('Books', 'readwrite');

    // 4.写入数据
    const store = tx.objectStore('Books');

    // 添加数据，相同key值添加不成功
    const reqAdd = store.add({bookId: 4, bookName: 'css', price: 21});

    reqAdd.addEventListener('success', event => {
        console.log('保存成功');
        // 5.取出数据
        const reqGet = store.get(1);
        reqGet.addEventListener('success', event => {
            console.log('读取成功');
            console.log(event.target.result.bookName);
        });
    });
});

request.addEventListener('error', event => {
    console.log('连接数据库失败');
});
// 2.创建对象仓库（objectStore），必须在数据库升级的时候调用createObjectStore生成
// 对象仓库有点像数据表，名字不能重复
request.addEventListener('upgradeneeded', event => {
    const db = event.target.result;
    // 判断数据仓库是否已经存在
    if (!db.objectStoreNames.contains('Books')) {
        // 创建索引，也可以通过objectStore.createIndex('key','bookId') 索引名称，索引所在的属性
        const store = db.createObjectStore('Books', {keyPath: 'bookId', autoIncrement: false});
        console.log('创建对象仓库成功');
    }
});

// 注意事项
// 1.存储空间和达到存储上限时要怎么删除内容？

// 2.使用同步怎么办
