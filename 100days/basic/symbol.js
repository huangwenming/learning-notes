/**
 * @file Symbol类型介绍
 * @author hwm
 */

// Symbol类型是js新推出的原始类型，它究竟有什么用途，用于解决什么问题呢？

// 用途：一种无法重建的基本类型，有点像基于构造函数创建对象实例，实例并不相等
// 举个例子
const test1 = Symbol('test');
const test2 = Symbol('test');
// 打印：false
console.log(test1 === test2);
// 打印：Symbol(test)
console.log(test1);

// 问题1：对象的属性名只能是字符串，如果键值传入非字符串，会转换成字符串
// 举个例子
const obj = {};
obj.name = 'kitty';
obj.age = 2;
obj[3] = 3;
obj[{}] = 'others';
// 打印： {name: 'kitty', age: 2,  '3': 3, '[object Object]': 'others'}
console.log(obj);

// 用途1：可作为对象的属性名，并避免属性名重名冲突
// 举个例子
const obj = {};
const sym = Symbol();
obj[sym] = 'foo';
obj.bar = 'bar';
// { bar: 'bar' }
console.log(obj);
// true
console.log(sym in obj);
// foo
console.log(obj[sym]);
// ['bar']
console.log(Object.keys(obj));
// ['bar', Symbol()]
console.log(Reflect.ownKeys(obj));

// 疑问：Symbol是不是用来做对象的私有属性的？？
// 答案：并不是呀，js私有属性的提案 Private Fields（https://github.com/tc39/proposal-class-fields#private-fields）

// 参考资料
// docs： https://medium.com/intrinsic/javascript-symbols-but-why-6b02768f4a5c
// book：ES6标准入门：https://u.jd.com/MqVdGT
