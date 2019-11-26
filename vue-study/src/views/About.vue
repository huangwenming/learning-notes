<template>
  <div class="about">
      <h1>This is an about page</h1>
      <h2>下面是个高阶组件：高阶组件为子组件赋上mounted时console能力</h2>
      <enhance-com @showColorValue="showColorValue" ></enhance-com>
  </div>
</template>
<script>
    import withConsole from '../components/HOC/hoc.js';
    import baseCom from '../components/HOC/baseCom';
    const enhanceCom = withConsole(baseCom);
    export default {
        name: 'about',
        components: {
            enhanceCom
        },
        methods: {
            showColorValue() {
                console.log('来自传入组件的showColorValue事件');
            }
        }
    }
</script>
<style>

</style>
