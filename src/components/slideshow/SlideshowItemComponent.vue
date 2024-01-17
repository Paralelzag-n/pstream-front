<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";

const props = defineProps<{
  slideshowImageWidth: number,
  mainSlideshow?: boolean
  slideshowChange?: number
  isScrolledPast?: boolean
  muteVideo: boolean
  show: any
}>()
const emit = defineEmits(['muteVideo','onVideoEnd'])

const videoRef = ref<HTMLVideoElement|null>(null)
const videoReady = ref<boolean>(false);
const showCover = ref<boolean>(true)

watch(() => props.slideshowChange, async () => {
  showCover.value = true
  setTimeout(async ()=>{
    videoReady.value = false
    if (videoRef.value) {
      unloadAndStopVideo()
      await loadVideo();
    }
  })
}, { immediate: true });

watch(()=>props.isScrolledPast,(value)=>{
  if(value){
    if (videoRef.value) {
      videoRef.value.pause()
    }
  }else {
    if (videoRef.value) {
      videoRef.value.play()
    }
  }
})

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
            showCover.value = false
          }, 3000)
        };
      } catch (error) {
        console.error("Error loading video:", error);
      }
    }
  }
}

function unloadAndStopVideo(){
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.removeAttribute('src');
  }
}

function handleMuteVideo(){
  emit('muteVideo')
}

function handleVideoEnd(){
  emit('onVideoEnd')
}

onMounted(async () => {
  await loadVideo()
});

onUnmounted(() => {
  unloadAndStopVideo()
});
</script>

<template>
  <div class="h-full rounded-3xl overflow-hidden shrink-0 border-solid relative group" :style="{'width': `${props.slideshowImageWidth}%`}" >
    <img v-show="showCover" :src="props.show.imageUrl" alt="image" class="rounded-3xl h-full w-full object-cover transition-all duration-500" :class="{'opacity-100': !videoReady, 'opacity-0': videoReady}">
    <i v-if="videoReady" @click="handleMuteVideo" style="backdrop-filter: blur(1rem);" :class="{'fa-volume-xmark': props.muteVideo, 'fa-volume-high': !props.muteVideo}" class="fa-solid cursor-pointer bottom-0 right-0 m-10 flex text-white items-center justify-center absolute z-10 bg-gradient-to-br from-indigo-500/50 to-indigo-700/25 transition-all opacity-50 group-hover:opacity-100 hover:from-indigo-500/75 hover:to-indigo-700/50 w-10 h-10 rounded-full"/>
    <video @ended="handleVideoEnd" ref="videoRef" class="rounded-3xl w-full h-full object-cover" :muted="props.muteVideo">
      <source type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="absolute bottom-0 select-none left-0 flex flex-col gap-3 w-full bg-black-to-transparent p-10 transition-all duration-500" :class="{'opacity-100': !videoReady, 'opacity-0 group-hover:opacity-100': videoReady}">
      <h2 class="font-medium text-white">{{ props.show.name }}</h2>
      <div class="flex gap-2 items-center">
        <h2 class="bg-gradient-to-br from-indigo-500/75 to-indigo-700/50 text-white rounded w-12 text-center text-lg" style="backdrop-filter: blur(1rem);">{{props.show.rating}}</h2>
        <h2 class="text-white text-lg">{{props.show.releaseDate}}</h2>
        <h2 class="text-white text-lg">{{props.show.genre}}</h2>
        <h2 class="text-white text-lg">{{props.show.duration}}</h2>
      </div>
    </div>
  </div>
</template>

