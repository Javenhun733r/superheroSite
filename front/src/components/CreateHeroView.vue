<template>
  <div class="form-container">
    <router-link to="/">
      <button class="btn back-btn">← Main Page</button>
    </router-link>
    <h2 class="form-title">Create New Superhero</h2>

    <form @submit.prevent="onSubmit" class="superhero-form">
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input id="nickname" v-model="form.nickname" required />
      </div>

      <div class="form-group">
        <label for="realName">Real Name:</label>
        <input id="realName" v-model="form.realName" required />
      </div>

      <div class="form-group">
        <label for="originDescription">Origin Description:</label>
        <textarea id="originDescription" v-model="form.originDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="superpowers">Superpowers (comma-separated):</label>
        <input id="superpowers" v-model="form.superpowers" required />
      </div>

      <div class="form-group">
        <label for="catchPhrase">Catch Phrase:</label>
        <input id="catchPhrase" v-model="form.catchPhrase" required />
      </div>

      <div class="form-group">
        <label>Upload Images:</label>
        <input type="file" multiple @change="onFilesChange" class="file-input" />
      </div>

      <ul class="image-previews">
        <li v-for="(file, index) in form.images" :key="file.tempId || index" class="preview-item">
          <img :src="file.preview" class="preview-img" />
          <button type="button" @click="removeFile(index)" class="remove-btn">&times;</button>
        </li>
      </ul>

      <button type="submit" class="btn submit-btn">Create Hero</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createHero } from '../api/superheroApi'
import { toast } from '../main'

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
    toast.success('Hero created successfully!')
    router.push('/')
  } catch (error) {
    console.error(error)
    toast.error('Failed to create hero.')
  }
}
</script>

<style scoped>
.form-container {
  max-width: 650px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08); /* М'яка, сучасна тінь */
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px; /* Закруглені кнопки */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-btn {
  background-color: #ecf0f1;
  color: #333;
}

.back-btn:hover {
  background-color: #bdc3c7;
}

.form-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.superhero-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: #555;
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3498db; /* Синій фокус */
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.file-input {
  cursor: pointer;
}

.image-previews {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.preview-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(231, 76, 60, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-item:hover .remove-btn {
  opacity: 1;
}

.submit-btn {
  background-color: #2ecc71;
  color: white;
  margin-top: 1rem;
  align-self: flex-start;
}

.submit-btn:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}
</style>