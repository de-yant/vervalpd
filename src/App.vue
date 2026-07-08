<script setup>
import { RouterView } from "vue-router";
import AppToast from "@/components/AppToast.vue";
import AppModal from "@/components/AppModal.vue";
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <keep-alive include="DetailPage">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </RouterView>

  <AppToast />
  <AppModal />
</template>