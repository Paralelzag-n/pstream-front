<script lang="ts" setup>
import BaseIcon from "../base/BaseIcon.vue";
import { EColor } from "../../ts/enums/color.enum.ts";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <header class="h-24 flex items-center justify-between px-24 pt-3">
    <div class="flex relative cursor-pointer text-purple">
      <BaseIcon
        :color="EColor.purple"
        :size="58"
        class="relative"
        name="ClapperIcon"
      />
      <h2 class="text-white absolute top-3 -left-4">PStream</h2>
    </div>
    <nav class="mr-44">
      <ul class="flex gap-8 text-white text-lg">
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <BaseIcon :size="20" color="white" name="ClapperIcon" />
            <h4>Home</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <BaseIcon :size="17" color="white" name="MovieIcon" />
            <h4>Movies</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <BaseIcon :size="18" color="white" name="TVShowIcon" />
            <h4>TV Shows</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <BaseIcon :size="19" color="white" name="FireIcon" />
            <h4>Recently Added</h4>
          </div>
        </li>

        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <BaseIcon :size="17" color="white" name="ListIcon" />
            <h4>My List</h4>
          </div>
        </li>
      </ul>
    </nav>
    <div class="flex items-center gap-7">
      <div class="header_item cursor-pointer">
        <BaseIcon :size="22" color="white" name="SearchIcon" />
      </div>
      <div
        class="text-white bg-purple rounded-xl cursor-pointer border-[3px] border-dark-blue mx-2 px-3 py-1.5 outline-2 transition-all duration-300 ease-in-out outline outline-dark-blue hover:outline-purple"
      >
        <h3 class="text-base">Month for 8 $</h3>
      </div>
      <div class="header_item cursor-pointer">
        <BaseIcon :size="22" color="white" name="BellIcon" />
      </div>
      <div
        class="text-white flex items-center gap-3 cursor-pointer header_item"
        @click="router.push({ name: 'sign-in' })"
      >
        <BaseIcon :size="24" color="white" name="UserCircleIcon" />
        <h3>Log in</h3>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header_item {
  transition: all 0.2s ease-in-out;
  color: white;

  &:hover {
    color: #9747fc;
  }
}
</style>
