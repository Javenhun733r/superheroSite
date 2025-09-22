<template>
  <router-link :to="`/heroes/${hero.id}`" class="card-link">
    <div class="card">
      <img :src="hero.images?.[0]?.url" alt="Hero image" style="max-width: 150px" />
      <h3>{{ hero.nickname }}</h3>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  hero: Object
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
