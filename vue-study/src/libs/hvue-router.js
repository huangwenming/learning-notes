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
        // this.$routerMap = this.generateRouterMap(options.routes);
        this.$depthComs = this.generateDepthCom(options.routes);
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
            // 是否有子路径
            if (item.children) {
                mapObj[item.path].children = this.generateRouterMap(item.children);
            }
        });
        return mapObj;
    }
    generateDepthCom(routes) {
        const depthComs = {};
        function generateDepth(parentPath, routes, depth) {
            routes.forEach(item => {
                const currentPath = parentPath + item.path;
                depthComs[depth] = depthComs[depth] || {};
                depthComs[depth][currentPath] = item;
                // 是否有子路径
                if (item.children) {
                    const childDepth = depth + 1;
                    generateDepth(currentPath, item.children, childDepth);
                }
            });
        }
        generateDepth('', routes, 0);
        return depthComs;
    }
    bindEvent() {
        // 绑定hashchange
        window.addEventListener('load', this.hashChangeHandler.bind(this));
        window.addEventListener('hashchange', this.hashChangeHandler.bind(this));
    }
    hashChangeHandler() {
        this.$data.path = location.hash.split('#')[1] || '/';
    }
    getCurrentComponent(depth) {
        console.log('router deepth：', depth);
        let com = null;
        let self = this;
        let routerByDepth = this.$depthComs[depth];
        Object.keys(routerByDepth).forEach(key => {
            if (self.$data.path.indexOf(key) === 0 && key !== '/') {
                com = routerByDepth[key].component;
            }
        });
        com = com || this.$depthComs[0]['/'].component;
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
            functional: true,
            props: {
                name: {
                    type: String,
                    default: 'default'
                }
            },
            render(h, { props, children, parent, data }) {
                data.props = Object.assign({}, props);
                data.routerView = true;
                // todo 需要知道router-view的嵌套深度
                let depth = 0;
                let router = parent.$router;
                while (parent && parent._routerRoot !== parent) {
                    const vnodeData = parent.$vnode && parent.$vnode.data
                    if (vnodeData) {
                        if (vnodeData.routerView) {
                            depth++
                        }
                    }
                    parent = parent.$parent
                }

                console.log(depth);
                const comp = router.getCurrentComponent.call(router, depth);
                return h(comp, data, children);
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
