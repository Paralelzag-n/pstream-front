<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const dynamicComponent = computed(() =>
  defineAsyncComponent(() => import(`../icons/${props.name}.vue`)),
);
</script>

<template>
  <component :is="dynamicComponent" :color="props.color" :size="props.size" />
</template>
