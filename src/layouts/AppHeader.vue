<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { GraduationCap, Moon, RotateCcw, Sun } from "@/components/Icons.js";
import { useSekolahStore } from "@/stores/sekolah";
import { useUiStore } from "@/stores/ui";

defineProps({
  subtitle: { type: String, default: "" },
});

const router = useRouter();
const goHome = () => router.push("/");

const isDark = ref(false);
const refreshing = ref(false);

function setTheme(dark) {
  isDark.value = dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
  setTheme(!isDark.value);
}

async function handleRefresh() {
  if (refreshing.value) return;
  refreshing.value = true;

  const ui = useUiStore();
  const sekolah = useSekolahStore();

  try {
    await sekolah.fetchSekolah(true);
    localStorage.setItem("refresh_status", "success");
  } catch {
    localStorage.setItem("refresh_status", "error");
  }

  window.location.reload();
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved === "dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }

  const status = localStorage.getItem("refresh_status");
  if (status) {
    localStorage.removeItem("refresh_status");
    const ui = useUiStore();
    if (status === "success") {
      ui.success("Data berhasil diperbarui.");
    } else {
      ui.error("Gagal memperbarui data.");
    }
  }
});
</script>

<template>
  <header class="site-header">
    <slot>
      <button type="button" class="brand" @click="goHome">
        <span class="brand-logo">
          <GraduationCap :size="22" />
        </span>
          <span class="brand-text">
            <strong>{{ subtitle }}</strong>
            <small>VervalPD</small>
          </span>
      </button>
      <nav class="header-right">
        <button
          type="button"
          class="header-icon-btn"
          title="Muat ulang data"
          aria-label="Muat ulang data"
          :disabled="refreshing"
          @click="handleRefresh"
        >
          <RotateCcw :size="17" :class="{ spin: refreshing }" />
        </button>

        <button
          type="button"
          class="header-icon-btn"
          :title="isDark ? 'Mode terang' : 'Mode gelap'"
          :aria-label="isDark ? 'Mode terang' : 'Mode gelap'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" :size="17" />
          <Moon v-else :size="17" />
        </button>
      </nav>
    </slot>
  </header>
</template>
