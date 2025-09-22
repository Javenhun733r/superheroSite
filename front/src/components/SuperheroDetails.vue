<template>
  <div v-if="hero">
    <div style="margin-bottom: 1rem">
      <router-link to="/">
        <button>Main Page</button>
      </router-link>
    </div>

    <div v-if="!isEditing">
      <h2>{{ hero.nickname }}</h2>
      <p>Real name: {{ hero.realName }}</p>
      <p>{{ hero.originDescription }}</p>
      <p>Superpowers: {{ hero.superpowers.join(', ') }}</p>
      <p>Catch phrase: "{{ hero.catchPhrase }}"</p>
      <div v-for="img in hero.images" :key="img.id">
        <img :src="img.url" alt="hero image" style="max-width:200px" />
      </div>

      <button @click="isEditing = true">Edit</button>
      <button @click="handleDelete">Delete</button>
    </div>

    <div v-else>
      <h2>Edit Hero</h2>
      <SuperheroForm
          v-model="form"
          :submitLabel="'Update Hero'"
          @submit="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHeroById, updateHero, deleteHero } from '../api/superheroApi'
import SuperheroForm from '../components/SuperheroForm.vue'

const route = useRoute()
const router = useRouter()

const hero = ref(null)
const isEditing = ref(false)

const form = ref({
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  imageUrls: [],
})

const loadHero = async () => {
  const data = await getHeroById(route.params.id)
  hero.value = data

  form.value = {
    nickname: data.nickname,
    realName: data.realName,
    originDescription: data.originDescription,
    superpowers: data.superpowers.join(', '), // Back to string for editing
    catchPhrase: data.catchPhrase,
    imageUrls: data.images.map((img) => img.url),
  }
}

const handleUpdate = async () => {
  const updatedData = {
    ...form.value,
    superpowers: form.value.superpowers.split(',').map((s) => s.trim()),
  }

  try {
    await updateHero(route.params.id, updatedData)
    alert('Hero updated!')
    isEditing.value = false
    await loadHero()
  } catch (err) {
    console.error(err)
    alert('Failed to update hero.')
  }
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

watch(() => route.params.id, loadHero)
onMounted(loadHero)
</script>
