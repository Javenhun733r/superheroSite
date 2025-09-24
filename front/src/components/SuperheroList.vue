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
    <h1>Our Superheroes</h1>

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;

}
h1{
  text-align: center;
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 3rem;
  text-shadow:
      0 0 10px #7a7a7a,
      0 0 20px #9f9c9c,
      0 0 30px #d7d7d7;
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
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  justify-items: center;
}
</style>

