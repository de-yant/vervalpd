<script setup>
import { computed } from "vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();

const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  loading: "⏳",
};

const titles = {
  success: "Berhasil",
  error: "Gagal",
  warning: "Peringatan",
  info: "Informasi",
  loading: "Mohon Tunggu",
};

const toasts = computed(() => ui.toasts || []);

function getIcon(type) {
  return icons[type] || icons.info;
}

function getTitle(toast) {
  return toast.title || titles[toast.type] || titles.info;
}
</script>

<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="app-toast-stack">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="app-toast"
        :class="[`is-${toast.type}`, { 'is-loading': toast.type === 'loading' }]"
        role="alert"
      >
        <div class="app-toast-icon">
          <span v-if="toast.type === 'loading'" class="toast-spinner"></span>
          <span v-else>{{ getIcon(toast.type) }}</span>
        </div>

        <div class="app-toast-content">
          <strong>{{ getTitle(toast) }}</strong>
          <p v-if="toast.message">{{ toast.message }}</p>
        </div>

        <button
          v-if="toast.type !== 'loading'"
          type="button"
          class="app-toast-close"
          aria-label="Tutup notifikasi"
          @click="ui.hideToast(toast.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>