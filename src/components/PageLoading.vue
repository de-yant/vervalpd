<template>
  <section class="page-loading-card">
    <div class="pulse-ring">
      <div class="pulse-ring-inner"></div>
    </div>

    <div class="pl-progress">
      <div class="pl-progress-bar">
        <div class="pl-progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <span class="pl-progress-text">{{ progress }}%</span>
    </div>

    <div class="page-loading-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}<span class="typing-dots"></span></p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  title: { type: String, default: "Verifikasi Data" },
  message: { type: String, default: "Memuat data peserta didik." },
});

const progress = ref(0);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    if (progress.value < 100) progress.value++;
  }, 40);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>