<template>
  <div class="form-container">
    <router-link to="/">
      <button>Main Page</button>
    </router-link>
    <h2>Create New Superhero</h2>

    <form @submit.prevent="onSubmit">
      <label>
        Nickname:
        <input v-model="form.nickname" required />
      </label>

      <label>
        Real Name:
        <input v-model="form.realName" required />
      </label>

      <label>
        Origin Description:
        <textarea v-model="form.originDescription" required></textarea>
      </label>

      <label>
        Superpowers (comma-separated):
        <input v-model="form.superpowers" required />
      </label>

      <label>
        Catch Phrase:
        <input v-model="form.catchPhrase" required />
      </label>

      <div>
        <label>Upload Images:</label>
        <input type="file" multiple @change="onFilesChange" />
      </div>

      <ul>
        <li v-for="(file, index) in form.images" :key="file.tempId || index">
          <img :src="file.preview" style="max-width: 100px" />
          <button type="button" @click="removeFile(index)">Remove</button>
        </li>
      </ul>

      <button type="submit">Create Hero</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createHero } from '../api/superheroApi'

const router = useRouter()

const form = ref({
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: []
})

const onFilesChange = (event) => {
  const selectedFiles = Array.from(event.target.files).map((file, index) => {
    file.preview = URL.createObjectURL(file)
    file.tempId = Date.now() + '-' + index
    return file
  })
  form.value.images = [...form.value.images, ...selectedFiles]
}

const removeFile = (index) => {
  form.value.images.splice(index, 1)
}

const onSubmit = async () => {
  try {
    const formData = new FormData()
    formData.append('nickname', form.value.nickname)
    formData.append('realName', form.value.realName)
    formData.append('originDescription', form.value.originDescription)
    formData.append('superpowers', form.value.superpowers.split(',').map(s => s.trim()).join(','))
    formData.append('catchPhrase', form.value.catchPhrase)
    form.value.images.forEach(file => formData.append('images', file))

    await createHero(formData)
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

input,
textarea {
  padding: 0.5rem;
  font-size: 16px;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
