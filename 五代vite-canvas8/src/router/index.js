import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/index.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/container',
        name: 'container',
        component: () => import('../pages/container.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router