// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import Dashboard from '../components/Dashboard.vue';
import Patients from '../components/Patients.vue';
import Doctors from '../components/Doctors.vue';
import Appointments from '../components/Appointments.vue';
import MedicalRecords from '../components/MedicalRecords.vue';

const routes = [
    { path: '/', component: LoginPage, name: 'login' },
    { path: '/register', component: RegisterPage, name: 'register' },
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
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: { requiresAuth: true },
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
        path: '/patients',
        name: 'Patients',
        component: Patients,
        meta: { requiresAuth: true },
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: Doctors,
        meta: { requiresAuth: true },
    },
    {
        path: '/appointments',
        name: 'Appointments',
        component: Appointments,
        meta: { requiresAuth: true },
    },
    {
        path: '/records',
        name: 'MedicalRecords',
        component: MedicalRecords,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.token) {
        next('/login');
    } else {
        next();
    }
});


export default router