import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        userData: {
        }
    },
    getters: {
        userData: state => {
            console.log(state.userData)
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
        }, 
        updateQuestionsDone: (state, qNumber) => {
            state.userData.questionsDone.push(qNumber);
            state.userData.numQuiz += 1;
        },
        updateTreesPlanted: (state, date) => {
            state.userData.numTrees += 1;
            state.userData.treeDates.push(date);
        },
        updateContributed: (state) => {
            state.userData.numContribute += 1;
        },
    },
    actions: {
        updateUserData: (context, userData) => {
            context.commit('updateUserData', userData)
        },
        updateArticlesRead: (context, title) => {
            context.commit('updateArticlesRead', title)
        },
        updateQuestionsDone: (context, qNumber) => {
            context.commit('updateQuestionsDone', qNumber)
        },
        updateTreesPlanted: (context, date) => {
            context.commit('updateTreesPlanted', date)
        },
        updateContributed: (context) => {
            context.commit('updateContributed')
        },
    }
})