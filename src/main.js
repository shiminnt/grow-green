import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes.js";
import { database, auth } from "./firebase.js";
import { store } from "./store.js";

Vue.config.productionTip = false;

const myRouter = new VueRouter({
    routes: Routes,
    mode: "history",
});

Vue.use(VueRouter);

Vue.mixin({
    methods: {
        loadUserData: function() {
            const user = auth.currentUser;
            if (user) {
                this.photoUrl = user.photoURL;
                const uid = user.uid;
                database
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then((doc) => {
                        this.userData = doc.data();
                    });
            }
        },
        updateDb: function() {
            const user = auth.currentUser;
            const uid = user.uid;
            database
                .collection("users")
                .doc(uid)
                .set(this.userData)
                .then(() => {
                    console.log("Document successfully written!");
                });
        },
    },
});

myRouter.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresVisitor = to.matched.some(record => record.meta.requiresVisitor);
    const isAuthenticated = auth.currentUser;
    console.log("isauthenticated", isAuthenticated);
    if (requiresAuth) {
        if (!isAuthenticated) {
            next("/");
        } else {
        next();
        }
    } else if (requiresVisitor) {
        if (isAuthenticated) {
            next("/home");
        } else {
        next();
        }
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
        }).$mount("#app");
    }
});
