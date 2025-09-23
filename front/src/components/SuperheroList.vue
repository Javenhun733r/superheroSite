<script setup>
import { ref, onMounted } from 'vue'
import { getHeroes } from '../api/superheroApi'
import SuperheroCard from '../components/SuperheroCard.vue'
import Pagination from './SuperheroPagination.vue'

const heroes = ref([])
const page = ref(1)
const totalPage = ref(1)

const loadHeroes = async () => {
  const limit = 5
  const response = await getHeroes(page.value, limit)

  heroes.value = response.data
  totalPage.value = Math.ceil(response.total / limit)
}

onMounted(loadHeroes)

const onPageChanged = (newPage) => {
  page.value = newPage
  loadHeroes()
}
</script>
<template>
  <div class="hero-list-container">
    <div class="header-actions">
      <router-link to="/create">
        <button class="create-btn">Create New Hero</button>
      </router-link>
    </div>
    <div class="cards-grid">
      <SuperheroCard
          v-for="hero in heroes"
          :key="hero.id"
          :hero="hero"
      />
    </div>
    <Pagination
        :currentPage="page"
        :totalPages="totalPage"
        @page-changed="onPageChanged"
    />
  </div>
</template>

<style scoped>
.hero-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.header-actions {
  text-align: right;
  margin-bottom: 2rem;
}

.create-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #2ecc71;
  color: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.create-btn:hover {
  background-color: #27ae60;
  transform: scale(1.05);
}

.cards-grid {
  display: grid;
  gap: 1.5rem;
}
</style>

