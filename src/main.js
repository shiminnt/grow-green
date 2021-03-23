import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import { auth } from './firebase.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

myRouter.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router: myRouter,
      render: h => h(App)
    }).$mount("#app");
  }

});
