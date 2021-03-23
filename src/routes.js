import HomePage from './components/HomePage.vue'
import MapPage from './components/MapPage.vue'
import NewsMenuPage from './components/NewsMenuPage.vue'
import QuizPage from './components/QuizPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import ArticlePage from './components/ArticlePage.vue'

export default [
    { path: '/', name: "login", component: LoginPage },
    { path: '/home', name: "home", component: HomePage, meta: { requiresAuth: true } },
    { path: '/map', name: "map", component: MapPage, meta: { requiresAuth: true } },
    { path: '/newsmenu', name: "newsmenu", component: NewsMenuPage, meta: { requiresAuth: true } },
    { path: '/quiz', name: "quiz", component: QuizPage, meta: { requiresAuth: true } },
    { path: '/register', name: "register", component: RegisterPage },
    { path: '/dashboard', name: "dashboard", component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/article', name: "article", component: ArticlePage, meta: { requiresAuth: true } }
]