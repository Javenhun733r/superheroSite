<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHeroById, deleteHero } from '../api/superheroApi'
import { toast } from '../main'

const route = useRoute()
const router = useRouter()
const hero = ref(null)
const loading = ref(false)

const loadHero = async () => {
  try {
    loading.value = true
    const data = await getHeroById(route.params.id)
    hero.value = data
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.error || 'Failed to load hero')
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this hero?')) return

  try {
    await deleteHero(route.params.id)
    toast.success('Hero deleted successfully')

    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.error || 'Failed to delete hero')
  }
}

const formatImageUrl = (url) => {
  if (!url) return ''
  return url.startsWith('http') ? url : `${window.location.origin}${url}`
}

onMounted(loadHero)
</script>
<template>
  <div v-if="hero" class="hero-container">
    <div class="header-section">
      <router-link to="/">
        <button class="btn back-btn">← Main Page</button>
      </router-link>
      <div class="action-buttons">
        <router-link :to="`/heroes/${hero.id}/edit`">
          <button class="btn edit-btn">Edit</button>
        </router-link>
        <button @click="handleDelete" class="btn delete-btn">Delete</button>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="text-content">
        <h2 class="hero-nickname">{{ hero.nickname }}</h2>
        <p class="hero-real-name">Real name: {{ hero.realName }}</p>
        <p class="hero-description">{{ hero.originDescription }}</p>
        <p class="hero-superpowers">Superpowers: **{{ hero.superpowers.join(', ') }}**</p>
        <p class="hero-catch-phrase">"{{ hero.catchPhrase }}"</p>
      </div>

      <div class="images-gallery">
        <div v-for="img in hero.images" :key="img.id" class="image-wrapper">
          <img :src="formatImageUrl(img.url)" alt="hero image" class="hero-image" />
        </div>
      </div>
    </div>
  </div>
</template>


<style>

:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --background-color: #f4f7f6;
  --font-family-heading: 'Montserrat', sans-serif;
  --font-family-body: 'Roboto', sans-serif;
}

body {
  font-family: var(--font-family-body);
  background-color: var(--background-color);
  color: var(--primary-color);
  margin: 0;
  padding: 2rem;
}

.hero-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.back-btn {
  background-color: #ecf0f1;
  color: #333;
}

.back-btn:hover {
  background-color: #bdc3c7;
}

.edit-btn {
  background-color: var(--secondary-color);
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: var(--accent-color);
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    flex-direction: row;
  }
}

.text-content {
  flex: 1;
}

.hero-nickname {
  font-family: var(--font-family-heading);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.hero-real-name {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1rem;
  line-height: 1.6;
}

.hero-superpowers,
.hero-catch-phrase {
  margin-top: 1rem;
  font-style: italic;
  color: #555;
}

.images-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  flex: 1;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.hero-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>