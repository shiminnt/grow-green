import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userData: {
        }
    },
    mutations: {
        updateUserData: (state, userData) => {
            state.userData = userData
    }},
    actions: {
        updateUserData: (context, userData) => {
            context.commit('updateUserData', userData)
        }
    }
})