import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/SuperheroList.vue';
import HeroDetailView from '../components/SuperheroDetails.vue';
import HeroFormView from '../components/CreateHeroView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/heroes/:id', component: HeroDetailView, props: true },
    { path: '/create', component: HeroFormView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
