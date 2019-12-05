/**
 * @file custom a lite vue-router
 * @author hwm
 * 具体用法
 * Vue.use(Hrouter);
 * const router = new Hrouter{options}
 * new Vue({router})
 * 在组件中使用<router-link></router-link>和<router-view></router-view>
 * 在组件中可以使用this.$router来获取router实例
 */

/**
 * Hrouter类
 *
 * @class Hrouter
 */
let $vue;
class Hrouter {
    constructor(options) {
        this.$options = options;
        // 获取routerMap
        this.$routerMap = this.generateRouterMap(options.routes);
        // 获取mode
        this.$mode = options.mode || 'hash';
        // 当前的路径，设置为可响应式的数据，用于刷新render函数
        this.$data = new $vue({
            data() {
                return {
                    path: '/'
                }
            }
        }).$data;
        this.init();
    }
    init() {
        // 绑定事件
        this.bindEvent();
        // 注册全局组件
        this.registerCom();
    }
    generateRouterMap(routes) {
        let mapObj = {};
        routes.forEach(item => {
            mapObj[item.path] = item;
        });
        return mapObj;
    }
    bindEvent() {
        // 绑定hashchange
        window.addEventListener('load', this.hashChangeHandler.bind(this));
        window.addEventListener('hashchange', this.hashChangeHandler.bind(this));
    }
    hashChangeHandler() {
        this.$data.path = location.hash.split('#')[1] || '/';
    }
    getCurrentComponent() {
        let com = null;
        let self = this;
        Object.keys(this.$routerMap).forEach(key => {
            if (key === self.$data.path) {
                com = self.$routerMap[key].component;
            }
        });
        return com;
    }
    registerCom() {
        // 将<router-link to="/">home</router-link> 转换成
        // <a href="#/">home</a>
        $vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                const attrs = {
                    href: '#' + this.to || '/'
                };
                return h('a', {attrs}, [this.$slots.default]);
            }
        });
        // 将<router-view></router-view> 转换成
        // <div>corresponding component</div>
        // 渲染对应的component到div中
        $vue.component('router-view', {
            render(h) {
                // todo 需要知道router-view的嵌套深度
                const comp = this.$router.getCurrentComponent.call(this.$router);
                return h(comp);
            }
        });
    }
}

/**
 * install作用：
 * 1.将Vue挂载到router类中
 * 2.将router实例挂载在vue任意组件中，方便调用
 * 3.注册全局组件router-link和router-view
 *
 * @static
 */
Hrouter.install = function(Vue) {
    $vue = Vue;
    // 注入组件选项，用于在组件实例内拿到router实例
    Vue.mixin({
        // 选择时机，在初始化之前
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                // 根组件中初始化router
                // this.$options.router.init();
            }
        }
    });
};

export default Hrouter;
