// ts中的类和es6中大体相同，这里重点关注ts带来的访问控制等特性
class Parent {
    // 私有属性，不能在类的外部访问
    private _name = 'hwm';
    // 保护属性，可以在子类访问
    protected age = 19;
    // 成员属性
    title: string = '';
    // 构造函数
    constructor(options: any) {
        this.title = options.title;
    }
    // 存取器:属性方式访问，可添加额外逻辑，控制读写性
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    // 方法
    sayName() {
        console.log(this.name);
    }
    // 私有方法
    private sayPriveteName() {
        console.log(this.name);
    }
}
class Child extends Parent {

}
const childInst = new  Child({title: 'test'});
console.log(childInst.title);
