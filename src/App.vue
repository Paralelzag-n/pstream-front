<script lang="ts" setup>
import SlideshowComponent from "./components/slideshow/SlideshowComponent.vue";
import {ref} from "vue";

const shows = ref([
  {
    name: 'Alice in Borderland',
    imageUrl: 'https://thekeegshow.com/wp-content/uploads/2022/12/Alice-in-Borderland_poster_2.jpg',
    loadVideo: () => import('./assets/videos/Alice_in_borderland.mp4'),
    releaseDate: '2020',
    seasons: 2,
    rating: '8.2',
    genre: 'Thriller',
    duration: '50' // Average duration per episode or total runtime
  },
  {
    name: 'Arcane',
    imageUrl: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8739d07baed7d77d/5ed9b1c197379739c07664d9/Arcane_Announcement_Banner.jpg',
    loadVideo: () => import('./assets/videos/Arcane.mp4'),
    releaseDate: '2021',
    seasons: 1,
    rating: '9.0',
    genre: 'Action',
    duration: '40'
  },
  {
    name: 'Your Name',
    imageUrl: 'https://cdn.wisata.app/diary/46d6fad0-2b96-429c-ac6c-25c57ead6e3e.jpg',
    loadVideo: () => import('./assets/videos/your_name.mp4'),
    releaseDate: '2016',
    seasons: 1,
    rating: '8.4',
    genre: 'Romance',
    duration: '106' // Total runtime for movies
  },
  {
    name: 'Bojack Horseman',
    imageUrl: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/12/bojack-horseman-protagonist.jpg',
    loadVideo: () => import('./assets/videos/bojack.mp4'),
    releaseDate: '2014',
    seasons: 6,
    rating: '8.7',
    genre: 'Comedy-drama',
    duration: '25'
  },
  {
    name: 'Rick and Morty',
    imageUrl: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10376284_b_h9_aa.jpg',
    loadVideo: () => import('./assets/videos/rick_and_morty.mp4'),
    releaseDate: '2013',
    seasons: 5,
    rating: '9.2',
    genre: 'Sci-Fi',
    duration: '22',
  }
]);
</script>

<template>
  <main class="bg-dark-blue pt-10 min-h-[100vh]">
    <SlideshowComponent :shows="shows"/>
    <RouterView />
  </main>
</template>

<style scoped></style>
