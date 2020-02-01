/**
 * @file typescript five minutes start
 * @author hwm
 * @description 执行tsc ./start-fiveMinutes/start.ts命令转换成js文件
 */

// ts的高级功能：主要用于约束（类型或结构），有效减少很多潜在的运行时错误，在vue-core、vue-router和vuex中采用了ts进行类型声明；
// 功能1：类型注解，为函数或变量添加约束
// 约束greeter函数的参数为string类型
function greeter(person: string) {
    return "Hello, " + person;
}

// let user = "Jane User";
// user不是字符串类型则报错，webstorm也会给出语法提示错误
let user = [1, 3, 4];

document.body.innerHTML = greeter(user);


// 功能2：接口（类似自定义类型），确保类型内部结构兼容
// 接口限定对象的内部结构
interface Person {
    firstName: string;
    lastName: string;
}
function greeterFunc(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
// 在实现接口时候只要保证包含了接口要求的结构就可以, 不必明确地使用implements语句
let userPerson = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeterFunc(userPerson);


// 功能3：类，ts支持ES6中的class
// class约束了一些公共字段+构造函数， 开发者根据抽象级别选用接口或类进行结构约束
class Student {
    fullName: string;
    // 构造函数的参数上使用public等同于创建了同名的成员变量
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greet(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let student = new Student("Jane", "M.", "User");

document.body.innerHTML = greet(student);
