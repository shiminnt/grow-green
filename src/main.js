import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import { auth } from './firebase.js'
import { store } from './store.js'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false
//Vue.use(VueRouter)
const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
})

Vue.use(VueRouter, VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbxb_E0F4W3Zm2dn6GfYqW7S9yRT2t3CM',
    libraries: 'places',
  }
});

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
      store: store,
      router: myRouter,
      render: h => h(App)
    }).$mount("#app");
  }

});
