<script lang="ts" setup>
import { ref } from "vue";
import SlideshowComponent from "../components/slideshow/SlideshowComponent.vue";
import ShowsComponent from "../components/shows/showsComponent.vue";

const shows = ref([
  {
    name: "Arcane",
    imageUrl:
      "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8739d07baed7d77d/5ed9b1c197379739c07664d9/Arcane_Announcement_Banner.jpg",
    loadVideo: () => import("../assets/videos/Arcane.mp4"),
    releaseDate: "2021",
    seasons: 1,
    rating: "9.0",
    genre: "Action",
    duration: "40",
  },
  {
    name: "Alice in Borderland",
    imageUrl:
      "https://thekeegshow.com/wp-content/uploads/2022/12/Alice-in-Borderland_poster_2.jpg",
    loadVideo: () => import("../assets/videos/Alice_in_borderland.mp4"),
    releaseDate: "2020",
    seasons: 2,
    rating: "8.2",
    genre: "Thriller",
    duration: "50",
  },
  {
    name: "Your Name",
    imageUrl: "https://wallpaperaccess.com/full/130467.png",
    loadVideo: () => import("../assets/videos/your_name.mp4"),
    releaseDate: "2016",
    seasons: 1,
    rating: "8.4",
    genre: "Romance",
    duration: "106", // Total runtime for movies
  },
  {
    name: "Weathering with you",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:3840/format:webp/1*3UfsMUAyT9jDQqnSP6aprQ.png",
    loadVideo: () => import("../assets/videos/your_name.mp4"),
    releaseDate: "2016",
    seasons: 1,
    rating: "8.4",
    genre: "Romance",
    duration: "106", // Total runtime for movies
  },
  {
    name: "Weathering with you",
    imageUrl:
      "https://pic-bstarstatic.akamaized.net/ugc/83c8985f73c7a04a111c5fbafbe689f9.jpg",
    loadVideo: () => import("../assets/videos/your_name.mp4"),
    releaseDate: "2016",
    seasons: 1,
    rating: "8.4",
    genre: "Romance",
    duration: "106", // Total runtime for movies
  },
]);
</script>

<template>
  <SlideshowComponent :shows="shows" />
  <div class="px-40 py-10">
    <ShowsComponent :shows="shows" title="Recommended for you" />
  </div>
</template>

<style scoped></style>