<script setup>
import { RouterView } from "vue-router";
import AppToast from "@/components/AppToast.vue";
import AppModal from "@/components/AppModal.vue";
import BackToTop from "@/components/BackToTop.vue";
import WhatsAppButton from "@/components/WhatsAppButton.vue";
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <keep-alive include="DetailPage">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </RouterView>

  <AppToast />
  <AppModal />
  <BackToTop />
  <WhatsAppButton />
</template>