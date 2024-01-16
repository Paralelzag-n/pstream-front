<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";

const props = defineProps<{
  slideshowImageWidth: number,
  mainSlideshow?: boolean
  muteVideo: boolean
  show: any
}>()

const videoRef = ref<HTMLVideoElement|null>(null)
const videoReady = ref<boolean>(false);
const showCover = ref<boolean>(true)

watch(() => props.show, async () => {
  videoReady.value = false;
  showCover.value = true;

  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.src = "";
  }

  await loadVideo();
}, { immediate: true });

async function loadVideo() {
  if(props.mainSlideshow){
    if (videoRef.value) {
      try {
        const videoSrc = await props.show.loadVideo();
        videoRef.value.src = videoSrc.default;
        videoRef.value.load();
        videoRef.value.oncanplaythrough = () => {
          setTimeout(()=>{
            videoReady.value = true;
            if(videoRef.value) videoRef.value.play();
            setTimeout(()=>{
              showCover.value = false
            }, 500)
          }, 3000)
        };
      } catch (error) {
        console.error("Error loading video:", error);
      }
    }
  }
}

onMounted(async () => {
  await loadVideo()
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.removeAttribute('src');
    videoRef.value.src = "";
  }
});
</script>

<template>
  <div class="rounded-3xl overflow-hidden cursor-pointer h-full shrink-0 border-solid border-2 border-grayish-blue/10 relative group" :style="{'width': `${props.slideshowImageWidth}%`}">
    <img v-show="showCover" :src="props.show.imageUrl" alt="image" class="h-full w-full object-cover transition-all duration-500" :class="{'opacity-100': !videoReady, 'opacity-0': videoReady}">
    <img v-if="videoReady && props.muteVideo" src="../../assets/svg/mute.svg" alt="muteBTN" class="absolute z-10 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-500/75 to-indigo-700/75 transition-all group-hover:scale-110 w-20 h-20 rounded-full p-5">
    <video ref="videoRef" class="w-full h-full object-cover" :muted="props.muteVideo">
      <source type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="absolute bottom-0 left-0 flex flex-col gap-3 w-full bg-black-to-transparent p-10 transition-all" :class="{'opacity-100': !videoReady, 'opacity-0': videoReady}">
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

