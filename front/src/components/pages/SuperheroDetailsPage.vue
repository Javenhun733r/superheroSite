<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {deleteHero, getHeroById} from '@/api/superheroApi.js'
import notyf from "@/plugins/notyf.js";

const route = useRoute()
const router = useRouter()
const hero = ref(null)
const loading = ref(false)
const isModalOpen = ref(false)
const currentImageIndex = ref(0)

const loadHero = async () => {
  try {
    loading.value = true
    hero.value = await getHeroById(route.params.id)
  } catch (error) {
    console.error(error)
    notyf.error(error.response?.data?.error || 'Failed to load hero')
  } finally {
    loading.value = false
  }
}
const openModal = (index) => {
  currentImageIndex.value = index
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const nextImage = () => {
  if (hero.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % hero.value.images.length
  }
}

const prevImage = () => {
  if (hero.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value - 1 + hero.value.images.length) % hero.value.images.length
  }
}
const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this hero?')) return

  try {
    await deleteHero(route.params.id)
    notyf.success('Hero deleted successfully')

    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error(error)
    notyf.error(error.response?.data?.error || 'Failed to delete hero')
  }
}

const formatImageUrl = (url) => {
  if (!url) return ''
  return url.startsWith('http') ? url : `${window.location.origin}${url}`
}

onMounted(loadHero)
</script>
<template>
  <div v-if="hero" class="hero-page-wrapper">
    <div class="hero-content-card">
      <div class="header-section">
        <router-link to="/">
          <button class="btn back-btn">← Main Page</button>
        </router-link>
        <div class="action-buttons">
          <router-link :to="`/heroes/${hero.id}/edit`">
            <button class="btn icon-btn edit-btn">
              <font-awesome-icon icon="fa-solid fa-edit"/>
            </button>
          </router-link>
          <button @click="handleDelete" class="btn icon-btn delete-btn">
            <font-awesome-icon icon="fa-solid fa-trash"/>
          </button>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="main-image-container" @click="openModal(0)">
          <img :src="formatImageUrl(hero.images[0]?.url)" alt="Main hero image" class="main-hero-image" />
        </div>

        <div class="text-content-panel">
          <h2 class="hero-nickname">{{ hero.nickname }}</h2>
          <p class="hero-real-name">Real name: {{ hero.realName }}</p>
          <div class="divider"></div>
          <p class="hero-description">{{ hero.originDescription }}</p>
          <p class="hero-superpowers">Superpowers: {{ hero.superpowers.join(', ') }}</p>
          <p class="hero-catch-phrase">"{{ hero.catchPhrase }}"</p>

          <div class="mini-gallery">
            <div v-for="(img, index) in hero.images" :key="img.id" class="mini-image-wrapper" @click="openModal(index)">
              <img :src="formatImageUrl(img.url)" alt="hero image" class="mini-hero-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close-btn" @click="closeModal">×</button>
      <button class="modal-nav-btn prev" @click="prevImage">‹</button>
      <img :src="formatImageUrl(hero.images[currentImageIndex]?.url)" alt="Fullscreen hero image" class="modal-image" />
      <button class="modal-nav-btn next" @click="nextImage">›</button>
    </div>
  </div>
</template>

<style scoped>
.hero-page-wrapper {
  color:  #e0e0e0;
  font-family: 'Poppins', sans-serif;
  position: relative;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content-card {
  background-color: #2c2c44;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  padding: 2.5rem;
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
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.back-btn {
  background-color: transparent;
  color: #c8c8d8;
  border: 2px solid #c8c8d8;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.back-btn:hover {
  background-color: #c8c8d8;
  color: #2c2c44;
  transform: scale(1.02);
}


.icon-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.edit-btn {
  background-color: #51a6dc;
}

.edit-btn:hover {
  background-color: #2980b9;
  transform: scale(1.1);
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
  transform: scale(1.1);
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

.main-image-container {
  flex: 2;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.main-image-container:hover {
  transform: translateY(-5px);
}

.main-hero-image {
  width: 100%;
  height: auto;
  display: block;
}

.text-content-panel {
  flex: 1;
}

.hero-nickname {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1;
  color: white;
  text-shadow: 0 0 20px #51a6dc;
}

.hero-real-name,
.hero-superpowers,
.hero-catch-phrase {
  color: #b0b0c0;
  margin-top: 0;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
}

.divider {
  height: 2px;
  background-color: #4a4a66;
  margin: 1.5rem 0;
  width: 50px;
}

.mini-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.mini-image-wrapper {
  width: 90px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.mini-image-wrapper:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.mini-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  cursor: default;
}

.modal-image {
  max-width: 100%;
  max-height: 100vh;
  display: block;
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.modal-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.modal-nav-btn.prev {
  left: 20px;
}

.modal-nav-btn.next {
  right: 20px;
}
</style>