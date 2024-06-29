<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { useMovieStore } from "../../store/movie.store";
import { computed, onMounted, ref, onUnmounted, watch } from "vue";

const movieStore = useMovieStore();
const movies = computed(() => movieStore.getAllMovies);
const singleShowRef = ref<HTMLElement | null>(null);
const videoRef = ref<any>(null);
const videoShouldPlay = ref<Boolean>(false);
const videoMuted = ref<boolean>(true);

const { height: singleShowHeight } = useElementSize(singleShowRef);
const bookmarked = ref<boolean>(false);

const fadeAnimation = ref<boolean>(false);
const computedBookmarkClasses = computed(() => ({
  "fa-bookmark text-white fa-regular": !bookmarked.value,
  "fa-bookmark text-white fa-solid": bookmarked.value,
}));

const currentMovieIndex = ref<number>(0);
let videoTimeOut: number;
let progressInterval: number;
let progressBarWidth = ref<string>("100%");
const setVideoTimeout = () => {
  let remainingTime = 3000;
  videoTimeOut = setTimeout(() => {
    clearInterval(progressInterval);

    videoShouldPlay.value = true;
  }, remainingTime);
  progressInterval = setInterval(() => {
    remainingTime -= 100;
    progressBarWidth.value = `${(remainingTime / 2000) * 100}%`;
  }, 100);
};
onMounted(() => {
  // Set timeout for the initial movie

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // Component is in view, set the timeout
      setVideoTimeout();
      videoRef.value.play();
    } else {
      // Component is out of view, clear the timeout
      if (videoRef.value) {
        videoRef.value.pause();
      }
      clearTimeout(videoTimeOut);
    }
  });

  if (singleShowRef.value) {
    observer.observe(singleShowRef.value);
  }
});

onUnmounted(() => {
  // Clear the timeout on component unmount
  clearTimeout(videoTimeOut);
});

const selectedMovie = ref(movies.value[0]);

const navigateMovies = (backwards: boolean): void => {
  if (backwards) {
    if (currentMovieIndex.value === 0) {
      clearTimeout(videoTimeOut);
      setVideoTimeout();
      return;
    }
    videoShouldPlay.value = false;

    currentMovieIndex.value = currentMovieIndex.value - 1;
    selectedMovie.value = movies.value[currentMovieIndex.value];
    fadeAnimation.value = true;
    clearTimeout(videoTimeOut);
  } else {
    if (currentMovieIndex.value === movies.value.length - 1) {
      clearTimeout(videoTimeOut);
      setVideoTimeout();
      return;
    }
    videoShouldPlay.value = false;

    currentMovieIndex.value++;
    selectedMovie.value = movies.value[currentMovieIndex.value];
    fadeAnimation.value = true;
    clearTimeout(videoTimeOut);
  }
  setVideoTimeout();
};
watch(fadeAnimation, () => {
  if (fadeAnimation.value)
    setTimeout(() => (fadeAnimation.value = false), 1000);
});
</script>

<template>
  <div ref="singleShowRef" class="relative overflow-hidden rounded-3xl">
    <div
      :style="{ height: `${singleShowHeight}px` }"
      class="flex flex-col justify-end absolute pl-10 pb-10 bg-black-to-transparent-horizontal z-20 gap-10"
    >
      <h1 class="text-[5rem] text-white">
        {{ selectedMovie.name }}
      </h1>
      <div class="flex gap-4 items-center">
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-calendar" />
          {{ selectedMovie.releaseDate }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-masks-theater" />
          {{ selectedMovie.genre }}
        </h2>
        <i class="fa-solid fa-circle text-unfocused text-[5px]" />
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-clock" />{{ selectedMovie.duration }}
        </h2>
        <h2 class="body-m flex items-center gap-1">
          <i class="fa-solid fa-star" />{{ selectedMovie.rating }}
        </h2>
      </div>
      <div class="flex items-center gap-4">
        <button class="frosted-glass px-4 py-1 text-white rounded-lg">
          Details
        </button>
        <i
          @click="bookmarked = !bookmarked"
          :class="computedBookmarkClasses"
          class="cursor-pointer w-5 h-5 frosted-glass flex items-center justify-center p-4 rounded-full"
        ></i>
        <div class="flex gap-2">
          <button @click="navigateMovies(true)" :disabled="fadeAnimation">
            <i
              class="fa-solid text-white fa-backward-step cursor-pointer w-5 h-5 frosted-glass flex items-center justify-center p-4 rounded-full"
            ></i>
          </button>
          <button @click="navigateMovies(false)" :disabled="fadeAnimation">
            <i
              class="fa-solid text-white fa-forward-step cursor-pointer w-5 h-5 frosted-glass flex items-center justify-center p-4 rounded-full"
            ></i>
          </button>
        </div>
        <i
          v-if="videoMuted && videoShouldPlay"
          @click="videoMuted = false"
          class="fa-solid p-2 cursor-pointer frosted-glass rounded-full text-white fa-volume-xmark"
        ></i>
        <i
          v-if="!videoMuted && videoShouldPlay"
          @click="videoMuted = true"
          class="fa-solid p-2 cursor-pointer frosted-glass rounded-full text-white fa-volume-high"
        ></i>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
        </div>
      </div>
    </div>
    <img
      :class="fadeAnimation ? 'fade-in-out' : ''"
      v-if="!videoShouldPlay"
      class="rounded-3xl object-cover h-[500px] w-full"
      :src="selectedMovie.imageUrl"
      alt=""
    />
    <video
      ref="videoRef"
      v-if="videoShouldPlay"
      @ended="videoShouldPlay = false"
      autoplay
      :muted="videoMuted"
      class="rounded-3xl object-cover h-[500px] w-full"
      src="../../assets/videos//cute_cat.mp4"
    ></video>
  </div>
</template>

<style scoped>
.fade-in-out {
  animation: fadeInOut 1s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
