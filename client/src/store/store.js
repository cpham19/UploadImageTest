import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    // Strict determines if you can change the state (with setters)
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
    },
    mutations: {
    },
    actions: {
    }
})
