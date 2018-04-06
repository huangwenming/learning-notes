/**
 * Created by huangwenming on 2018/4/6.
 */
process.nextTick(function () {
    console.log('nextTick 延迟执行1')
})

setImmediate(function () {
    console.log('setImmediate 延迟执行1')
    process.nextTick(function () {
        console.log('nextTick 延迟执行3')
    })
})

process.nextTick(function () {
    console.log('nextTick 延迟执行2')
})

setImmediate(function () {
    console.log('setImmediate 延迟执行2')
    process.nextTick(function () {
        console.log('nextTick 延迟执行4')
    })
})

/*
书本中给出的打印结果是
 nextTick 延迟执行1
 nextTick 延迟执行2
 setImmediate 延迟执行1
 nextTick 延迟执行3
 setImmediate 延迟执行2
 nextTick 延迟执行4
*/
/*
实际的结果是：

nextTick 延迟执行1
nextTick 延迟执行2
setImmediate 延迟执行1
setImmediate 延迟执行2
nextTick 延迟执行3
nextTick 延迟执行4
*/
