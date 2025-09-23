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
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #ccc;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-link {
  text-decoration: none;
  color: inherit;
}
.card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
.card h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}
</style>
