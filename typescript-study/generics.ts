// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，
// 而在使用的时候再指定类型的一种特性。

// 下面代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。
// 但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

// 修改为范型
// 则就实现了，传入的是string，返回的也是string
function createArray1<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray1<string>(3, 'x'); // ['x', 'x', 'x']



function identity(arg: number): number {
    return arg;
}
function identity1(arg: any): any {
    return arg;
}
// 我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
// 我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。
// 之后我们再次使用了 T当做返回值类型
function identity2<T>(arg: T): T {
    return arg;
}
let output = identity2<string>("myString");  // type of output will be 'string'
// 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output1 = identity2("myString");  // type of output will be 'string'


// 使用泛型
interface Result<T> {
    ok: 0 | 1;
    data: T;
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
    return { ok: 1, data };
}
// 用尖括号方式指定T为string
getResult<string>("hello");
// 用类型推断指定T为number
getResult(1);


interface Person1<T> {
    firstName: string;
    lastName: T;
}
function identity3<T>(arg: T): Person1<T> {
    return {
        firstName: 'hwm',
        lastName: arg
    };
}
identity3<string>('hwm');

// 范型类
class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));


