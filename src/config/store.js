import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: {
            name: 'Usuário',
            email: 'usuario.com.br'
        }
    },
    mutations: {
    }
})