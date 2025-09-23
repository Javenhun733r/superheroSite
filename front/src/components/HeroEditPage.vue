<template>
  <div v-if="hero">
    <router-link to="/"><button>Main Page</button></router-link>

    <h2>Edit Hero</h2>
    <form @submit.prevent="onSubmit">
      <label>
        Nickname:
        <input v-model="localForm.nickname" required />
      </label>

      <label>
        Real Name:
        <input v-model="localForm.realName" required />
      </label>

      <label>
        Origin Description:
        <textarea v-model="localForm.originDescription" required></textarea>
      </label>

      <label>
        Superpowers (comma-separated):
        <input v-model="localForm.superpowers" required />
      </label>

      <label>
        Catch Phrase:
        <input v-model="localForm.catchPhrase" required />
      </label>

      <div>
        <label>Upload Images:</label>
        <input type="file" multiple @change="onFilesChange" />
      </div>

      <ul>
        <li v-for="(file, index) in localForm.images" :key="file.id || file.tempId || index">
          <img :src="file.preview || file.url" style="max-width: 100px" />
          <button type="button" @click="removeImage(index)">Remove</button>
        </li>
      </ul>

      <button type="submit">Save</button>
      <button type="button" @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHeroById, updateHero } from '../api/superheroApi'

const route = useRoute()
const router = useRouter()
const hero = ref(null)

const localForm = ref({
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: []
})

const loadHero = async () => {
  const data = await getHeroById(route.params.id)
  hero.value = data

  localForm.value = {
    nickname: data.nickname,
    realName: data.realName,
    originDescription: data.originDescription,
    superpowers: data.superpowers.join(', '),
    catchPhrase: data.catchPhrase,
    images: data.images.map(img => ({ ...img, preview: img.url }))
  }
}

const onFilesChange = (event) => {
  const files = Array.from(event.target.files)
  const newFiles = files.map((file, index) => {
    file.preview = URL.createObjectURL(file)
    file.tempId = Date.now() + '-' + index
    return file
  })
  localForm.value.images = [...localForm.value.images, ...newFiles]
}

const removeImage = (index) => {
  localForm.value.images.splice(index, 1)
}

const onSubmit = async () => {
  try {
    const oldImages = localForm.value.images.filter(img => img.id).map(img => img.url)
    const newFiles = localForm.value.images.filter(img => !img.id)

    const formData = new FormData()
    formData.append('nickname', localForm.value.nickname)
    formData.append('realName', localForm.value.realName)
    formData.append('originDescription', localForm.value.originDescription)
    formData.append('superpowers', localForm.value.superpowers)
    formData.append('catchPhrase', localForm.value.catchPhrase)
    formData.append('oldImages', JSON.stringify(oldImages))

    newFiles.forEach(file => formData.append('images', file))

    await updateHero(route.params.id, formData)
    alert('Hero updated!')
    router.push(`/heroes/${route.params.id}`)
  } catch (err) {
    console.error(err)
    alert('Failed to update hero.')
  }
}

const cancelEdit = () => {
  router.back()
}

onMounted(loadHero)
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

input, textarea {
  padding: 0.5rem;
  font-size: 16px;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
