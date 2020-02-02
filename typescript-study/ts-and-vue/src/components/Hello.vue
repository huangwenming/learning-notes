<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<!--We had to write <script lang="ts"> to get it working with TypeScript.-->
<script lang="ts">
    import Vue from 'vue';
    // We default-exported a call to Vue.extend (rather than the options bag itself)
    // If you don't write Vue.extend, Vetur will make it look like things are working correctly,
    // but you'll get an error when you build your project.
    // 使用 Vue.extend 主要是让 TypeScript 能正确推断 Vue 组件选项中的类型
    export default Vue.extend({
        name: "Hello",
        props: ['name', 'initialEnthusiasm'],
        data() {
            return {
                enthusiasm: this.initialEnthusiasm,
            };
        },
        methods: {
            increment() { this.enthusiasm++; },
            decrement() {
                if (this.enthusiasm > 1) {
                    this.enthusiasm--;
                }
            },
        },
        computed: {
            exclamationMarks(): string {
                return Array(this.enthusiasm + 1).join('!');
            }
        }
    });
</script>

<style scoped>
    .greeting {
        font-size: 20px;
    }
</style>
