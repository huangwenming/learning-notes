<template>
    <div class="container">
        <p :style="{'color': color}" @click="showColorValue">字体颜色来自props</p>
    </div>
</template>

<script>
    export default {
        name: "baseCom",
        props: {
            color: {
                default: '#333'
            }
        },
        methods: {
            showColorValue() {
                this.$emit('showColorValue');
                console.log('字体颜色：', this.color);
            }
        }
    }
</script>

<style scoped>

</style>
