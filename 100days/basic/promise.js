/**
 * @file Promise基础
 * @author hwm
 */

// Promise构造函数，用于包装还未支持promises的函数
// Promise的使用语法是：new Promise( function(resolve, reject) {...} /* executor */  );

// 产出promise对象的过程：
// 1:返回promise对象前，即在构造函数中要执行executor函数
// 2:executor函数需要传入两个函数，resolve和reject，
// 3:resolve和reject函数用来改变promise对象的状态，所以promise内部有一个状态属性，具有三种状态：pending，fulfilled，rejected
// 4:resolve时，设置promise.status = 'fullfilled'，然后通知promise执行响应的回调函数

// 根据上面promise对象产出的过程，下面写一个简单的自制Promise

/**
 * 简易Promise
 *
 * @class CPromise
 * @constructor
 * @param {Function} asyncFunc 接收resolve和reject两个参数
 */
function CPromise(asyncFunc) {
    this.status = 'pending';
    this.callbacks = {
        fullfilled: [],
        rejected: []
    };
    asyncFunc(this.resolve.bind(this), this.reject.bind(this));
}
CPromise.prototype.resolve = function (data) {
    this.emitStatusChange('fullfilled', data);
};

CPromise.prototype.reject = function (err) {
    this.emitStatusChange('rejected', err);
};

CPromise.prototype.then = function (successCb, failCb) {
    successCb && this.callbacks.fullfilled.push(successCb);
    failCb && this.callbacks.rejected.push(failCb);
    // then方法需要返回一个新的promise，暂时不实现该功能
};

CPromise.prototype.emitStatusChange = function (status, data) {
    this.status = status;
    if (status === 'fullfilled') {
        this.callbacks.fullfilled.forEach(function (fullfilledCb) {
            fullfilledCb(data);
        });
    }

    if (status === 'rejected') {
        this.callbacks.fullfilled.forEach(function (rejectedCb) {
            rejectedCb(data);
        });
    }

};

// 测试一下
const promise1 = new CPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve('foo');
    }, 300);
});

promise1.then(function (value) {
    // expected output: "foo"
    console.log(value);
});
// expected output: [object CPromise]
console.log(promise1);
