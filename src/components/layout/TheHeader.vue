<script lang="ts" setup>
import BaseIcon from "../base/BaseIcon.vue";
import { EColor } from "../../ts/enums/color.enum.ts";
</script>

<template>
  <header class="h-24 flex items-center px-24">
    <div class="flex relative cursor-pointer">
      <BaseIcon
        :color="EColor.purple"
        :size="58"
        class="relative"
        name="LogoIcon"
      />
      <h2 class="text-white absolute top-3 -left-4">PStream</h2>
    </div>
  </header>
</template>
