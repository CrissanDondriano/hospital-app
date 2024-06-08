// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
    { path: '/', component: LoginPage, name: 'login' },
    { path: '/register', component: RegisterPage, name: 'register' },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        beforeEnter: (to, from, next) => {
            // check if user is logged in and redirect to login page if not
            if (localStorage.getItem('token')) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            console.log('logout');
            localStorage.removeItem('token');
            next('/');
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router