/**
 * @file vue高阶组件
 * @author hwm
 * 高阶组件的本质是高阶函数，传入组件，返回组件
 * 高阶组件的特点：
 * 1.不修改传入组件本身，只是将组件渲染出来，此处不同于mixin，mixin是修改了组件本身
 * 2.需要将组件本身的props、attrs、event、slot等进行透传
 * 3.在vue中传入的不是组件本身，而是组件的配置对象，
 */

export default function withConsole(comp) {
    return {
        mounted() {
            console.log('I have already mounted')
        },
        // 获取comp组件的props，用于向comp组件传递
        props: comp.props,
        render(h) {
            // render函数中this为组件的实例对象
            return h(comp, {
                attrs: this.$attrs,
                props: this.$props,
                // 将事件进行传递（事件是谁监听谁触发，只是监听在父组件注册，但是绑还是绑在子组件身上，只是this还是父组件的this）
                on: this.$listeners
            });
        }
    }
}
