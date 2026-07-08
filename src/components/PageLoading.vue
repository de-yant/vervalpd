<template>
  <section class="page-loading-card">
    <div class="page-loading-spinner"></div>

    <div class="page-loading-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Memuat data...",
  },

  message: {
    type: String,
    default: "Mohon tunggu sebentar.",
  },
});
</script>