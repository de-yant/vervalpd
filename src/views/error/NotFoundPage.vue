<template>
  <AppLayout subtitle="Halaman tidak ditemukan">
    <section class="error-page-section">
      <div class="error-page-card card">
        <AppError code="404" variant="warning">
          <button type="button" class="btn" @click="goHome">
            <ArrowLeft :size="16" />
            Kembali ke Beranda
          </button>
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
