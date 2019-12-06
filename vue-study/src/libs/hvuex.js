/**
 * @file custom a lite vuex
 * @author hwm
 * 具体用法
 * Vue.use(Hvuex);
 * const store = new Hvuex.Store{options}
 * new Vue({store})
 * 在组件中可以使用this.$store来获取store实例
 */

let $vue;

let Hvuex = {};

Hvuex.install = function (Vue) {
    $vue = Vue;
    // 注入组件选项，用于在组件实例内拿到store实例
    Vue.mixin({
        // 选择时机，在初始化之前
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
};

/**
 * Hvuex.Store类
 *
 * @class
 */
class Store {
    /**
     * Store 构造函数
     * @constructor
     * @param {Object} options options.state, options.actions, options.mutations, options.getters
     */

    constructor(options) {
        this.$options = options;
        // 将state进行数据监听
        // this.state = options.state;
        this.state = new $vue({
            data() {
                return options.state || {}
            }
        }).$data;
        this.mutations = options.mutations;
        this.actions = options.actions;
        this.getters = options.getters || [];
        this.init();
    }

    init() {
        this.initGetters();
    }
    initGetters() {
        // 处理getters，传入参数state
        let self = this;
        let result = {};
        Object.keys(this.getters).forEach( key => {
            const item = self.getters[key];
            result[key] = () => {
                return item.call(self, self.state);
            };
        });
        this.getters = result;
    }

    commit(mutation) {
        // 处理mutation，传入vuex实例作为context，传入state，并做参数透传
        if (arguments[0] === undefined) {
            return;
        }
        else  {
            Array.prototype.splice.call(arguments, 0, 1);
        }
        this.mutations[mutation].call(this, this.state, ...arguments);
    }

    dispatch(action) {
        // 处理action，传入vuex实例作为context，并做参数透传
        if (arguments[0] === undefined) {
            return;
        }
        else  {
            Array.prototype.splice.call(arguments, 0, 1);
        }
        this.actions[action].call(this, this, ...arguments);
    }
}

function mapGetters(getters) {
    // console.log(this.$store);
    let result = {};
    getters.forEach(getter => {
        result[getter] = function () {
            // 此处的this为vue组件实例
            // console.log(this);
            return this.$store.getters[getter]();
        };
    });
    return result;
}
Hvuex.Store = Store;
Hvuex.mapGetters = mapGetters;

export {
    mapGetters
};
export default Hvuex;
