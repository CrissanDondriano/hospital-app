// routes.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            store.commit('auth/CLEAR_AUTH');
            next('/');
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: { requiresAuth: true },
    },
    {
        path: '/patients',
        name: 'Patients',
        component: Patients,
        meta: { requiresAuth: true, roles: ['admin', 'doctor'] },
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: Doctors,
        meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
        path: '/appointments',
        name: 'Appointments',
        component: Appointments,
        meta: { requiresAuth: true, roles: ['admin', 'doctor', 'patient'] },
    },
    {
        path: '/records',
        name: 'MedicalRecords',
        component: MedicalRecords,
        meta: { requiresAuth: true, roles: ['admin', 'doctor'] },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/');
        } else if (to.matched.some(record => record.meta.roles)) {
            const roles = to.meta.roles;
            if (roles.includes(user.role)) {
                next();
            } else {
                next('/dashboard');
            }
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router