// 装饰器用于扩展类或者其属性和方法
// 用法是@xxx，如在vue-property-decorator或vue-class-component中提供的@Component

// 类的装饰器，在运行时，会当作函数来运行，类的构造函数是其唯一的参数
function Log(target: Function) {
    target.prototype.log = function() {
        console.log('current time:', new Date());
    };
}
// 方法装饰器
function AddYear(target: any, name: string, descriptor: any) {
    // 通过修改descriptor.value扩展了对应的方法
    const setTime = descriptor.value;
    descriptor.value = function (value: string) {
        console.log('current year is', new Date().getFullYear());
        setTime.call(this, value);
    };
    return descriptor;
}
// 属性装饰器，支持传入参数
function prefixer(prefix: string) {
    return function (target: any, name: string) {
        target[name] = prefix + target[name];
    };
}

@Log
class Clock {
    @prefixer('hwm_') name: string = 'clock';
    curretTime: string = '';

    @AddYear
    setTime(value: string) {
        this.curretTime = value;
    }
}
const clockInst = new Clock();
// @ts-ignore
clockInst.log();

clockInst.setTime('2019-08-10');

