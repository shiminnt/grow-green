import HomePage from './components/HomePage.vue'
import MapPage from './components/MapPage.vue'
import NewsPage from './components/NewsPage.vue'
import QuizPage from './components/QuizPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue'

export default [
    {path: '/', name:"login", component: LoginPage},
    {path: '/home', name:"home", component: HomePage},
    {path: '/map', name:"map", component: MapPage},
    {path: '/news', name:"news", component: NewsPage},
    {path: '/quiz', name:"quiz", component: QuizPage},
    {path:'/register', name:"register",component: RegisterPage},
    {path:'/dashboard', name:"dashboard", component: DashboardPage}
]