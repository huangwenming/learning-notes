<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <div>
            <p>下面的数据来自vuex.store</p>
            <p>nickName:{{info.nickName}}</p>
            <p @click="updateNickName">点击修改nickName</p>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapGetters} from '../libs/hvuex'

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    computed: {
        ...mapGetters(['info'])
        /*info() {
            return this.$store.getters.info();
        }*/
    },
    methods: {
        updateNickName() {
            this.$store.dispatch('updateNickName', this.info.nickName + '1');
        }
    }
}
</script>
