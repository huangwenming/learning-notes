import Vue from 'vue';
// need create a vue-shims.d.ts file
import App from './app.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
