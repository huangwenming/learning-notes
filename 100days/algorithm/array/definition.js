/**
 * @file 数组定义
 * @author hwm
 */

// 数组定义：一个存储元素的线性集合，元素可以通过索引来存取，索引通常是数字，用来表示元素存储位置的偏移量。
// js数组的特殊性：js中数组是对象，索引即对象的属性，索引在内部转换为字符串类型。
// 由于Array被视为js对象，因此存在一些方法和属性可以使用

// 类型判断
const jsArray = ['js', 'python', 'go'];

// typeof 操作符返回一个字符串，表示未经计算的操作数的类型。
// 最新的 ECMAScript 标准定义了 8 种数据类型：7个原始类型（boolean、null、undefined、number、string、bigInt、symbol） + object类型
// 原始类型特点：值本身无法被改变，如Js中字符串是不可变的，字符串的操作一定返回了一个新字符串，原始字符串并没有被改变
// object类型特点：可以被看作是一组属性的集合，包含标准对象、函数、日期、有序集（数组、类型数组）、键控集（Maps、Sets、WeakMaps、WeakSets）、JSON
// 打印：true
console.log(typeof jsArray === 'object');

// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
// 打印：true
console.log(jsArray instanceof Object);
// 打印：true
console.log(jsArray instanceof Array);

// 如何区分数组和标准对象
// 使用Object.prototype.toString.call 或 Array.isArray 或 instanceof Array
// 打印：true
console.log(Object.prototype.toString.call(jsArray) === '[object Array]');
console.log(Array.isArray(jsArray));

// 参考资料
// MDN web docs： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
// book：数据结构与算法JavaScript描述：https://u.jd.com/Axa2FQ
