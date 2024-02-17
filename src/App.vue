<script lang="ts" setup>
import TheHeader from "./components/layout/TheHeader.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <main class="bg-dark-blue min-h-[100%]">
    <TheHeader v-if="!route.name.startsWith('sign')" />
    <div class="pt-16">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
