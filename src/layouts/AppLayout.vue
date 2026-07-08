<script setup>
import AppHeader from "@/layouts/AppHeader.vue";
import AppFooter from "@/layouts/AppFooter.vue";

defineProps({
  subtitle: { type: String, default: "" },
  footerText: { type: String, default: "" },
  pageClass: { type: String, default: "home-page" },
});
</script>

<template>
  <main :class="pageClass">
    <div class="bg-mesh" aria-hidden="true">
      <div class="mesh-orb orb-a"></div>
      <div class="mesh-orb orb-b"></div>
      <div class="mesh-orb orb-c"></div>
      <div class="grid-lines"></div>
    </div>

    <AppHeader :subtitle="subtitle">
      <template v-if="$slots.header" #default>
        <slot name="header" />
      </template>
    </AppHeader>

    <slot />

    <AppFooter :text="footerText">
      <template v-if="$slots.footer" #default>
        <slot name="footer" />
      </template>
    </AppFooter>
  </main>
</template>
