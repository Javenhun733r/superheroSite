<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
  }
});
</script>

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


<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
  background-color: #ecf0f1;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pagination button:hover:not([disabled]) {
  background-color: #bdc3c7;
  transform: scale(1.05);
}
.pagination button[disabled] {
  cursor: not-allowed;
  opacity: 0.4;
  background-color: #f4f7f6;
}
.pagination span {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}
</style>
