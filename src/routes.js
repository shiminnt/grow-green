import HomePage from './components/HomePage.vue'
import MapPage from './components/MapPage.vue'
import NewsPage from './components/NewsPage.vue'
import QuizPage from './components/QuizPage.vue'
import LoginPage from './components/LoginPage.vue'

export default [
    {path: '/', component: LoginPage},
    {path: '/home', component: HomePage},
    {path: '/map', component: MapPage},
    {path: '/news', component: NewsPage},
    {path: '/quiz', component: QuizPage}
]