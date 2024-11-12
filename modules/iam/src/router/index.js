import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        /*{
            path: '/iam',
            name: 'Hướng dẫn',
            component: () => import('@/views/pages/Documentation.vue')
        },
        {
            path: '/iam/pages/crud',
            name: 'CRUD',
            component: () => import('@/views/pages/crud/list.vue')
        }*/
        {
            path: '/iam',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'Hướng dẫn',
                    component: () => import('@/views/pages/Documentation.vue')
                },
                {
                    path: 'pages/crud',
                    name: 'CRUD',
                    component: () => import('@/views/pages/crud/list.vue')
                }
            ]
        }
    ]
});

export default router;
