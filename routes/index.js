import { createWebHistory, createRouter } from 'vue-router';

import Admin from '../views/Admin.vue';
import Dashboard from '../views/Dashboard.vue';
import ManagerCategory from '../views/ManagerCategory.vue';
import ManagerProduct from '../views/ManagerProduct.vue';

const routes = [
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        redirect: '/admin/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'manager-category',
                name: 'manager-category',
                component: ManagerCategory,
            },
            {
                path: 'manager-product',
                name: 'manager-product',
                component: ManagerProduct,
            },
        ]
    },
    {
        path: '/',
        redirect: '/admin/dashboard',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/admin/dashboard',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
