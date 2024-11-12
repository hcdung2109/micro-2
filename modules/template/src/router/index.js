import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'Hướng dẫn',
                    component: () => import('@/views/pages/Documentation.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'CRUD',
                    component: () => import('@/views/pages/crud/list.vue')
                }
            ]
        }
    ]
});

export default router;
