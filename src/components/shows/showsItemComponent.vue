<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
  show: any;
  minified: boolean;
}>();

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

const bookmarked = ref<boolean>(false);
const toggleBookmarked = () => (bookmarked.value = !bookmarked.value);
const computedBookmarkClasses = computed(() => ({
  "fa-bookmark text-white fa-regular": !bookmarked.value,
  "fa-bookmark text-white fa-solid": bookmarked.value,
}));
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl">
    <img
      :src="show.imageUrl"
      alt="show thumbnail"
      class="rounded-3xl object-cover w-full h-60"
    />

    <div
      class="absolute top-2 right-2 cursor-pointer frosted-glass w-10 h-10 flex items-center justify-center rounded-full"
      @click="toggleBookmarked"
    >
      <i :class="computedBookmarkClasses" />
    </div>

    <!-- Overlay Text -->
    <div
      v-if="props.minified"
      class="absolute bottom-0 left-0 flex-col heading-xs w-full"
    >
      <div class="w-full bg-black-to-transparent p-4">
        <div class="flex gap-3 items-center">
          <h2 class="body-m flex items-center gap-1">
            <i class="fa-solid fa-calendar" />
            {{ props.show.releaseDate }}
          </h2>
          <i class="fa-solid fa-circle text-unfocused text-[5px]" />
          <h2 class="body-m flex items-center gap-1">
            <i class="fa-solid fa-masks-theater" />
            {{ props.show.genre }}
          </h2>
          <i class="fa-solid fa-circle text-unfocused text-[5px]" />
          <h2 class="body-m flex items-center gap-1">
            <i class="fa-solid fa-clock" />{{
              computedFormattedDuration(props.show.duration)
            }}
          </h2>
        </div>
        {{ props.show.name }}
      </div>
    </div>

    <!-- Text Below Image -->
    <div v-else class="mt-2 flex-col heading-xs">
      <div class="flex gap-3 items-center">
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-calendar" />
          {{ props.show.releaseDate }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-masks-theater" />
          {{ props.show.genre }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-clock" />{{
            computedFormattedDuration(props.show.duration)
          }}
        </h2>
      </div>
      {{ props.show.name }}
    </div>
  </div>
</template>