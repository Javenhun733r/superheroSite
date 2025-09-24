<script setup>
import { ref } from 'vue';

const props = defineProps({
  hero: Object
});

const currentImageIndex = ref(0);

const nextImage = () => {
  if (props.hero.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.hero.images.length;
  }
};

const prevImage = () => {
  if (props.hero.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.hero.images.length) % props.hero.images.length;
  }
};
</script>

<template>
  <router-link :to="`/heroes/${hero.id}`" class="card-link">
    <div class="card">
      <div class="carousel-container">
        <button @click.prevent.stop="prevImage" class="carousel-btn prev-btn" v-if="hero.images.length > 1">‹</button>
        <img :src="hero.images?.[currentImageIndex]?.url" alt="Hero image" class="carousel-img" />
        <button @click.prevent.stop="nextImage" class="carousel-btn next-btn" v-if="hero.images.length > 1">›</button>
        <div class="carousel-dots" v-if="hero.images.length > 1">
          <span
              v-for="(image, index) in hero.images"
              :key="index"
              :class="{ dot: true, active: index === currentImageIndex }"
              @click.prevent.stop="currentImageIndex = index"
          ></span>
        </div>
      </div>
      <div class="hero-name-overlay">
        <h3>{{ hero.nickname }}</h3>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}
.card {
  position: relative;
  width: 220px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
}
.carousel-container {
  width: 100%;
  height: 100%;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.prev-btn {
  left: 5px;
}

.next-btn {
  right: 5px;
}

.carousel-dots {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.hero-name-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  text-align: center;
}
.hero-name-overlay h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}

.dot.active {
  background-color: white;
}
</style>