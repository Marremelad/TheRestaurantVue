import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from "@/views/MenuView.vue";
import CompleteReservationView from '@/views/CompleteReservationView.vue';
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: "/menu",
            name: "menu",
            component: MenuView
        },
        {
            path: "/complete-reservation",
            name: "complete-reservation",
            component: CompleteReservationView
        },
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            component: NotFoundView
        }
    ],
})

export default router