<template>
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
      <label>Add Image URL:</label>
      <input v-model="newImage" placeholder="https://..." />
      <button type="button" @click="addImage">Add Image</button>
    </div>

    <ul>
      <li v-for="(url, index) in localForm.imageUrls" :key="index">
        <img :src="url" style="max-width: 100px" />
        <button type="button" @click="removeImage(index)">Remove</button>
      </li>
    </ul>

    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue'


const props = defineProps({
  modelValue: Object,
  submitLabel: String,
})


const emit = defineEmits(['submit', 'update:modelValue'])


const localForm = ref({ ...props.modelValue })

watch(
    () => props.modelValue,
    (newVal) => {
      localForm.value = { ...newVal }
    },
    { deep: true }
)

watch(
    localForm,
    (newVal) => {
      emit('update:modelValue', newVal)
    },
    { deep: true }
)

const newImage = ref('')

const addImage = () => {
  if (newImage.value.trim()) {
    localForm.value.imageUrls.push(newImage.value.trim())
    newImage.value = ''
  }
}

const removeImage = (index) => {
  localForm.value.imageUrls.splice(index, 1)
}

const onSubmit = () => {
  emit('submit', localForm.value)
}
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
