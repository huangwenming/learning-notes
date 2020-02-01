const test = 'hello typescript';
console.log(test);

let strArray : string[];
strArray = ['1', '2'];

let anyArray : any[];
anyArray = ['1', 2];

function person(name: string) : string {
    return 'hello' + name;
}
function warn(name: string) : void {

}

function fn1(o: object) : void {}
fn1({type: 1});

type Prop = {prop: number};
function fn2(o: Prop) {}
fn2({prop: 1});

// 类型断言 用户比较确定值的类型
// 断言语法 as
const someValue:any = '123';
console.log((someValue as string).length);

// 联合类型
let union : string | number;
union = 1;
union = '1';

// 交叉类型
type first = {firstName: string};
type last = {lastName: string};
type firstlast = first & last;
function f():firstlast {
    return {
        firstName: '',
        lastName:''
    }
}
