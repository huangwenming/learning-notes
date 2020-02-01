// 必选参数
function f1(name: string) {

}
f1('hwm');

// 可选参数
function f2(name: string) {

}
f2('hwm');


// 函数重载： 函数先声明再实现
function watch(cb1: ()=> void):void;
function watch(cb1: ()=> void, cb2: ()=> void):void;
// 实现
function watch(cb1: ()=> void, cb2: ()=> void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    }
    else {
        console.log('执行watch重载1');
    }
}
watch(()=>{});

function watch1(cb1: ()=>void):void;//重载1
function watch1(cb1: ()=>void, cb2: (v1:any,v2:any)=>void):void;//重载2
// 实现
function watch1(cb1: ()=>void, cb2?: (v1:any,v2:any)=>void) {
    if (cb1 && cb2) {
        console.log('执行watch重载2');
    } else {
        console.log('执行watch重载1');
    }
}
watch(()=>{})
