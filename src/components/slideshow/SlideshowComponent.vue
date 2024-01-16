<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import SlideshowItemComponent from "./SlideshowItemComponent.vue";
const slideshowContainerRef = ref<HTMLElement|null>(null)

const props = defineProps<{
  shows: any
}>()

const currentShow = ref<number>(0)
const videosMuted = ref<boolean>(true)
const nextShow = computed(()=> currentShow.value + 1 < props.shows.length ? currentShow.value + 1 : 0)
const previousShow = computed(()=> currentShow.value - 1 !== -1 ? currentShow.value - 1 : props.shows.length - 1)
const nextNextShow = computed(() => {
  let nextNextShow = nextShow.value + 1;
  return nextNextShow < props.shows.length ? nextNextShow : 0;
});
const previousPreviousShow = computed(() => {
  let previousPreviousIndex = previousShow.value - 1;
  return previousPreviousIndex >= 0 ? previousPreviousIndex : props.shows.length - 1;
});
const slideshowImageWidth = ref<number>(50) // in percentage
const computedImageWidth = computed(()=>{
 if(slideshowContainerRef.value) return slideshowContainerRef.value.offsetWidth * slideshowImageWidth.value / 100
  return 0
})

const slideshowChange = ref(0);
const slideInterval = ref<any>(null);

function startSlideShow() {
  slideInterval.value = setInterval(viewNextShow, 60000);
}

function resetAndStartSlideshow() {
  clearInterval(slideInterval.value);
  startSlideShow();
}

const transitionInProgress = ref<boolean>(false)
const animateSlideshowTranslateX = ref<number>(0)
const computedTranslateX = computed(()=>{
  return computedImageWidth.value * 2 - computedImageWidth.value * 0.5 + 16 + animateSlideshowTranslateX.value
})

function viewPreviousShow(){
  slideshowChange.value++
  if(!transitionInProgress.value){
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = -computedImageWidth.value - 8
    setTimeout(()=>{
      transitionInProgress.value = false
      currentShow.value = currentShow.value - 1 === -1 ? props.shows.length - 1 : currentShow.value - 1
      animateSlideshowTranslateX.value = 0
    }, 1200)
    resetAndStartSlideshow()
  }
}
function viewNextShow(){
  slideshowChange.value++
  if(!transitionInProgress.value) {
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = computedImageWidth.value + 8
    setTimeout(() => {
      transitionInProgress.value = false
      currentShow.value = currentShow.value + 1 < props.shows.length ? currentShow.value + 1 : 0
      animateSlideshowTranslateX.value = 0
    }, 1200)
    resetAndStartSlideshow()
  }
}

function toggleMute(){
  videosMuted.value = !videosMuted.value
}

onMounted(() => {
  startSlideShow();
});

onUnmounted(() => {
  clearInterval(slideInterval.value);
});

const slideShowHovering = ref<boolean>(false)
function toggleHoveringSlideshow(value: boolean){
  slideShowHovering.value = value
}
</script>

<template>
  <div class="relative h-slideshow overflow-hidden" ref="slideshowContainerRef" @mouseenter="toggleHoveringSlideshow(true)" @mouseleave="toggleHoveringSlideshow(false)">
    <div class="h-slideshow flex absolute top-0 left-0 gap-4" :class="{'transition-all duration-1000': transitionInProgress}" :style="{'transform': `translateX(${-computedTranslateX}px)`}">
      <!-- Previous Previous Image -->
      <SlideshowItemComponent :mute-video="videosMuted" :key="props.shows[previousPreviousShow].name" :show="props.shows[previousPreviousShow]" :slideshow-image-width="slideshowImageWidth" class="brightness-50" />
      <!-- Previous Image -->
      <SlideshowItemComponent :mute-video="videosMuted" :key="props.shows[previousShow].name" @click="viewPreviousShow" :show="props.shows[previousShow]" :slideshow-image-width="slideshowImageWidth" :class="{'brightness-100': animateSlideshowTranslateX < 0, 'brightness-50': animateSlideshowTranslateX >= 0}"/>
      <!-- Main Image -->
      <SlideshowItemComponent :slideshowChange="slideshowChange" @click="toggleMute" :mute-video="videosMuted" :key="props.shows[currentShow].name" class="shadow-2xl" :show="props.shows[currentShow]" :slideshow-image-width="slideshowImageWidth" :main-slideshow="true" :class="{'brightness-50 transition duration-500': animateSlideshowTranslateX !== 0, 'brightness-100':animateSlideshowTranslateX === 0}"/>
      <!-- Next Image -->
      <SlideshowItemComponent :mute-video="videosMuted" :key="props.shows[nextShow].name" @click="viewNextShow" :show="props.shows[nextShow]" :slideshow-image-width="slideshowImageWidth" :class="{'brightness-100': animateSlideshowTranslateX > 0, 'brightness-50': animateSlideshowTranslateX <= 0 }"/>
      <!-- Next Next Image -->
      <SlideshowItemComponent :mute-video="videosMuted" :key="props.shows[nextNextShow].name" :show="props.shows[nextNextShow]" :slideshow-image-width="slideshowImageWidth" class="brightness-50"/>
    </div>
    <div @click="viewPreviousShow" :class="{'opacity-0': !slideShowHovering, 'opacity-100': slideShowHovering}" class="absolute top-1/2 duration-300 -translate-y-1/2 left-10 transition-all cursor-pointer bg-gradient-to-br from-indigo-500/75 to-indigo-700/75 hover:scale-110 text-white font-bold py-7 px-6 rounded-md shadow-md select-none"> &lt </div>
    <div @click="viewNextShow" :class="{'opacity-0': !slideShowHovering, 'opacity-100': slideShowHovering}" class="absolute top-1/2 duration-300 -translate-y-1/2 right-10 transition-all cursor-pointer bg-gradient-to-br from-indigo-500/75 to-indigo-700/75 hover:scale-110 text-white font-bold py-7 px-6 rounded-md shadow-md select-none"> > </div>
  </div>
</template>
