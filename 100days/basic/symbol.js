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

// 用途1：由于唯一不可修改，可作为对象的属性名，并避免属性名重名冲突
// 场景：多个类库，可以使用Symbol来作为命名空间，避免重名，带来赋值冲突
// 举个例子
const library1property = Symbol('lib1');
function lib1tag(obj) {
    obj[library1property] = 42;
}
const library2property = Symbol('lib2');
function lib2tag(obj) {
    obj[library2property] = 369;
}
// 在举个node的例子
// 在node中如果使用console.log(obj), 如果obj中有一个inspect方法，则打印的内容是inspect方法的返回值
// node 8.9.0中 打印：3
// node 12.0.0中 打印：{ inspect: [Function: inspect] }
console.log({
    inspect: function () {
        return 3;
    }
});

// 后来在node10之后，require('util').inspect.custom中引入了Symbol解决了命名冲突问题
// inspect方法的名字在全局注册，可以通过Symbol.for('nodejs.util.inspect.custom')来获取
const inspect = Symbol.for('nodejs.util.inspect.custom');

class Password {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return 'xxxxxxxx';
    }

    [ inspect]() {
        return `Password <${this.toString()}>`;
    }
}
const password = new Password('r0sebud');
// 打印： Password <xxxxxxxx>
console.log(password);

// 用途2: 模拟私有属性
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

// Symbol类型属性不能被Object.keys()获取到，类似与Object.defineProperty()时设置enumerable特性为false；
// 但是可以两者均可以通过Reflect.ownKeys()获取到，因此并不是严格意义上的私有属性
// ['bar']
console.log(Object.keys(obj));
// ['bar', Symbol()]
console.log(Reflect.ownKeys(obj));

// 疑问：Symbol是不是用来做对象的私有属性的？？
// 答案：并不是呀，js私有属性的提案 Private Fields（https://github.com/tc39/proposal-class-fields#private-fields）

// 参考资料
// docs： https://medium.com/intrinsic/javascript-symbols-but-why-6b02768f4a5c
// docs： http://nodejs.cn/api/util.html#util_util_inspect_custom
// book：ES6标准入门：https://u.jd.com/MqVdGT
