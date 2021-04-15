import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes.js";
import { auth, database } from "./firebase.js";
import { store } from "./store.js";

Vue.config.productionTip = false;
//Vue.use(VueRouter)
const myRouter = new VueRouter({
    routes: Routes,
    mode: "history",
});

Vue.use(VueRouter);

myRouter.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
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
            render: (h) => h(App),
            created() {
                window.addEventListener('beforeunload', this.onClose)
            },
            methods: {
                onClose: function onClose() {
                    const user = auth.currentUser;
                    const uid = user.uid;
                          database
                              .collection("users")
                              .doc(uid)
                              .set(this.userData)
                              .then(() => {
                                console.log("saved");
                              });
                  }
                }
        }).$mount("#app");
    }
});
