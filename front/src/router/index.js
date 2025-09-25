import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/pages/SuperheroListPage.vue';
import HeroDetailView from '../components/pages/SuperheroDetailsPage.vue';
import HeroFormView from '../components/pages/CreateHeroPage.vue'
import HeroEditView from '../components/pages/HeroEditPage.vue'
const routes = [
    { path: '/', component: HomeView },
    { path: '/heroes/:id', component: HeroDetailView, props: true },
    { path: '/create', component: HeroFormView },
    { path: '/heroes/:id/edit', component: HeroEditView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
