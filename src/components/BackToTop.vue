<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowUp } from "@/components/Icons.js";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 120;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="btt">
      <button
        v-if="visible"
        type="button"
        class="back-to-top"
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
        @click="scrollToTop"
      >
        <ArrowUp :size="20" />
      </button>
    </Transition>
  </Teleport>
</template>
