<script lang="ts" setup>
import SlideshowComponent from "./components/slideshow/SlideshowComponent.vue";
</script>

<template>
  <main class="bg-dark-blue min-h-[100vh]">
    <SlideshowComponent/>
    <RouterView />
  </main>
</template>

<style scoped></style>
