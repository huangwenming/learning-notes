// 整体思路：event-loop中的任务分为micro-task和macro-task两种，类似浏览器；
// 区别：micro-task分为了两类：process.nextTick 和其他；macro-task分为了4类：timers、IO、check、close；
// 区别：执行的顺序（浏览器对micro-task和macro-task没有进行分类，依次按触发的顺序执行）：
// 清空micro-tasks——》清空timers——》清空micro-tasks-》清空IO——》清空micro-tasks-》清空check-》清空micro-tasks-》清空close-》清空micro-tasks

console.log('start');

setTimeout(() => {          // callback1
    console.log(111);
    setTimeout(() => {        // callback2
        console.log(222);
    }, 0);
    setImmediate(() => {      // callback3
        console.log(333);
    })
    process.nextTick(() => {  // callback4
        console.log(444);
    })
}, 0);

setImmediate(() => {        // callback5
    console.log(555);
    process.nextTick(() => {  // callback6
        console.log(666);
    })
})

setTimeout(() => {          // callback7
    console.log(777);
    process.nextTick(() => {  // callback8
        console.log(888);
    })
}, 0);

process.nextTick(() => {    // callback9
    console.log(999);
})

console.log('end');
