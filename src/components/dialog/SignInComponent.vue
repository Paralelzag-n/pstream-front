<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const emailIsEmpty = ref<boolean>(false);
const passwordIsEmpty = ref<boolean>(false);
const emailContainsAt = ref<boolean>(true);

const emailModel = ref<string>("");
const passwordModel = ref<string>("");
const router = useRouter();

const emailContentValidator = () => {
  if (emailModel.value.includes("@")) {
    emailContainsAt.value = true;
  } else {
    emailContainsAt.value = false;
  }
};

const emailInputValidator = () => {
  emailModel.value === ""
    ? (emailIsEmpty.value = true)
    : (emailIsEmpty.value = false);
};
const passwordInputValidator = () => {
  passwordModel.value === ""
    ? (passwordIsEmpty.value = true)
    : (passwordIsEmpty.value = false);
};

const validator = () => {
  emailContentValidator();
  emailInputValidator();
  passwordInputValidator();
};
</script>

<template>
  <div
    class="w-[400px] h-[373px] bg-semi-dark-blue rounded-2xl flex flex-col justify-between p-[32px]"
  >
    <h1 class="text-white text-3xl">Login</h1>
    <div
      class="flex border-x-0 border-t-0 border border-b-1 border-greyish-blue"
    >
      <input
        @input="emailInputValidator"
        v-model="emailModel"
        placeholder="Email address"
        type="url"
        name=""
        id=""
        class="my-input-class font-light text-white pb-2 px-2"
      />

      <p v-if="emailIsEmpty" class="text-red">Can't be empty</p>
      <p v-if="!emailContainsAt && !emailIsEmpty" class="text-red"></p>
    </div>
    <div
      class="flex border-x-0 border-t-0 border border-b-1 border-greyish-blue"
    >
      <input
        @input="passwordInputValidator"
        v-model="passwordModel"
        placeholder="Password"
        type="url"
        name=""
        id=""
        class="my-input-class font-light text-white pb-2 px-2"
      />
      <p v-if="passwordIsEmpty" class="text-red">Can't be empty</p>
    </div>
    <button
      @click="validator"
      class="outline-none text-white bg-purple py-4 text-sm rounded-md"
    >
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

<style scoped>
.my-input-class {
  outline: none;

  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
