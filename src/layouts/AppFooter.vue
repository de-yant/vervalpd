<script setup>
import { computed } from "vue";

defineProps({
  text: { type: String, default: "VervalPD" },
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="site-footer">
    <slot>
      <span>&copy; {{ currentYear }} {{ text }}</span>
      <span class="footer-credit">
        Dikembangkan oleh <a href="https://adeharyanto.my.id" target="_blank" rel="noopener noreferrer"><strong>HaryantoLabs</strong></a>
      </span>
    </slot>
  </footer>
</template>
