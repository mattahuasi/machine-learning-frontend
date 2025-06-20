<script setup>
import { reactive, computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useProfileStore } from "@/stores/profile";
import Input from "@/components/inputs/Input.vue";
import Logo from "@/components/branding/Logo.vue";
import Submit from "@/components/buttons/ButtonSubmit.vue";

const profileStore = useProfileStore();
const errors = ref([]);
const alertOpen = ref();
const formData = reactive({
  email: "",
  password: "",
});
const rules = computed(() => ({
  email: {
    email: helpers.withMessage(
      "Por favor, ingresa un correo electrónico válido",
      email
    ),
    required: helpers.withMessage(
      "Por favor, ingresa tu correo electrónico",
      required
    ),
  },
  password: {
    required: helpers.withMessage("Por favor, ingresa tu contraseña", required),
    minLength: helpers.withMessage(
      "La contraseña debe tener al menos 6 caracteres",
      minLength(6)
    ),
  },
}));
const v$ = useVuelidate(rules, formData);

async function handleSubmit(event) {
  event.preventDefault();
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await profileStore.login(formData);
      location.reload();
    } catch (error) {
      errors.value = error.response.data.errors;
      notification();
    }
  }
}

function notification() {
  alertOpen.value = true;
  const timer = setTimeout(() => {
    alertOpen.value = false;
  }, 3000);
  return () => clearTimeout(timer);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <Logo :size="'w-10 h-10'" :text-style="'text-2xl text-gray-700'" />
      <div v-if="alertOpen">
        <div
          v-for="(item, index) in errors"
          :key="index"
          class="bg-red-500 p-2 text-white rounded-lg m-2 text-center"
        >
          {{ item }}
        </div>
      </div>
      <form class="mt-4" @submit="handleSubmit">
        <Input
          id="email"
          label-text="Correo electrónico"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
        />
        <Input
          id="password"
          label-text="Contraseña"
          v-model="v$.password.$model"
          :errors="v$.password.$errors"
          type="password"
        />

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="checkbox"
              />
              <span class="mx-2 text-sm text-gray-600">Recuérdame</span>
            </label>
          </div>
          <div>
            <router-link
              to="/"
              class="block text-sm text-indigo-700 font-medium hover:underline"
              >¿Olvidaste tu contraseña?</router-link
            >
          </div>
        </div>

        <div class="mt-6">
          <Submit>Iniciar sesión</Submit>
        </div>
      </form>
    </div>
  </div>
</template>
