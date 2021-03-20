import HomePage from './components/HomePage.vue'
import MapPage from './components/MapPage.vue'
import NewsMenuPage from './components/NewsMenuPage.vue'
import QuizPage from './components/QuizPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import ArticlePage from './components/ArticlePage.vue'

export default [
    {path: '/', name:"login", component: LoginPage},
    {path: '/home', name:"home", component: HomePage},
    {path: '/map', name:"map", component: MapPage},
    {path: '/newsmenu', name:"newsmenu", component: NewsMenuPage},
    {path: '/quiz', name:"quiz", component: QuizPage},
    {path:'/register', name:"register",component: RegisterPage},
    {path:'/dashboard', name:"dashboard", component: DashboardPage},
    {path: '/article', name:"article", component: ArticlePage}
]