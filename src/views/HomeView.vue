<script lang="ts" setup>
import { computed } from "vue";
import SlideshowComponent from "../components/slideshow/SlideshowComponent.vue";
import ShowsComponent from "../components/shows/showsComponent.vue";
import { useMovieStore } from "../store/movie.store";
import { EGenre } from "../enums/store/movie.enum";
import SingleShowComponent from "../components/shows/singleShowComponent.vue";

const movieStore = useMovieStore();

const computedFeaturedShows = computed(() => movieStore.getFeaturedMovies);

console.log(computedFeaturedShows);

const computedTVseries = computed(() =>
  movieStore.getMoviesByGenre(EGenre.Romance)
);
console.log(computedTVseries);

const computedCrimeMovies = computed(() =>
  movieStore.getMoviesByGenre(EGenre.Crime)
);

const computedActionMovies = computed(() =>
  movieStore.getMoviesByGenre(EGenre.Action)
);

console.log(computedActionMovies);

console.log(computedCrimeMovies);
</script>

<template>
  <SlideshowComponent :shows="computedFeaturedShows" />
  <div class="px-40 py-10">
    <ShowsComponent :shows="computedTVseries" title="Romance Movies" />
    <ShowsComponent :shows="computedCrimeMovies" title="Crime Movies" />
    <ShowsComponent :shows="computedActionMovies" title="Action Movies" />
    <SingleShowComponent></SingleShowComponent>
  </div>
</template>

<style scoped></style>
