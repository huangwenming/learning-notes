<template>
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
    </div>
</template>

<!--We had to write <script lang="ts"> to get it working with TypeScript.-->
<script lang="ts">
    import Vue from 'vue';
    import HelloComponent from "./components/Hello.vue";
    import HelloDecoratorComponent from "./components/HelloDecorator.vue";
    // We default-exported a call to Vue.extend (rather than the options bag itself)
    // If you don't write Vue.extend, Vetur will make it look like things are working correctly,
    // but you'll get an error when you build your project.
    export default Vue.extend({
        name: 'app',
        components: {
            HelloComponent,
            HelloDecoratorComponent
        },
        data() {
            return {
                name: 'World'
            };
        }
    });
</script>

<style scoped>

</style>
