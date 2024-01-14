<script setup lang="ts">
import {computed, ref} from 'vue';
import SlideshowItemComponent from "./SlideshowItemComponent.vue";
const slideshowContainerRef = ref<HTMLElement|null>(null)

const currentShow = ref<number>(0)
const nextShow = computed(()=> currentShow.value + 1 < shows.value.length ? currentShow.value + 1 : 0)
const previousShow = computed(()=> currentShow.value - 1 !== -1 ? currentShow.value - 1 : shows.value.length - 1)
const nextNextShow = computed(() => {
  let nextNextShow = nextShow.value + 1;
  return nextNextShow < shows.value.length ? nextNextShow : 0;
});
const previousPreviousImage = computed(() => {
  let previousPreviousIndex = previousShow.value - 1;
  return previousPreviousIndex >= 0 ? previousPreviousIndex : shows.value.length - 1;
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

const shows = ref([
  {
    name: 'Alice in Borderland',
    imageUrl: 'https://thekeegshow.com/wp-content/uploads/2022/12/Alice-in-Borderland_poster_2.jpg',
    releaseDate: '2020',
    seasons: 2,
    rating: '8.2',
    genre: 'Thriller',
    duration: '50 min' // Average duration per episode or total runtime
  },
  {
    name: 'Arcane',
    imageUrl: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8739d07baed7d77d/5ed9b1c197379739c07664d9/Arcane_Announcement_Banner.jpg',
    releaseDate: '2021',
    seasons: 1,
    rating: '9.0',
    genre: 'Animation',
    duration: '40 min'
  },
  {
    name: 'Your Name',
    imageUrl: 'https://cdn.wisata.app/diary/46d6fad0-2b96-429c-ac6c-25c57ead6e3e.jpg',
    releaseDate: '2016',
    seasons: 1,
    rating: '8.4',
    genre: 'Anime',
    duration: '106 min' // Total runtime for movies
  },
  {
    name: 'Bojack Horseman',
    imageUrl: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/12/bojack-horseman-protagonist.jpg',
    releaseDate: '2014',
    seasons: 6,
    rating: '8.7',
    genre: 'Animated Comedy',
    duration: '25 min'
  },
  {
    name: 'Rick and Morty',
    imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10376284_b_h9_aa.jpg',
    releaseDate: '2013',
    seasons: 5,
    rating: '9.2',
    genre: 'Sci-Fi Comedy',
    duration: '22 min'
  }
]);

function viewPreviousShow(){
  if(!transitionInProgress.value){
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = -computedImageWidth.value - 8
    setTimeout(()=>{
      transitionInProgress.value = false
      currentShow.value = currentShow.value - 1 === -1 ? shows.value.length - 1 : currentShow.value - 1
      animateSlideshowTranslateX.value = 0
    }, 550)
  }
}

function viewNextShow(){
  if(!transitionInProgress.value) {
    transitionInProgress.value = true
    animateSlideshowTranslateX.value = computedImageWidth.value + 8
    setTimeout(() => {
      transitionInProgress.value = false
      currentShow.value = currentShow.value + 1 < shows.value.length ? currentShow.value + 1 : 0
      animateSlideshowTranslateX.value = 0
    }, 550)
  }
}
</script>

<template>
  <div class="relative h-slideshow overflow-hidden" ref="slideshowContainerRef">
    <div class="h-slideshow flex absolute top-0 left-0 gap-4" :class="{'transition-all duration-500': transitionInProgress}" :style="{'transform': `translateX(${-computedTranslateX}px)`}">
      <!-- Previous Previous Image -->
      <SlideshowItemComponent :show="shows[previousPreviousImage]" :slideshow-image-width="slideshowImageWidth"/>
      <!-- Previous Image -->
      <SlideshowItemComponent @click="viewPreviousShow" :show="shows[previousShow]" :slideshow-image-width="slideshowImageWidth" />
      <!-- Main Image -->
      <SlideshowItemComponent :show="shows[currentShow]" :slideshow-image-width="slideshowImageWidth"/>
      <!-- Next Image -->
      <SlideshowItemComponent @click="viewNextShow" :show="shows[nextShow]" :slideshow-image-width="slideshowImageWidth"/>
      <!-- Next Next Image -->
      <SlideshowItemComponent :show="shows[nextNextShow]" :slideshow-image-width="slideshowImageWidth"/>
    </div>
  </div>
</template>
