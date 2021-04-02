import HomePage from './components/HomePage.vue'
import VolunteerMenuPage from './components/VolunteerMenuPage.vue'
import NewsMenuPage from './components/NewsMenuPage.vue'
import QuizPage from './components/QuizPage.vue'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import DashboardPage from './components/DashboardPage.vue'
import ArticlePage from './components/ArticlePage.vue'
import PlantTreesPage from './components/PlantTreesPage.vue'
import QuizQuestionPage from './components/QuizQuestionPage.vue'
import VolunteerPage from './components/VolunteerPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import EditProfilePage from './components/EditProfilePage.vue'
import ChangePasswordPage from './components/ChangePasswordPage.vue'

export default [
    { path: '/', name: "login", component: LoginPage },
    { path: '/home', name: "home", component: HomePage, meta: { requiresAuth: true } },
    { path: '/volunteermenu', name: "volunteermenu", component: VolunteerMenuPage, meta: { requiresAuth: true } },
    { path: '/newsmenu', name: "newsmenu", component: NewsMenuPage, meta: { requiresAuth: true } },
    { path: '/quiz', name: "quiz", component: QuizPage, meta: { requiresAuth: true } },
    { path: '/register', name: "register", component: RegisterPage },
    { path: '/forgotpassword', name: "forgotpassword", component: ForgotPassword },
    { path: '/dashboard', name: "dashboard", component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/article', name: "article", component: ArticlePage, meta: { requiresAuth: true } },
    { path: '/planttrees', name: "planttrees", component: PlantTreesPage, meta: { requiresAuth: true } },
    { path: '/quizquestion', name: "quizquestion", component: QuizQuestionPage, meta: { requiresAuth: true } },
    { path: '/volunteer', name: "volunteer", component:VolunteerPage,  meta: { requiresAuth: true } },
    { path: '/account/profile', name: "profile", component:ProfilePage,  meta: { requiresAuth: true } },
    { path: '/account/edit', name: "edit", component:EditProfilePage,  meta: { requiresAuth: true } },
    { path: '/account/changepassword', name: "changepassword", component:ChangePasswordPage,  meta: { requiresAuth: true } },
]