<script lang="ts" setup>
import ShowsItemComponent from "./showsItemComponent.vue";

const props = defineProps<{
  title: string;
  shows: any;
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-white text-4xl font-light">{{ props.title }}</h3>
    <div class="grid grid-cols-3 gap-4">
      <ShowsItemComponent
        v-for="show in props.shows"
        :key="show.name"
        :minified="true"
        :show="show"
      />
    </div>
  </div>
</template>