import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/SuperheroList.vue';
import HeroDetailView from '../components/SuperheroDetails.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/heroes/:id', component: HeroDetailView, props: true },
    { path: '/create', component: HeroDetailView, props: { isCreate: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
