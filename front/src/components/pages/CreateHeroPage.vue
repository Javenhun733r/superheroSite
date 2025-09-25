<script setup>
import {ref} from 'vue'
import {createHero} from '@/api/superheroApi.js'
import notyf from "@/plugins/notyf.js";
import router from "@/router/index.js";

const form = ref({
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: []
})

const onFilesChange = (source) => {
  const files = source.target ? source.target.files : source.files

  const selectedFiles = Array.from(files).map((file, index) => {
    file.preview = URL.createObjectURL(file)
    file.tempId = Date.now() + '-' + index
    return file
  })
  form.value.images = [...form.value.images, ...selectedFiles]
}

const removeFile = (index) => {
  form.value.images.splice(index, 1)
}
const onDragPrevent = (event) => {
  event.preventDefault()
}
const onDragDrop = (event) => {
  event.preventDefault()
  onFilesChange(event.dataTransfer)
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
    notyf.success('Hero created successfully!')
    setTimeout(() => {
      router.push(`/`)
    }, 1500)
  } catch (error) {
    console.error(error)
    notyf.error('Failed to create hero.')
  }
}
</script>
<template>
  <div class="form-container">
    <router-link to="/">
      <button class="btn back-btn">← Main Page</button>
    </router-link>
    <h2 class="form-title">Create New Superhero</h2>

    <form @submit.prevent="onSubmit" class="superhero-form">
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input id="nickname" v-model="form.nickname" required/>
      </div>

      <div class="form-group">
        <label for="realName">Real Name:</label>
        <input id="realName" v-model="form.realName" required/>
      </div>

      <div class="form-group">
        <label for="originDescription">Origin Description:</label>
        <textarea id="originDescription" v-model="form.originDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="superpowers">Superpowers (comma-separated):</label>
        <input id="superpowers" v-model="form.superpowers" required/>
      </div>

      <div class="form-group">
        <label for="catchPhrase">Catch Phrase:</label>
        <input id="catchPhrase" v-model="form.catchPhrase" required/>
      </div>

      <div class="upload-container">
        <label
            for="file-upload"
            class="upload-drop-zone"
            @dragover.prevent="onDragPrevent"
            @dragleave.prevent="onDragPrevent"
            @drop.prevent="onDragDrop"
        >
          <i class="fas fa-cloud-upload-alt upload-icon"></i>
          <span class="upload-text">
            <span v-if="form.images.length === 0">Click here to upload, or drag & drop images</span>
            <span v-else>{{ form.images.length }} files selected. Click to add more.</span>
          </span>
          <input id="file-upload" type="file" multiple @change="onFilesChange" class="hidden-file-input"/>
        </label>
      </div>
      <ul class="image-previews">
        <li v-for="(file, index) in form.images" :key="file.tempId || index" class="preview-item">
          <img :src="file.preview" class="preview-img" alt=""/>
          <button type="button" @click="removeFile(index)" class="remove-btn">&times;</button>
        </li>
      </ul>

      <button type="submit" class="btn submit-btn">Create Hero</button>
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

.submit-btn {
  background-color: #2ecc71;
  color: #ffffff;
  margin-top: 2rem;
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
</style>