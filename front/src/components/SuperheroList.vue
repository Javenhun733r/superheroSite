<template>
  <div>
    <SuperheroCard
        v-for="hero in heroes"
        :key="hero.id"
        :hero="hero"
    />
    <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @page-changed="onPageChanged"
    />

  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import { getHeroes } from '../api/superheroApi';
import SuperheroCard from '../components/SuperheroCard.vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: { SuperheroCard, Pagination },
  setup() {
    const heroes = ref([]);
    const total = ref(0);
    const page = ref(1);
    const limit = 5;

    const loadHeroes = async () => {
      const res = await getHeroes(page.value, limit);
      heroes.value = res.data;
      total.value = res.total;
    };

    const totalPages = computed(() => Math.ceil(total.value / limit));

    onMounted(loadHeroes);

    const onPageChanged = (newPage) => {
      page.value = newPage;
      loadHeroes();
    };

    return { heroes, page, onPageChanged };
  },
};
</script>
