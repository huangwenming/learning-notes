import Vue from 'vue'
// import Vuex from 'vuex'
import Hvuex from '../libs/hvuex'

Vue.use(Hvuex);

export default new Hvuex.Store({
    state: {
        info: {
            name: 'hwm',
            nickName: 'mar'
        }
    },
    getters: {
        info(state) {
            return state.info;
        }
    },
    mutations: {
        updateNickName(state, value) {
            state.info.nickName = value;
        }
    },
    actions: {
        updateNickName(context, value) {
            context.commit('updateNickName', value)
        }
    },
    modules: {

    }
})
