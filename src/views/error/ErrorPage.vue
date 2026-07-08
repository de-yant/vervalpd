<template>
  <AppLayout subtitle="Terjadi kesalahan">
    <section class="error-page-section">
      <div class="error-page-card card">
        <AppError :code="code" :title="title" :description="description" variant="danger">
          <button type="button" class="btn" @click="goHome">
            <ArrowLeft :size="16" />
            Kembali ke Beranda
          </button>
          <button type="button" class="btn btn-light" @click="reloadPage">
            <RotateCcw :size="16" />
            Coba Lagi
          </button>
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
