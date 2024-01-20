<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  show: any
  minified: boolean
}>()

const computedFormattedDuration = computed(() => {
  return (duration: number) => {
    if (duration < 60) {
      return `${duration} min`;
    } else {
      let hours = Math.floor(duration / 60);
      let minutes = duration % 60;
      return `${hours}h ${minutes}min`;
    }
  };
});

const bookmarked = ref<boolean>(false)
const toggleBookmarked = () => bookmarked.value = !bookmarked.value
const computedBookmarkClasses = computed(() => ({
  'fa-bookmark text-white fa-regular': !bookmarked.value,
  'fa-bookmark text-white fa-solid': bookmarked.value,
}));
</script>

<template>
  <div class="relative">
    <img
        class="rounded-3xl object-cover w-full min-h-30"
        :src="show.imageUrl"
        alt="show thumbnail"
    />

    <div @click="toggleBookmarked" class="absolute top-2 right-2 cursor-pointer frosted-glass w-10 h-10 flex items-center justify-center rounded-full">
      <i :class="computedBookmarkClasses"/>
    </div>

    <!-- Overlay Text -->
    <div v-if="props.minified" class="absolute bottom-0 left-0 p-4">
      <!-- Text content here -->
      <h2 class="text-white">{{ show.name }}</h2>
      <!-- Additional text elements -->
    </div>

    <!-- Text Below Image -->
    <div v-else class="mt-4">
      <!-- Text content here -->
      <h2>{{ show.name }}</h2>
      <!-- Additional text elements -->
    </div>
  </div>

<!--    <div class="absolute -bottom-8 left-0">-->
<!--      <div class="flex gap-3 items-center">-->
<!--        <h2 class="body-m flex items-center gap-1">-->
<!--          <i class="fa-solid fa-calendar "/>-->
<!--          {{ props.show.releaseDate }}-->
<!--        </h2>-->
<!--        <i class="fa-solid fa-circle "/>-->
<!--        <h2 class="body-m flex items-center gap-1">-->
<!--          <i class="fa-solid fa-masks-theater"/>-->
<!--          {{ props.show.genre }}-->
<!--        </h2>-->
<!--        <i class="fa-solid fa-circle text-unfocused text-[5px]"/>-->
<!--        <h2 class="body-m flex items-center gap-1">-->
<!--          <i class="fa-solid fa-clock"/>{{ computedFormattedDuration(props.show.duration) }}-->
<!--        </h2>-->
<!--      </div>-->
<!--    </div>-->
<!--    <img class="rounded-3xl h-full object-cover" :src="show.imageUrl" alt="show thumbnail">-->
<!--  </div>-->
</template>

<style scoped lang="scss">
</style>