<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  slideshowImageWidth: number;
  mainSlideshow?: boolean;
  slideshowChange?: number;
  isScrolledPast?: boolean;
  muteVideo: boolean;
  show: any;
}>();
const emit = defineEmits(["muteVideo", "onVideoEnd"]);

const videoRef = ref<HTMLVideoElement | null>(null);
const videoReady = ref<boolean>(false);
const showCover = ref<boolean>(true);

const playVideoTimeout = ref<any>(null);
const timeToStartVideo = 3500;

watch(
  () => props.slideshowChange,
  async () => {
    showCover.value = true;
    setTimeout(async () => {
      videoReady.value = false;
      if (videoRef.value) {
        unloadAndStopVideo();
        await loadVideo();
      }
    });
  },
  { immediate: true }
);

watch(
  () => props.isScrolledPast,
  (value) => {
    if (value) {
      if (videoRef.value && !showCover.value) {
        videoRef.value.pause();
      }
    } else {
      if (videoRef.value && !showCover.value) {
        videoRef.value.play();
      }
    }
  }
);

async function loadVideo() {
  if (props.mainSlideshow) {
    if (videoRef.value) {
      try {
        const videoSrc = await props.show.loadVideo();
        videoRef.value.src = videoSrc.default;
        videoRef.value.load();
        videoRef.value.oncanplaythrough = () => {
          playVideoTimeout.value = setTimeout(() => {
            videoReady.value = true;
            if (videoRef.value) videoRef.value.play();
            showCover.value = false;
          }, timeToStartVideo);
        };
      } catch (error) {
        console.error("Error loading video:", error);
      }
    }
  }
}

function unloadAndStopVideo() {
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.removeAttribute("src");
  }
}

function handleMuteVideo() {
  emit("muteVideo");
}

function handleVideoEnd() {
  emit("onVideoEnd");
}

function toggleSlideshowMode() {
  clearInterval(initialVideoStartIndicatorInterval);
  progress.value = 100;

  clearTimeout(playVideoTimeout.value);
  if (!showCover.value) {
    showCover.value = true;
    videoReady.value = false;
    setTimeout(async () => {
      if (videoRef.value) {
        videoRef.value.pause();
      }
    });
  } else {
    videoReady.value = true;
    showCover.value = false;
    if (videoRef.value) {
      videoRef.value.play();
    }
  }
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

let initialVideoStartIndicatorInterval: number;

function initialVideoStartIndicator(duration: number) {
  const startTime = Date.now();
  const actualDuration = duration;
  initialVideoStartIndicatorInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    progress.value = (elapsedTime / actualDuration) * 100;
    if (progress.value >= 100) {
      clearInterval(initialVideoStartIndicatorInterval);
      progress.value = 100;
    }
  }, 1000 / 60);
}

const progress = ref<number>(0);
const transitionSpeed = ref<number>(0.15);

const circleStyle = computed(() => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress.value / 100) * circumference;

  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
    transition: `stroke-dashoffset ${transitionSpeed.value}s`,
  };
});

onMounted(async () => {
  initialVideoStartIndicator(timeToStartVideo);
  await loadVideo();
});

onUnmounted(() => {
  unloadAndStopVideo();
});
</script>

<template>
  <div
    class="h-full rounded-3xl overflow-hidden shrink-0 border-solid relative group"
    :style="{ width: `${props.slideshowImageWidth}%` }"
  >
    <img
      v-show="showCover"
      :src="props.show.imageUrl"
      alt="image"
      class="rounded-3xl h-full w-full object-cover transition-all duration-500"
      :class="{ 'opacity-100': !videoReady, 'opacity-0': videoReady }"
    />

    <div class="bottom-0 right-0 m-8 absolute z-10 flex gap-2">
      <div class="group flex flex-col-reverse items-center">
        <i
          v-if="videoReady"
          @click="handleMuteVideo"
          style="backdrop-filter: blur(1rem)"
          :class="{
            'fa-volume-xmark': props.muteVideo,
            'fa-volume-high': !props.muteVideo,
          }"
          class="fa-solid cursor-pointer flex text-white items-center justify-center bg-gradient-to-br from-indigo-500/50 to-indigo-700/25 transition-all opacity-50 group-hover:opacity-100 hover:from-indigo-500/75 hover:to-indigo-700/50 w-10 h-10 rounded-full"
        />
      </div>

      <div class="relative flex justify-center items-center">
        <svg
          :class="{
            'progress-complete': progress >= 100 && mainSlideshow,
            'opacity-0': !props.mainSlideshow,
          }"
          class="progress-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width="56"
          height="56"
          viewBox="0 0 60 60"
        >
          <circle
            class="progress-ring__circle"
            :style="circleStyle"
            stroke="#9747FC"
            stroke-width="4"
            stroke-linecap="round"
            fill="transparent"
            r="28"
            cx="30"
            cy="30"
          />
        </svg>
        <i
          @click="toggleSlideshowMode"
          :class="{ 'fa-image': !showCover, 'fa-film': showCover }"
          class="fa-solid cursor-pointer text-white flex items-center justify-center bg-gradient-to-br from-indigo-500/50 to-indigo-700/25 transition-all opacity-50 group-hover:opacity-100 hover:from-indigo-500/75 hover:to-indigo-700/50 w-10 h-10 rounded-full z-10"
        ></i>
      </div>
    </div>

    <div class="relative bg-cover h-full bg-center vignette">
      <video
        @ended="handleVideoEnd"
        ref="videoRef"
        class="rounded-3xl w-full h-full object-cover"
        :muted="props.muteVideo"
      >
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div
      class="absolute bottom-0 select-none left-0 flex flex-col gap-3 w-full bg-black-to-transparent p-8 transition-all duration-500"
      :class="{
        'opacity-100': !videoReady,
        'opacity-0 group-hover:opacity-100': videoReady,
      }"
    >
      <h2 class="font-medium text-white">{{ props.show.name }}</h2>
      <div class="flex gap-3 items-center">
        <h2
          class="bg-gradient-to-br from-indigo-500/75 to-indigo-700/50 text-white rounded text-center text-lg flex gap-1 items-center px-1"
          style="backdrop-filter: blur(1rem)"
        >
          <i class="fa-solid fa-star text-sm"></i> {{ props.show.rating }}
        </h2>
        <h2 class="text-white text-lg flex items-center gap-1">
          <i class="fa-solid fa-calendar text-sm"></i>
          {{ props.show.releaseDate }}
        </h2>
        <h2 class="text-white text-lg flex items-center gap-1">
          <i class="fa-solid fa-masks-theater text-sm"></i
          >{{ props.show.genre }}
        </h2>
        <h2 class="text-white text-lg flex items-center gap-1">
          <i class="fa-solid fa-clock text-sm"></i
          >{{ computedFormattedDuration(props.show.duration) }}
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vignette::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: radial-gradient(
    ellipse at center,
    transparent,
    rgba(0, 0, 0, 0.5) 90%
  );
  pointer-events: none;
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 2px white);
  }
  100% {
    filter: drop-shadow(0 0 8px white);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.progress-complete {
  animation:
    glow 2s ease-in-out infinite alternate,
    fadeOut 2s ease forwards;
}
</style>
