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
var testStr = ' test trim method of string module ';
// 打印：test trim method of string module
console.log(F.string.trim(testStr));
