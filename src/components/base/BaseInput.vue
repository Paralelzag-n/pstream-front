<script setup lang="ts">
import { ValidationRule } from "../../utils/validators";
import { computed, ref } from "vue";

const props = defineProps<{
  rules?: ValidationRule[];
  label: string;
}>();

const inputValue = ref("");
const inputRef = ref<HTMLElement | null>(null);
const isFocused = ref<boolean>(false);
const hasInteracted = ref<boolean>(false);

const validationErrors = computed(() => {
  if (!hasInteracted.value || !props.rules) {
    return [];
  }

  return props.rules
    .map((rule) => rule(inputValue.value))
    .filter((result) => result !== true);
});

function handleFocus(value: boolean) {
  isFocused.value = value;
}

function handleChange() {
  hasInteracted.value = true;
}
</script>

<template>
  <div class="flex flex-col gap-2 pb-6">
    <div class="relative">
      <h3
        class="text-sm text-white/50 absolute transition-all p-2"
        :class="{
          '-top-2 text-white/0 ': isFocused || inputValue.length > 0,
          'top-1/2 -translate-y-1/2': !isFocused && inputValue.length <= 0,
        }"
      >
        {{ props.label }}
      </h3>
      <div class="flex">
        <!-- Prepend Slot -->
        <div class="flex items-center">
          <slot name="prepend"></slot>
        </div>

        <!-- Input Field -->
        <div class="flex-grow min-w-0">
          <input
            v-model="inputValue"
            ref="inputRef"
            class="w-full bg-transparent outline-0 text-white p-2 font-light text-[15px]"
            @click="handleFocus(true)"
            @blur="handleFocus(false)"
            @input="handleChange"
          />
        </div>

        <!-- Append Slot -->
        <div class="flex items-center">
          <slot name="append"></slot>
        </div>
      </div>

      <!--  Underline  -->
      <div class="absolute bottom-0 translate-y-full h-0.5 w-full">
        <div class="absolute bg-grayish-blue/25 z-10 w-full h-full"></div>
        <transition-group name="focus-transition">
          <div
            v-if="
              (isFocused || inputValue.length > 0) &&
              validationErrors.length <= 0
            "
            class="absolute z-20 w-full h-full bg-white"
          />
          <div
            v-if="validationErrors.length > 0"
            class="absolute z-30 w-full h-full bg-purple"
          />
        </transition-group>
      </div>
    </div>

    <!--  Errors  -->
    <div class="text-purple text-sm h-0">
      {{ validationErrors[0] }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes grow-x {
  from {
    transform: scaleX(0);
    transform-origin: center;
  }
  to {
    transform: scaleX(1);
    transform-origin: center;
  }
}
@keyframes shrink-x {
  from {
    transform: scaleX(1);
    transform-origin: center;
  }
  to {
    transform: scaleX(0);
    transform-origin: center;
  }
}
.focus-transition-enter-active {
  animation: grow-x 0.2s ease-out forwards;
}
.focus-transition-leave-active {
  animation: shrink-x 0.2s ease-out forwards;
}
</style>
