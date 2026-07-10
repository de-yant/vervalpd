<script setup>
import { computed, ref, onMounted } from "vue";
import { CircleAlert, FileWarning, ShieldQuestion, WifiOff } from "@/components/Icons.js";

const props = defineProps({
  code: { type: [String, Number], default: "404" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  variant: {
    type: String,
    default: "warning",
    validator: (v) => ["warning", "danger", "info", "muted"].includes(v),
  },
  compact: { type: Boolean, default: false },
});

const icon = computed(() => {
  const code = String(props.code);
  if (code.startsWith("4")) return FileWarning;
  if (code.startsWith("5")) return CircleAlert;
  if (code === "network") return WifiOff;
  return ShieldQuestion;
});

const defaultTitle = computed(() => {
  if (props.title) return props.title;
  const code = String(props.code);
  if (code === "404") return "Halaman Tidak Ditemukan";
  if (code === "403") return "Akses Ditolak";
  if (code === "500") return "Terjadi Kesalahan Server";
  if (code === "503") return "Layanan Tidak Tersedia";
  if (code === "network") return "Koneksi Terputus";
  return "Terjadi Kesalahan";
});

const defaultDescription = computed(() => {
  if (props.description) return props.description;
  const code = String(props.code);
  if (code === "404")
    return "Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.";
  if (code === "403")
    return "Anda tidak memiliki izin untuk mengakses halaman ini.";
  if (code === "500")
    return "Maaf, terjadi kesalahan pada server. Silakan coba kembali beberapa saat lagi.";
  if (code === "503")
    return "Layanan sedang dalam perbaikan. Silakan coba lagi nanti.";
  if (code === "network")
    return "Koneksi internet terputus. Periksa koneksi Anda dan coba lagi.";
  return "Terjadi kesalahan yang tidak terduga. Silakan coba kembali.";
});

const isAnimated = ref(false);
onMounted(() => setTimeout(() => isAnimated.value = true, 50));
</script>

<template>
  <Transition name="error-fade">
    <div class="app-error" :class="[`app-error--${variant}`, { 'app-error--compact': compact, 'app-error--visible': isAnimated }]">
      <div class="app-error-icon">
        <component :is="icon" :size="compact ? 32 : 48" class="icon-pulse" />
      </div>

      <Transition name="error-slide" appear>
        <div v-if="code" class="app-error-code">{{ code }}</div>
      </Transition>

      <Transition name="error-slide" appear>
        <h1 v-if="!compact" class="app-error-title">{{ defaultTitle }}</h1>
        <h2 v-else class="app-error-title">{{ defaultTitle }}</h2>
      </Transition>

      <Transition name="error-slide" appear>
        <p class="app-error-desc">{{ defaultDescription }}</p>
      </Transition>

      <Transition name="error-slide" appear>
        <div v-if="$slots.default" class="app-error-actions">
          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px;
  max-width: 480px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.app-error--visible {
  opacity: 1;
  transform: translateY(0);
}
.app-error--compact {
  padding: 24px 16px;
}

.app-error-icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 24px;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.app-error--compact .app-error-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
}

.app-error--warning .app-error-icon {
  background: rgba(234, 179, 8, 0.1);
  color: #eab308;
}
.app-error--danger .app-error-icon {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.app-error--info .app-error-icon {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
.app-error--muted .app-error-icon {
  background: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
}

.icon-pulse {
  animation: subtle-pulse 3s ease-in-out infinite;
}
@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
}

.app-error-code {
  font-size: 72px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 8px;
  transition: color 0.3s;
}
.app-error--compact .app-error-code {
  font-size: 48px;
}
.app-error--warning .app-error-code {
  color: #eab308;
}
.app-error--danger .app-error-code {
  color: #ef4444;
}
.app-error--info .app-error-code {
  color: #3b82f6;
}
.app-error--muted .app-error-code {
  color: #94a3b8;
}

.app-error-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--text-strong, #0f172a);
}
.app-error--compact .app-error-title {
  font-size: 16px;
}

.app-error-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted, #64748b);
  margin: 0 0 24px;
  max-width: 360px;
}
.app-error--compact .app-error-desc {
  font-size: 13px;
  margin-bottom: 16px;
}

.app-error-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Transitions */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.error-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.error-slide-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>


