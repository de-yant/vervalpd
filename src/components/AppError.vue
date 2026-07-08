<script setup>
import { computed } from "vue";
import { CircleAlert, FileWarning, ShieldQuestion, X } from "@/components/Icons.js";

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
  if (code === "network") return X;
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
</script>

<template>
  <div class="app-error" :class="[`app-error--${variant}`, { 'app-error--compact': compact }]">
    <div class="app-error-icon">
      <component :is="icon" :size="compact ? 28 : 40" />
    </div>

    <div v-if="code" class="app-error-code">{{ code }}</div>

    <h1 v-if="!compact" class="app-error-title">{{ defaultTitle }}</h1>
    <h2 v-else class="app-error-title">{{ defaultTitle }}</h2>

    <p class="app-error-desc">{{ defaultDescription }}</p>

    <div v-if="$slots.default" class="app-error-actions">
      <slot />
    </div>
  </div>
</template>


