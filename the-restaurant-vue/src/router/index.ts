import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from "@/views/MenuView.vue";
import ReservationDataView from '@/views/ReservationDataView.vue';

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
            path: "/reservation-data",
            name: "/reservation-data",
            component: ReservationDataView
        }
    ],
})

export default router