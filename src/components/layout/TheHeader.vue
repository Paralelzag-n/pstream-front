<script lang="ts" setup>
import BaseIcon from "../base/BaseIcon.vue";
import { EColor } from "../../ts/enums/color.enum.ts";
import { useRouter } from "vue-router";
import { useWindowScroll } from "@vueuse/core";
import { ref, watch } from "vue";

const router = useRouter();

const { y } = useWindowScroll();
const headerVisible = ref<boolean>(false);

watch(y, (newValue, oldValue) => {
  if (!newValue || !oldValue) return;
  headerVisible.value = newValue >= oldValue;
});
</script>

<template>
  <header
    class="h-20 flex items-center justify-between px-20 fixed top-0 left-0 z-50 bg-dark-blue w-screen transition duration-[0.4s]"
    :class="{ '-translate-y-full': headerVisible }"
  >
    <div class="flex relative cursor-pointer text-purple">
      <BaseIcon
        :color="EColor.purple"
        :size="58"
        class="relative"
        name="ClapperIcon"
      />
      <h2 class="text-white absolute top-3 -left-4">PStream</h2>
    </div>
    <nav class="mr-80">
      <ul class="flex gap-8 text-white text-lg">
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <h4>Home</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <h4>Movies</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <h4>TV Shows</h4>
          </div>
        </li>
        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <h4>Recently Added</h4>
          </div>
        </li>

        <li class="cursor-pointer header_item">
          <div class="flex items-center gap-2">
            <h4>My List</h4>
          </div>
        </li>
      </ul>
    </nav>
    <div class="flex items-center gap-7">
      <div class="header_item cursor-pointer">
        <BaseIcon :size="21" color="white" name="SearchIcon" />
      </div>
      <div
        class="text-white bg-purple rounded-xl cursor-pointer border-[3px] border-dark-blue mx-2 px-3 py-1.5 outline-2 transition-all duration-300 ease outline outline-dark-blue hover:outline-purple"
      >
        <h3 class="text-base">Subscribe for 8 $</h3>
      </div>
      <div class="header_item cursor-pointer">
        <BaseIcon :size="21" color="white" name="BellIcon" />
      </div>
      <div
        class="text-white flex items-center gap-3 cursor-pointer header_item"
        @click="router.push({ name: 'sign-in' })"
      >
        <h3>Log in</h3>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header_item {
  transition: all 0.2s ease;
  color: white;

  &:hover {
    color: #9747fc;
  }
}
</style>
