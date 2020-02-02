<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator'
    // 基于类的API声明组件，可以借助用官方维护的 vue-class-component 装饰器
    // @Component 修饰符注明了此类为一个 Vue 组件
    @Component({
        // 所有的组件选项都可以放在这里
        // props: {
        //     name: String,
        //     initialEnthusiasm: String
        // }
    })
    export default class HelloDecorator extends Vue {
        @Prop() name!: string;
        @Prop() initialEnthusiasm!: number;
        // use prop values for initial data
        enthusiasm = this.initialEnthusiasm;
        // lifecycle hook
        mounted() {

        }
        // 组件方法也可以直接声明为实例的方法
        increment() {
            this.enthusiasm++;
        }
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        }
        // 计算属性
        get exclamationMarks() {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
</script>

<style scoped>
    .greeting {
        font-size: 40px;
    }
</style>
