<script setup lang="ts">
import {computed, ref} from 'vue';
const slideshowContainerRef = ref<HTMLElement|null>(null)

const currentImage = ref<number>(0)
const nextImage = computed(()=> currentImage.value + 1 < images.value.length ? currentImage.value + 1 : 0)
const previousImage = computed(()=> currentImage.value - 1 !== -1 ? currentImage.value - 1 : images.value.length - 1)
const nextNextImage = computed(() => {
  let nextNextIndex = nextImage.value + 1;
  return nextNextIndex < images.value.length ? nextNextIndex : 0;
});
const previousPreviousImage = computed(() => {
  let previousPreviousIndex = previousImage.value - 1;
  return previousPreviousIndex >= 0 ? previousPreviousIndex : images.value.length - 1;
});
const slideshowImageWidth = ref<number>(50) // in percentage



const computedImageWidth = computed(()=>{
 if(slideshowContainerRef.value) return slideshowContainerRef.value.offsetWidth * slideshowImageWidth.value / 100
  return 0
})

const transitionInProgress = ref<boolean>(false)
const animateSlideshowTranslateX = ref<number>(0)
const computedTranslateX = computed(()=>{
  return computedImageWidth.value * 2 - computedImageWidth.value * 0.5 + 8 + animateSlideshowTranslateX.value
})

const images = ref([
  'https://thekeegshow.com/wp-content/uploads/2022/12/Alice-in-Borderland_poster_2.jpg',
  'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8739d07baed7d77d/5ed9b1c197379739c07664d9/Arcane_Announcement_Banner.jpg',
  'https://cdn.wisata.app/diary/46d6fad0-2b96-429c-ac6c-25c57ead6e3e.jpg',
  'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/12/bojack-horseman-protagonist.jpg',
  'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10376284_b_h9_aa.jpg'
]);

function viewPreviousImage(){
  if(!transitionInProgress.value){
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = -computedImageWidth.value - 8
    setTimeout(()=>{
      transitionInProgress.value = false
      currentImage.value = currentImage.value - 1 === -1 ? images.value.length - 1 : currentImage.value - 1
      animateSlideshowTranslateX.value = 0
    }, 550)
  }
}

function viewNextImage(){
  if(!transitionInProgress.value) {
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = computedImageWidth.value + 8
    setTimeout(() => {
      transitionInProgress.value = false
      currentImage.value = currentImage.value + 1 < images.value.length ? currentImage.value + 1 : 0
      animateSlideshowTranslateX.value = 0
    }, 550)
  }
}
</script>

<template>
  <div class="relative h-slideshow overflow-hidden" ref="slideshowContainerRef">
    <div class="h-slideshow flex absolute top-0 left-0 gap-4" :class="{'transition-all duration-500': transitionInProgress}" :style="{'transform': `translateX(${-computedTranslateX}px)`}">

      <!-- Previous Previous Image -->
      <div class="rounded-2xl overflow-hidden h-full shrink-0 border-solid border-2 border-grayish-blue/10 group" :style="{'width': `${slideshowImageWidth}%`}">
        <img :src="images[previousPreviousImage]" alt="image" class="h-full w-full object-cover transition-all">
      </div>

      <!-- Previous Image -->
      <div @click="viewPreviousImage" class="rounded-2xl overflow-hidden h-full shrink-0 border-solid border-2 border-grayish-blue/10 group" :style="{'width': `${slideshowImageWidth}%`}">
        <img :src="images[previousImage]" alt="image" class="h-full w-full object-cover transition-all">
      </div>

      <!-- Main Image -->
      <div class="rounded-2xl overflow-hidden h-full shrink-0 border-solid border-2 border-grayish-blue/10" :style="{'width': `${slideshowImageWidth}%`}">
        <img :src="images[currentImage]" alt="image" class="h-full w-full object-cover transition-all">
      </div>

      <!-- Next Image -->
      <div @click="viewNextImage" class="rounded-2xl overflow-hidden h-full shrink-0 border-solid border-2 border-grayish-blue/10 group" :style="{'width': `${slideshowImageWidth}%`}">
        <img :src="images[nextImage]" alt="image" class="h-full w-full object-cover transition-all">
      </div>

      <!-- Next Next Image -->
      <div class="rounded-2xl overflow-hidden h-full shrink-0 border-solid border-2 border-grayish-blue/10 group" :style="{'width': `${slideshowImageWidth}%`}">
        <img :src="images[nextNextImage]" alt="image" class="h-full w-full object-cover transition-all">
      </div>

    </div>
  </div>
</template>
