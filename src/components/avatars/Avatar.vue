<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
const dropdownOpen = ref(false);

async function logout() {
  await profileStore.logout();
  location.reload();
}
</script>

<template>
  <div class="relative">
    <button
      class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
      @click="dropdownOpen = !dropdownOpen"
    >
      <v-icon name="hi-solid-user" />
    </button>
    <div
      v-show="dropdownOpen"
      class="fixed inset-0 z-10 w-full h-full"
      @click="dropdownOpen = false"
    />
    <transition
      enter-active-class="transition duration-150 ease-out transform"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
      >
        <div class="px-4 py-2 text-sm md:hidden text-gray-700 border-b">
          Bienvenido:
          <span class="block text-xs font-semibold">{{
            profileStore.fullName
          }}</span>
        </div>
        <span class="px-4 py-2 text-sm text-gray-700 border-b hidden md:block"
          >Acciones</span
        >
        <router-link
          to="/update/profile"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >
          Mi información
        </router-link>
        <router-link
          to="/update/password"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
          >Actualizar contraseña</router-link
        >
        <span
          to="/"
          @click="logout"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white cursor-pointer"
        >
          Desconectarse
        </span>
      </div>
    </transition>
  </div>
</template>
