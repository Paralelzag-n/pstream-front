<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    :class="`w-[${props.size}px] h-[${props.size}px]`"
    class="d-flex flex-column justify-center"
  >
    <svg
      :height="props.size"
      :width="props.size"
      fill="none"
      viewBox="0 0 33 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.4628 0.408386L29.6628 6.80839H24.8628L21.6628 0.408386H18.4628L21.6628 6.80839H16.8628L13.6628 0.408386H10.4628L13.6628 6.80839H8.86279L5.66279 0.408386H4.06279C2.29479 0.408386 0.878793 1.84039 0.878793 3.60839L0.862793 22.8084C0.862793 24.5764 2.29479 26.0084 4.06279 26.0084H29.6628C31.4308 26.0084 32.8628 24.5764 32.8628 22.8084V0.408386H26.4628Z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>
