<script lang="ts" setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

<template>
  <main class="bg-dark-blue pt-10 min-h-[100%]">
    <TheHeader/>
    <RouterView />
  </main>
</template>

<style scoped></style>
