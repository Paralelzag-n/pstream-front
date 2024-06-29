<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const props = defineProps<{
  show: any;
  minified: boolean;
}>();

const imageLoaded = ref<boolean>(false);

const extraDetailMode = ref<boolean>(false);
const extraDetailModeTimeout = ref<any>(null);

const videoSrc = ref<string | any>(null);
const videoLoaded = ref<boolean>(false);
const videoPlayerRef = ref<HTMLVideoElement | null>(null);

function playVideoWhenReady(): void {
  if (videoPlayerRef.value) {
    if (videoLoaded.value) {
      videoPlayerRef.value.play();
    } else {
      videoPlayerRef.value.addEventListener(
        "loadedmetadata",
        () => {
          videoPlayerRef.value?.play();
          videoLoaded.value = true;
        },
        { once: true }
      );
    }
  }
}

watch(extraDetailMode, async (extraDetailOn) => {
  if (extraDetailOn) {
    if (!videoLoaded.value) {
      videoSrc.value = (await props.show.loadVideo()).default;
      if (videoPlayerRef.value) videoPlayerRef.value.volume = 0.1;
    }
    playVideoWhenReady();
  } else {
    if (videoPlayerRef.value) {
      videoPlayerRef.value.pause();
    }
  }
});

const videosMuted = ref<boolean>(true);

function toggleMute() {
  videosMuted.value = !videosMuted.value;
}

function onImageLoaded(): void {
  imageLoaded.value = true;
}

function handleMouseEnter(): void {
  extraDetailModeTimeout.value = setTimeout(() => {
    extraDetailMode.value = true;
  }, 500);
}

function handleMouseLeave(): void {
  clearTimeout(extraDetailModeTimeout.value);
  extraDetailMode.value = false;
}

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
  <div
    :class="{
      'scale-125 z-20 flex-col': extraDetailMode,
      'hover:scale-[1.02] ': !extraDetailMode,
    }"
    class="relative rounded-3xl overflow-hidden cursor-pointer transition duration-[0.4s]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Placeholder -->
    <div v-if="!imageLoaded && !videoSrc" class="frosted-glass w-full h-60" />

    <!-- Image -->
    <img
      v-show="imageLoaded && !extraDetailMode"
      :src="show.imageUrl"
      alt="show thumbnail"
      class="object-cover rounded-3xl w-full h-60"
      @load="onImageLoaded"
    />

    <!-- Video -->
    <div
      v-show="videoSrc && videoLoaded && extraDetailMode"
      class="h-60 relative"
    >
      <video
        ref="videoPlayerRef"
        :class="{
          'rounded-t-3xl': !props.minified,
          'rounded-3xl': props.minified,
        }"
        :muted="videosMuted"
        :src="videoSrc"
        class="object-cover w-full h-60"
        @loadedmetadata="playVideoWhenReady"
      />
      <!--  Actions  -->
      <div
        class="absolute bottom-4 right-4 cursor-pointer w-10 h-10 flex z-20 items-center justify-center rounded-full"
      >
        <i
          :class="{
            'fa-volume-xmark': videosMuted,
            'fa-volume-high': !videosMuted,
          }"
          class="fa-solid cursor-pointer flex text-white frosted-glass items-center justify-center transition-all w-10 h-10 rounded-full"
          @click="toggleMute"
        />
      </div>
    </div>

    <!--  Bookmark  -->
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
    <div
      v-if="!props.minified"
      :class="{
        'bg-details-black p-3': extraDetailMode,
      }"
      class="flex-col heading-xs py-3 transition-all"
    >
      <div class="flex gap-3 items-center">
        <h2
          :class="{
            'body-m': !extraDetailMode,
            'body-s': extraDetailMode,
          }"
          class="flex items-center gap-1"
        >
          <i class="fa-solid fa-calendar" />
          {{ props.show.releaseDate }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2
          :class="{
            'body-m': !extraDetailMode,
            'body-s': extraDetailMode,
          }"
          class="flex items-center gap-1"
        >
          <i class="fa-solid fa-masks-theater" />
          {{ props.show.genre }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2
          :class="{
            'body-m': !extraDetailMode,
            'body-s': extraDetailMode,
          }"
          class="flex items-center gap-1"
        >
          <i class="fa-solid fa-clock" />{{
            computedFormattedDuration(props.show.duration)
          }}
        </h2>
      </div>
      {{ props.show.name }}
    </div>
  </div>
</template>
