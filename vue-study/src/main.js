import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// new Vue生成vm（view model）
// 1.render指定的模版(模版的提取优先级：render > template > el)
// 1-1.template和el需要启动编译器，将el和template转换成render； 该过程可以在构建过程中执行；

// 2.挂载时启动render，生成虚拟dom，继而产出DOM片段
// 3.挂载到指定的挂载元素
// 4.挂载之后(mounted)，vm.$el就是编译出的DOM

// Vue.js 的运行过程实际上包含两步。
// 第一步，编译器将字符串模板（template）编译为渲染函数（render），称之为编译过程；
// 第二步，运行时实际调用编译的渲染函数，称之为运行过程。

const vm = new Vue({
    router,
    store,
    // h其实就是createElement函数，用于创建virtual dom
    // 模版的提取优先级：render > template > el
    // el 指挂载元素，只在用 new 创建实例时生效，挂载后被生成的dom替换
    // 如果指定了el，可以不需要render、template属性和调用$mount方法了 (实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。)

    // 如果指定render函数，则render指定的模版，然后进行挂载
    // 没有render函数，只指定了template，则render指定的template，然后进行挂载
    // 如果render和template都没有指定，则render $mount方法执行时的el的outerHTML
    render: h => h(App)
}).$mount('#app');




