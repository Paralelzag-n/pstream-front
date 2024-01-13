<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  validateEmail,
  validateLength,
  validateExists,
  validateValuesMatch,
} from "../../utils/validators";
const router = useRouter();

const email = ref<string>("");
const emailError = ref<string>("");
const password = ref<string>("");
const passwordError = ref<string>("");
const repeatPassword = ref<string>("");
const repeatPasswordError = ref<string>("");

const checkPasswordsMatch = () => {
  if (validateExists(repeatPassword.value)) {
    repeatPasswordError.value = validateExists(repeatPassword.value);
    return;
  }

  repeatPasswordError.value = validateValuesMatch(
    repeatPassword.value,
    password.value,
    "Password"
  );
};

const checkPassword = () => {
  if (validateExists(password.value)) {
    passwordError.value = validateExists(password.value);
    return;
  }

  passwordError.value = validateLength(password.value);
};

const checkEmail = () => {
  if (validateExists(email.value)) {
    emailError.value = validateExists(email.value);
    return;
  }

  emailError.value = validateEmail(email.value);
};

const validateAll = () => {
  checkPassword();
  checkEmail();
  checkPasswordsMatch();

  if (passwordError.value || emailError.value || repeatPasswordError.value) {
    console.log("error");
  } else {
    console.log("passed");
  }
};
</script>

<template>
  <div
    class="w-[400px] h-[418px] bg-semi-dark-blue rounded-2xl flex flex-col justify-between p-[32px]"
  >
    <h1 class="text-white text-3xl">Sign Up</h1>
    <div
      class="flex border-x-0 border-t-0 border border-b-1 border-greyish-blue"
    >
      <input
        @input="checkEmail"
        v-model="email"
        placeholder="Email address"
        class="my-input-class font-light text-white pb-2 px-2"
      />
      <p v-if="emailError" class="text-red text-nowrap">{{ emailError }}</p>
    </div>
    <div
      class="flex border-x-0 border-t-0 border border-b-1 border-greyish-blue"
    >
      <input
        v-model="password"
        @input="checkPassword"
        placeholder="Password"
        class="my-input-class font-light text-white pb-2 px-2"
      />
      <p v-if="passwordError" class="text-red text-nowrap">
        {{ passwordError }}
      </p>
    </div>
    <div
      class="flex border-x-0 border-t-0 border border-b-1 border-greyish-blue"
    >
      <input
        @input="checkPasswordsMatch"
        v-model="repeatPassword"
        placeholder="Repeat password"
        class="my-input-class font-light text-white pb-2 px-2"
      />
      <p v-if="repeatPasswordError" class="text-red text-nowrap">
        {{ repeatPasswordError }}
      </p>
    </div>
    <button
      @click="validateAll"
      class="outline-none text-white bg-purple py-4 text-sm rounded-md"
    >
      Create an account
    </button>

    <div class="text-white flex items-center justify-center gap-2">
      <p>Already have an account?</p>
      <p
        @click="router.push({ name: 'sign-in' })"
        class="text-[#9747FC] cursor-pointer"
      >
        Login
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
