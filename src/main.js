import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import store from "./store.js";

Vue.config.productionTip = false
Vue.use(VueRouter)
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  store,
  router:myRouter,
  render: h => h(App),
}).$mount('#app')
