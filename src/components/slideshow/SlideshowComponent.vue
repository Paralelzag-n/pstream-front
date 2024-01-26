<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import SlideshowItemComponent from "./SlideshowItemComponent.vue";
import { useElementBounding, useElementSize, useScroll } from "@vueuse/core";

const slideshowContainerRef = ref<HTMLElement | null>(null);
const { width: slideshowContainerWidth } = useElementSize(
  slideshowContainerRef,
);

const { y } = useScroll(window);
const { bottom } = useElementBounding(slideshowContainerRef);

const isScrolledPast = computed(() => y.value > bottom.value);
watch(isScrolledPast, (newValue) => {
  if (newValue) {
    stopSlideShow();
  } else {
    startSlideShow();
  }
});

const props = defineProps<{
  shows: any;
}>();

const currentShow = ref<number>(0);
const videosMuted = ref<boolean>(true);
const nextShow = computed(() =>
  currentShow.value + 1 < props.shows.length ? currentShow.value + 1 : 0,
);
const previousShow = computed(() =>
  currentShow.value - 1 !== -1 ? currentShow.value - 1 : props.shows.length - 1,
);
const nextNextShow = computed(() => {
  let nextNextShow = nextShow.value + 1;
  return nextNextShow < props.shows.length ? nextNextShow : 0;
});
const previousPreviousShow = computed(() => {
  let previousPreviousIndex = previousShow.value - 1;
  return previousPreviousIndex >= 0
    ? previousPreviousIndex
    : props.shows.length - 1;
});
const slideshowImageWidth = ref<number>(60); // in percentage
const computedImageWidth = computed(() => {
  if (slideshowContainerRef.value)
    return (slideshowContainerWidth.value * slideshowImageWidth.value) / 100;
  return 0;
});

const slideshowChange = ref(0);
const slideInterval = ref<any>(null);

function startSlideShow() {
  slideInterval.value = setInterval(viewNextShow, 60000);
}

function stopSlideShow() {
  if (slideInterval.value) {
    clearInterval(slideInterval.value);
    slideInterval.value = null;
  }
}

function resetAndStartSlideshow() {
  clearInterval(slideInterval.value);
  startSlideShow();
}

const transitionInProgress = ref<boolean>(false);
const animateSlideshowTranslateX = ref<number>(0);
const computedTranslateX = computed(() => {
  return (
    computedImageWidth.value * 2 -
    computedImageWidth.value * 0.315 +
    32 +
    animateSlideshowTranslateX.value
  );
});

function viewPreviousShow() {
  slideshowChange.value++;
  if (!transitionInProgress.value) {
    transitionInProgress.value = true;
    animateSlideshowTranslateX.value = -computedImageWidth.value - 16;
    setTimeout(() => {
      transitionInProgress.value = false;
      currentShow.value =
        currentShow.value - 1 === -1
          ? props.shows.length - 1
          : currentShow.value - 1;
      animateSlideshowTranslateX.value = 0;
    }, 720);
    resetAndStartSlideshow();
  }
}

function viewNextShow() {
  slideshowChange.value++;
  if (!transitionInProgress.value) {
    transitionInProgress.value = true;
    animateSlideshowTranslateX.value = computedImageWidth.value + 16;
    setTimeout(() => {
      transitionInProgress.value = false;
      currentShow.value =
        currentShow.value + 1 < props.shows.length ? currentShow.value + 1 : 0;
      animateSlideshowTranslateX.value = 0;
    }, 720);
    resetAndStartSlideshow();
  }
}

function toggleMute() {
  videosMuted.value = !videosMuted.value;
}

onMounted(() => {
  startSlideShow();
});

onUnmounted(() => {
  clearInterval(slideInterval.value);
});

const slideShowHovering = ref<boolean>(false);

function toggleHoveringSlideshow(value: boolean) {
  slideShowHovering.value = value;
}
</script>

<template>
  <div
    ref="slideshowContainerRef"
    class="relative h-slideshow overflow-hidden mt-6"
    @mouseenter="toggleHoveringSlideshow(true)"
    @mouseleave="toggleHoveringSlideshow(false)"
  >
    <div
      :class="{ 'transition-all duration-700': transitionInProgress }"
      :style="{ transform: `translateX(${-computedTranslateX}px)` }"
      class="h-slideshow flex absolute top-0 left-0 gap-4"
    >
      <!-- Previous Previous Image -->
      <SlideshowItemComponent
        :key="props.shows[previousPreviousShow].name"
        :mute-video="videosMuted"
        :show="props.shows[previousPreviousShow]"
        :slideshow-image-width="slideshowImageWidth"
        class="brightness-50"
      />
      <!-- Previous Image -->
      <SlideshowItemComponent
        :key="props.shows[previousShow].name"
        :class="{
          'brightness-100': animateSlideshowTranslateX < 0,
          'brightness-50': animateSlideshowTranslateX >= 0,
        }"
        :mute-video="videosMuted"
        :show="props.shows[previousShow]"
        :slideshow-image-width="slideshowImageWidth"
        class="cursor-pointer"
        @click="viewPreviousShow"
      />
      <!-- Main Image -->
      <SlideshowItemComponent
        :key="props.shows[currentShow].name"
        :class="{
          'brightness-50 transition duration-500':
            animateSlideshowTranslateX !== 0,
          'brightness-100': animateSlideshowTranslateX === 0,
        }"
        :isScrolledPast="isScrolledPast"
        :main-slideshow="true"
        :mute-video="videosMuted"
        :show="props.shows[currentShow]"
        :slideshow-image-width="slideshowImageWidth"
        :slideshowChange="slideshowChange"
        class="shadow-2xl"
        @muteVideo="toggleMute"
        @onVideoEnd="viewNextShow"
      />
      <!-- Next Image -->
      <SlideshowItemComponent
        :key="props.shows[nextShow].name"
        :class="{
          'brightness-100': animateSlideshowTranslateX > 0,
          'brightness-50': animateSlideshowTranslateX <= 0,
        }"
        :mute-video="videosMuted"
        :show="props.shows[nextShow]"
        :slideshow-image-width="slideshowImageWidth"
        class="cursor-pointer"
        @click="viewNextShow"
      />
      <!-- Next Next Image -->
      <SlideshowItemComponent
        :key="props.shows[nextNextShow].name"
        :mute-video="videosMuted"
        :show="props.shows[nextNextShow]"
        :slideshow-image-width="slideshowImageWidth"
        class="brightness-50"
      />
    </div>
    <div
      :class="{
        'opacity-0': !slideShowHovering,
        'opacity-100': slideShowHovering,
      }"
      class="absolute top-1/2 -translate-y-1/2 left-10 transition-all cursor-pointer rounded-lg shadow-md select-none group"
      @click="viewPreviousShow"
    >
      <div
        class="w-14 rounded-lg h-20 duration-300 bg-gradient-to-br from-indigo-500/50 to-indigo-700/40 group-hover:scale-125"
        style="backdrop-filter: blur(1rem)"
      />
      <i
        class="fa-solid fa-chevron-left absolute text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      ></i>
    </div>
    <div
      :class="{
        'opacity-0': !slideShowHovering,
        'opacity-100': slideShowHovering,
      }"
      class="absolute top-1/2 -translate-y-1/2 right-10 transition-all cursor-pointer rounded-lg shadow-md select-none group"
      @click="viewNextShow"
    >
      <div
        class="w-14 rounded-lg h-20 duration-300 bg-gradient-to-br from-indigo-500/50 to-indigo-700/40 group-hover:scale-125"
        style="backdrop-filter: blur(1rem)"
      />
      <i
        class="fa-solid fa-chevron-right absolute text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      ></i>
    </div>
  </div>
</template>
