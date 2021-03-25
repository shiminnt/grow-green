import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userData: {
        }
    },
    getters: {
        userData: state => {
            return state.userData
        }
    },
    mutations: {
        updateUserData: (state, userData) => {
            state.userData = userData
        },
        updateArticlesRead: (state, title) => {
            state.userData.articlesRead.push(title);
            state.userData.numArticles += 1;
        }
    },
    actions: {
        updateUserData: (context, userData) => {
            context.commit('updateUserData', userData)
        },
        updateArticlesRead: (context, title) => {
            context.commit('updateArticlesRead', title)
        }
    }
})