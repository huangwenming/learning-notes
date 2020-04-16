/**
 * @file Iterator.js
 * @description 迭代器模式
 * @author hwm
 */

// 迭代器模式：不暴露对象内部结构的同时，提供操作对象元素的统一接口，解决了对象使用者与对象内部结构之间的耦合
// 举个列子：
// 轮播图：涉及操作一个图片元素数组，操作的过程涉及：获取上一张图片、下一张图片，对所有的图片、某张图片进行某个操作等
// 需求特点：频繁操作数组对象，需要解决重复循环迭代问题，可以尝试创建一个迭代器类

/**
 * Dom操作迭代器
 *
 * @class DomIterator
 * @param {string} itemTag tagName
 * @param {HTMLElement} container 容器
 */
function DomIterator(itemTag, container) {
    var items = container.getElementsByTagName(itemTag);
    var length = items.length;
    // 当前索引值，默认为0
    let currentIndex = 0;
    return {
        first: function () {
            currentIndex = 0;
            return items[0];
        },
        last: function () {
            currentIndex = length - 1;
            return items[length - 1];
        },
        next: function () {
            if (++currentIndex < length) {
                return items[currentIndex];
            }
            else {
                currentIndex = length - 1;
                return null;
            }
        },
        pre: function () {
            if (--currentIndex > 0) {
                return items[currentIndex];
            }
            else {
                currentIndex = 0;
                return null;
            }
        },
        getItem: function (index) {
            currentIndex = index >= 0 ? index % length : index % length + length;
            return items[currentIndex];
        },
        // 处理所有元素
        dealEach: function (fn) {
            var args = [].splice.call(arguments, 1);
            for (var i = 0; i < length; i++) {
                fn.apply(items[i], args);
            }
        },
        // 处理某个元素
        dealItem: function (index, fn) {
            var args = [].splice.call(arguments, 2);
            fn.apply(this.getItem(index), args);
        },
        // 在dealEach的基础上，单独处理某个或某几个元素
        exclusive: function (index, allFn, indexFn) {
            this.dealEach(allFn);
            if (Object.prototype.toString.call(index) === '[object Array]') {
                for (var i = 0; i < index.length; i++) {
                    this.dealItem(index[i], indexFn);
                }
            }
            else {
                this.dealItem(index, indexFn);
            }
        }
    };
}
// 在做轮播图时，使用迭代器，就可以方便的管理图片集

// 再举个例子
// 深度取值：后端返回数据data后，通常需要深度取值，如data.user.books，通常我们需要写成这样： data && data.user && data.user.books
// 需求特点：需要一层一层做安全检查，避免程序报错，导致代码臃肿不堪
// 既然迭代器可以让调用者不关心内部结构，那可以尝试写个迭代器来解决该问题

// 变量
var data = {
    content: {
        user: {
            name: 'hwm',
            books: ['js', 'python']
        }
    }
};
var deepGetter = function (data, key) {
    if (!data) {
        return undefined;
    }

    var result = data;
    var keys = key.split('.');
    for (var i = 0; i < keys.length; i++) {
        if (result[keys[i]] !== undefined) {
            result = result[keys[i]];
        }
        else {
            return undefined;
        }
    }
    return result;
};
deepGetter(data, 'user.books');

// 启发：需求来的时候，不要立即去写代码，要先描述清楚需求，需求可以用什么模型描述，建立好抽象模型后，再动手写代码

// 参考资料
// book：JavaScript设计模式：https://u.jd.com/Or0yQC
