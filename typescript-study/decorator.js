"use strict";
// 装饰器用于扩展类或者其属性和方法
// 用法是@xxx，如在vue-property-decorator或vue-class-component中提供的@Component
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 类的装饰器，在运行时，会当作函数来运行，类的构造函数是其唯一的参数
function Log(target) {
    target.prototype.log = function () {
        console.log('current time:', new Date());
    };
}
// 方法装饰器
function AddYear(target, name, descriptor) {
    // 通过修改descriptor.value扩展了对应的方法
    var setTime = descriptor.value;
    descriptor.value = function (value) {
        console.log('current year is', new Date().getFullYear());
        setTime.call(this, value);
    };
    return descriptor;
}
// 属性装饰器，支持传入参数
function prefixer(prefix) {
    return function (target, name) {
        target[name] = prefix + target[name];
    };
}
var Clock = /** @class */ (function () {
    function Clock() {
        this.name = 'clock';
        this.curretTime = '';
    }
    Clock.prototype.setTime = function (value) {
        this.curretTime = value;
    };
    __decorate([
        prefixer('hwm_')
    ], Clock.prototype, "name", void 0);
    __decorate([
        AddYear
    ], Clock.prototype, "setTime", null);
    Clock = __decorate([
        Log
    ], Clock);
    return Clock;
}());
var clockInst = new Clock();
// @ts-ignore
clockInst.log();
clockInst.setTime('2019-08-10');
