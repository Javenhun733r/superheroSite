<template>
  <div v-if="hero">
    <div style="margin-bottom: 1rem">
      <router-link to="/"><button>Main Page</button></router-link>
    </div>

    <h2>{{ hero.nickname }}</h2>
    <p>Real name: {{ hero.realName }}</p>
    <p>{{ hero.originDescription }}</p>
    <p>Superpowers: {{ hero.superpowers.join(', ') }}</p>
    <p>Catch phrase: "{{ hero.catchPhrase }}"</p>

    <div v-for="img in hero.images" :key="img.id">
      <img :src="formatImageUrl(img.url)" alt="hero image" style="max-width:200px" />
    </div>

    <router-link :to="`/heroes/${hero.id}/edit`">
      <button>Edit</button>
    </router-link>
    <button @click="handleDelete">Delete</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHeroById, deleteHero } from '../api/superheroApi'

const route = useRoute()
const router = useRouter()
const hero = ref(null)

const loadHero = async () => {
  const data = await getHeroById(route.params.id)
  hero.value = data
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this hero?')) {
    try {
      await deleteHero(route.params.id)
      alert('Hero deleted')
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Failed to delete hero.')
    }
  }
}

const formatImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${window.location.protocol}//${window.location.hostname}:5231${url}`
}

onMounted(loadHero)
</script>
