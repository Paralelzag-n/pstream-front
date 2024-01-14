<script lang="ts" setup>
import SlideshowComponent from "./components/slideshow/SlideshowComponent.vue";
import {ref} from "vue";

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
</script>

<template>
  <main class="bg-dark-blue min-h-[100vh]">
    <SlideshowComponent :shows="shows"/>
    <RouterView />
  </main>
</template>

<style scoped></style>
