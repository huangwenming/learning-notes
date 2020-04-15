/**
 * @file smd.js
 * @description 同步模块模式
 * @author hwm
 */
// 模块化开发的思想是将复杂的系统拆解成高内聚低耦合的模块
// 实现模块开发，核心是模块管理器，负责模块的创建和调用
// 下面实现一个简单的同步模块管理器

// 模块管理器，包含define和module两个方法，define用于模块创建，module用于模块的调用

// 定义模块管理器单体对象
var F = {};

/**
 * 创建模块的方法
 *
 * @method define
 * @param {string} namespace 模块命名空间
 * @param {Function} func 模块方法
 * @return {Object} 返回单体对象
 */
F.define = function (namespace, func) {
    // 将命名空间路由进行分割
    var spaces = namespace.split('.');
    // 排除掉F、F.define 和 F.module
    if (spaces[0] === 'F') {
        spaces = spaces.splice(1);
    }

    if (spaces[0] === 'define' || spaces[0] === 'module') {
        return;
    }

    // 逐层遍历，进行赋值
    var parent = this;
    var oldParent = this;
    for (var i = 0; i < spaces.length; i++) {
        if (typeof parent[spaces[i]] === 'undefined') {
            parent[spaces[i]] = {};
        }

        oldParent = parent;
        parent = parent[spaces[i]];
    }
    if (func) {
        oldParent[spaces[--i]] = func();
    }

    return this;
};

// 创建一个String模块
F.define('string', function () {
    return {
        // 清除字符串两侧空格
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
});

/**
 * 模块的调用方法
 *
 * @method module
 * @param {...(string | Object) | Array} moudleNames 依赖模块，可以是可变字符串也可以是数组
 * @param {Function} func 执行函数
 */
F.module = function (moudleNames, func) {
    var args = Array.prototype.slice.call(arguments);
    // 获取执行函数
    func = args.pop();
    // 获取依赖模块数组
    moudleNames = args[0] && args[0] instanceof Array ? args[0] : args;
    var parent;
    var modules = [];
    for (var i = 0; i < moudleNames.length; i++) {
        // 引入的是模块的路径名，则根据路径名深度遍历，获取相应的模块
        if (typeof moudleNames[i] === 'string') {
            parent = this;
            var modulePaths = moudleNames[i].replace(/^F\./, '').split('.');
            for (var j = 0; j < modulePaths.length; j++) {
                parent = parent[modulePaths[j]];
            }
            modules.push(parent);
        }
        // 引用对象，则直接赋值
        else if (moudleNames[i] instanceof Object) {
            modules.push(moudleNames[i]);
        }

    }
    // 执行回调函数，并将依赖模块作为参数传入
    func.apply(null, modules);
};

// 调用创建的模块
F.module(['string.trim'], function (trim) {
    var testStr = ' test trim method of string module ';
    // 打印：test trim method of string module
    console.log(trim(testStr));
});
F.module('string.trim', function (trim) {
    var testStr = ' test trim method of string module ';
    // 打印：test trim method of string module
    console.log(trim(testStr));
});

// 启发：同步模块模式是模块化开发最简单的形式，使用模块时，模块已经创建完毕，即创建即执行；
// 同步模块模式无法处理异步加载的模块，自然不适合在浏览器环境使用；但对于node来说，文件大多存在本地，适合同步模块模式；

// 参考资料
// book：JavaScript设计模式：https://u.jd.com/Or0yQC
