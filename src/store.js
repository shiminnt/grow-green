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
            state.userData.questionDone.push(qNumber);
            state.userData.numQuiz += 1;
        },
        updateTreesPlanted: (state) => {
            state.userData.numTrees += 1;
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
        updateTreesPlanted: (context) => {
            context.commit('updateTreesPlanted')
        },
    }
})