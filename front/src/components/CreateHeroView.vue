<template>
  <div class="form-container">
    <router-link to="/">
      <button>Main Page</button>
    </router-link>
    <h2>Create New Superhero</h2>

    <SuperheroForm
        v-model="form"
        :submitLabel="'Create Hero'"
        @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SuperheroForm from '../components/SuperheroForm.vue'
import { createHero } from '../api/superheroApi'

const router = useRouter()

const form = ref({
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  imageUrls: [],
})

const handleSubmit = async () => {
  const heroData = {
    ...form.value,
    superpowers: form.value.superpowers.split(',').map(p => p.trim()),
  }

  try {
    await createHero(heroData)
    alert('Hero created successfully!')
    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Failed to create hero.')
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
