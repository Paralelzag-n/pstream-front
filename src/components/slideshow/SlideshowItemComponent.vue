<script setup lang="ts">
const props = defineProps<{
  slideshowImageWidth: number,
  show: any
}>()
</script>

<template>
  <div class="rounded-2xl overflow-hidden cursor-pointer h-full shrink-0 border-solid border-2 border-grayish-blue/10 relative" :style="{'width': `${props.slideshowImageWidth}%`}">
    <img :src="props.show.imageUrl" alt="image" class="h-full w-full object-cover transition-all">
    <div class="absolute bottom-0 left-0 flex flex-col gap-3 w-full bg-black-to-transparent p-10">
      <h2 class="font-medium text-purple">{{ props.show.name }}</h2>
      <div class="flex gap-2 items-center">
        <h2 class="bg-purple text-white rounded w-12 text-center text-lg">{{props.show.rating}}</h2>
        <h2 class="text-white text-lg">{{props.show.releaseDate}}</h2>
        <h2 class="text-white text-lg">{{props.show.genre}}</h2>
        <h2 class="text-white text-lg">{{props.show.duration}}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>