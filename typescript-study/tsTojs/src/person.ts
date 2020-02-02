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
