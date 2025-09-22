
<template>
  <div class="card">
    <img :src="hero.images?.[0]?.url" alt="Hero image" style="max-width: 150px" />
    <h3>{{ hero.nickname }}</h3>
  </div>
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
}
</style>
