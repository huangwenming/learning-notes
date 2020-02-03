// 必选参数: 参数一旦声明，就要求传递，且类型需符合
function f1(name: string) {
    console.log('required params')
}
f1('hwm');

// 可选参数
function f2(name?: string) {
    console.log('optioned params')
}
f2('hwm');


// 函数重载： 函数先声明再实现
function watch(cb1: ()=> void): void;
function watch(cb1: ()=> void, cb2: ()=> void): void;
// 实现:以参数数量或类型区分多个同名函数
function watch(cb1: ()=> void, cb2?: ()=> void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    }
    else {
        console.log('执行watch重载1');
    }
}
watch(()=>{});

// 重载1
function watch1(cb1: ()=> void): void;
// 重载2
function watch1(cb1: ()=> void, cb2: (v1: string, v2: string) => void): void;
// 实现
function watch1(cb1: ()=> void, cb2?: (v1: string, v2: string) => void): void {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    } else {
        console.log('执行watch重载1');
    }
}
watch1(()=> {}, (name, title)=> {
    console.log(name + title);
});
