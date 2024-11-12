import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { requiresAuth: true },
            component: () => import('@/views/pages/Dashboard.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: { requiresAuth: true },
            component: () => import('@/views/pages/Dashboard.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            meta: { requiresAuth: true },
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            meta: { requiresAuth: true },
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            meta: { requiresAuth: true },
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Add a route guard to check login state
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem("access_token"); // Check if token exists
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next({
            path: "/login",
            query: { redirect: to.fullPath },  // Save the intended route
        });
    } else {
        next(); // Proceed to the route
    }
});

export default router;
