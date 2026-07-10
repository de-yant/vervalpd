<template>
  <AppLayout subtitle="Halaman tidak ditemukan">
    <section class="notfound-section">
      <div class="notfound-card">
        <AppError code="404" variant="warning">
          <div class="notfound-actions">
            <button type="button" class="nf-btn nf-btn--primary" @click="goHome">
              <ArrowLeft :size="16" />
              Kembali ke Beranda
            </button>
          </div>
        </AppError>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowLeft } from "@/components/Icons.js";
import AppError from "@/components/AppError.vue";
import AppLayout from "@/layouts/AppLayout.vue";

const router = useRouter();
const goHome = () => router.push("/");
</script>

<style scoped>
.notfound-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 24px;
}
.notfound-card {
  width: 100%;
  max-width: 480px;
}
.notfound-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 4px;
}
.nf-btn {
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
.nf-btn--primary {
  background: var(--primary, #2563eb);
  color: #fff;
  border-color: var(--primary, #2563eb);
}
.nf-btn--primary:hover {
  background: var(--primary-hover, #1d4ed8);
  transform: translateY(-1px);
}
</style>
