<!-- src/views/HeroDetailView.vue -->
<template>
  <div v-if="hero">
    <h2>{{ hero.nickname }}</h2>
    <p>Real name: {{ hero.realName }}</p>
    <p>{{ hero.originDescription }}</p>
    <p>Superpowers: {{ hero.superpowers.join(', ') }}</p>
    <p>Catch phrase: "{{ hero.catchPhrase }}"</p>
    <div v-for="img in hero.images" :key="img.id">
      <img :src="img.url" alt="hero image" style="max-width:200px" />
    </div>
    <!-- Тут можна додати кнопки Edit/Delete -->
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getHeroById } from '../api/superheroApi';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const hero = ref(null);

    const loadHero = async () => {
      const data = await getHeroById(route.params.id);
      hero.value = data;
    };

    watch(() => route.params.id, loadHero);

    onMounted(loadHero);

    return { hero };
  }
};
</script>
