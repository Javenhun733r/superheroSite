<template>
  <div class="pagination">
    <button
        :disabled="currentPage === 1"
        @click="$emit('page-changed', currentPage - 1)"
    >
      Prev
    </button>

    <span>Page {{ currentPage }} of {{ totalPages }}</span>

    <button
        :disabled="currentPage === totalPages"
        @click="$emit('page-changed', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    default: 10 
  }
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 14px;
  cursor: pointer;
}

button[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
