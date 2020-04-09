/**
 * @file 对象解读
 * @author hwm
 *
 */

// JavaScript中对象有3类，分别是本地对象、内置对象和宿主对象。

// 1.本地对象
// 特点：ECMAScript实现提供的对象，独立于宿主环境；通过new来创建所需的实例对象
// 代表：Object、Array、Date、RegExp、Function、Boolean、Number、String等，
// 其中Boolean、Number、String也可以使用new，但不建议使用

// 2.内置对象
// 特点：ECMAScript实现提供的对象，独立于宿主环境；本身就是实例化内置对象，开无需再去实例化
// 代表：global、Math、JSON

// 3.宿主对象
// 特点：由 ECMAScript 实现的宿主环境提供的对象；如浏览器环境下的DOM和BOM对象
// 代表：window、document、navigator

// 注意点：在node环境使用js需要注意浏览器环境中的宿主对象是不能使用的，比如常用的基础库在不同的环境中需要做兼容适配。

// 参考资料
// docs： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference
// docs： https://segmentfault.com/a/1190000011467723
// book：JavaScript高级程序设计（第三版）：https://u.jd.com/sj0iPL
