<script setup lang="ts">
import { useRouter } from "vue-router";
import { email, password, required } from "../../utils/validators";
import BaseInput from "../base/BaseInput.vue";

const router = useRouter();
</script>

<template>
  <div
    class="w-96 bg-semi-dark-blue rounded-2xl flex flex-col justify-between p-8"
  >
    <h1 class="text-white text-3xl">Login</h1>
    <BaseInput :rules="[required, email]" label="Email" />
    <BaseInput :rules="[required, password]" label="Password" />

    <button class="outline-none text-white bg-purple py-4 text-md rounded-md">
      Login to your account
    </button>

    <div class="text-white flex items-center justify-center gap-2">
      <p>Don't have an account?</p>
      <p
        @click="router.push({ name: 'sign-up' })"
        class="text-[#9747FC] cursor-pointer"
      >
        Sign Up
      </p>
    </div>
  </div>
</template>
