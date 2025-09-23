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
  <div>
    <div style="text-align: right; margin-bottom: 1rem;">
      <router-link to="/create">
        <button>Create New Hero</button>
      </router-link>
    </div>
    <SuperheroCard
        v-for="hero in heroes"
        :key="hero.id"
        :hero="hero"
    />
    <Pagination
        :currentPage="page"
        :totalPages="totalPage"
        @page-changed="onPageChanged"
    />

  </div>
</template>


