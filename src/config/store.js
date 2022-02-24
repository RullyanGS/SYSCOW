import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        isMenuVisibleHelp: false,
        user: true
    },
    mutations: {
        toggleMenu(state, isMenuVisibleHelp){
            if(isMenuVisibleHelp === undefined) {
                state.isMenuVisibleHelp = !state.isMenuVisibleHelp
            } else{
                state.isMenuVisibleHelp = isMenuVisibleHelp
            }

            console.log('toggleHelp = ' + state.isMenuVisibleHelp)
        }
    }
})