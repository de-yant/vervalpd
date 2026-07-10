<template>
  <AppLayout subtitle="Terjadi kesalahan">
    <section class="error-page-section">
      <div class="error-page-card">
        <AppError :code="code" :title="title" :description="description" variant="danger">
          <div class="error-actions">
            <button type="button" class="error-btn error-btn--primary" @click="goHome">
              <ArrowLeft :size="16" />
              Kembali ke Beranda
            </button>
            <button type="button" class="error-btn error-btn--ghost" @click="reloadPage">
              <RotateCcw :size="16" />
              Coba Lagi
            </button>
          </div>
        </AppError>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowLeft, RotateCcw } from "@/components/Icons.js";
import AppError from "@/components/AppError.vue";
import AppLayout from "@/layouts/AppLayout.vue";

defineProps({
  code: { type: String, default: "500" },
  title: { type: String, default: "Terjadi Kesalahan" },
  description: {
    type: String,
    default: "Maaf, terjadi kesalahan pada server. Silakan coba kembali beberapa saat lagi.",
  },
});

const router = useRouter();
const goHome = () => router.push("/");
const reloadPage = () => window.location.reload();
</script>

<style scoped>
.error-page-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 24px;
}
.error-page-card {
  width: 100%;
  max-width: 480px;
}
.error-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4px;
}
.error-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 20px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid transparent;
  outline: none;
  white-space: nowrap;
}
.error-btn--primary {
  background: var(--primary, #2563eb);
  color: #fff;
  border-color: var(--primary, #2563eb);
}
.error-btn--primary:hover {
  background: var(--primary-hover, #1d4ed8);
  transform: translateY(-1px);
}
.error-btn--ghost {
  background: transparent;
  color: var(--text, #334155);
  border-color: var(--border, #e2e8f0);
}
.error-btn--ghost:hover {
  background: var(--surface-2, #f1f5f9);
  border-color: var(--muted, #94a3b8);
}
</style>
