<template>
  <div v-if="hero" class="form-container">
    <div class="header-actions">
      <router-link to="/"><button class="btn back-btn">← Main Page</button></router-link>
    </div>

    <h2 class="form-title">Edit Hero</h2>
    <form @submit.prevent="onSubmit" class="superhero-form">
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input id="nickname" v-model="localForm.nickname" required />
      </div>

      <div class="form-group">
        <label for="realName">Real Name:</label>
        <input id="realName" v-model="localForm.realName" required />
      </div>

      <div class="form-group">
        <label for="originDescription">Origin Description:</label>
        <textarea id="originDescription" v-model="localForm.originDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="superpowers">Superpowers (comma-separated):</label>
        <input id="superpowers" v-model="localForm.superpowers" required />
      </div>

      <div class="form-group">
        <label for="catchPhrase">Catch Phrase:</label>
        <input id="catchPhrase" v-model="localForm.catchPhrase" required />
      </div>

      <div class="form-group">
        <label>Upload New Images:</label>
        <input type="file" multiple @change="onFilesChange" class="file-input" />
      </div>

      <ul class="image-previews">
        <li v-for="(file, index) in localForm.images" :key="file.id || file.tempId || index" class="preview-item">
          <img :src="file.preview || file.url" class="preview-img" />
          <button type="button" @click="removeImage(index)" class="remove-btn">
            &times;
          </button>
        </li>
      </ul>

      <div class="button-group">
        <button type="submit" class="btn submit-btn">Save</button>
        <button type="button" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getHeroById, updateHero } from '../api/superheroApi'
import { toast } from '../main'

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
    toast.success('Hero updated!')
    setTimeout(() => {
      router.push(`/heroes/${route.params.id}`)
    }, 1500)
    
  } catch (err) {
    console.error(err)
    toast.error('Failed to update hero.')
  }
}

const cancelEdit = () => {
  router.back()
}

onMounted(loadHero)
</script>

<style scoped>
.form-container {
  max-width: 650px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.header-actions {
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
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
  border-color: #3498db;
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
  line-height: 1;
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

.button-group {
  display: flex;
  justify-content: flex-end; /* Вирівняти кнопки праворуч */
  gap: 1rem;
  margin-top: 1rem;
}

.submit-btn {
  background-color: #2ecc71;
  color: white;
}

.submit-btn:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}

.cancel-btn {
  background-color: #bdc3c7;
  color: #333;
}

.cancel-btn:hover {
  background-color: #95a5a6;
}
</style>