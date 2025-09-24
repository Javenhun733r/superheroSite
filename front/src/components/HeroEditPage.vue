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

const onFilesChange = (source) => {
  const files = source.target ? source.target.files : source.files

  const newFiles = Array.from(files).map((file, index) => {
    file.preview = URL.createObjectURL(file)
    file.tempId = Date.now() + '-' + index
    return file
  })
  localForm.value.images = [...localForm.value.images, ...newFiles]
}
const onDragDrop = (event) => {
  event.preventDefault()
  onFilesChange(event.dataTransfer)
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

      <div class="upload-container">
        <label
            for="file-upload"
            class="upload-drop-zone"
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="onDragDrop"
        >
          <i class="fas fa-cloud-upload-alt upload-icon"></i>
          <span class="upload-text">
            <span v-if="localForm.images.length === 0">Click here to upload, or drag & drop images</span>
            <span v-else>{{ localForm.images.length }} files in gallery. Drag & drop new images or click to add.</span>
          </span>
          <input id="file-upload" type="file" multiple @change="onFilesChange" class="hidden-file-input" />
        </label>
      </div>

      <ul class="image-previews">
        <li v-for="(file, index) in localForm.images" :key="file.id || file.tempId || index" class="preview-item">
          <img :src="file.preview || file.url" class="preview-img" alt="Hero image preview"/>
          <button type="button" @click="removeImage(index)" class="remove-btn">
            &times;
          </button>
        </li>
      </ul>

      <div class="button-group">
        <button type="button" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
        <button type="submit" class="btn submit-btn">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.form-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 3.5rem;
  background-color: #2c2c44;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  position: relative;
}

.header-actions {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}


.back-btn {
  background-color: transparent;
  color: #c8c8d8;
  border: 2px solid #c8c8d8;
  padding: 0.5rem 1rem;
}

.back-btn:hover {
  background-color: #c8c8d8;
  color: #1a1a2e;
  transform: scale(1.02);
}


.form-title {
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
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
  color: #b0b0c0;
  margin-bottom: 0.5rem;
}


input,
textarea {
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #4a4a66;
  background-color: #1a1a2e;
  color: #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #2ecc71;
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.3);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.upload-container {
  margin-top: 1rem;
}

.upload-drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  padding: 1rem;
  border: 3px dashed #4a4a66;
  border-radius: 12px;
  background-color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-drop-zone:hover {
  border-color: #2ecc71;
  background-color: #22223a;
}

.upload-icon {
  font-size: 3rem;
  color: #c8c8d8;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.upload-drop-zone:hover .upload-icon {
  color: #2ecc71;
}

.upload-text {
  color: #b0b0c0;
  text-align: center;
  font-weight: 500;
}

.hidden-file-input {
  display: none;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.preview-img {
  width: 120px;
  height: 120px;
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


.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn {
  background-color: #2ecc71;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #27ae60;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
}

.cancel-btn {
  background-color: #5b5b75;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
}

.cancel-btn:hover {
  background-color: #4a4a66;
  transform: translateY(-1px);
}
</style>