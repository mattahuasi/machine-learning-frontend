<script setup>
import { useProfileStore } from "@/stores/profile";
import { useSidebar } from "@/composables/useSidebar";
import Avatar from "@/components/avatars/Avatar.vue";
import Bell from "@/components/notifications/Bell.vue";

const useProfile = useProfileStore();
const { isOpen } = useSidebar();
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-gray-700 text-sm hidden md:block">
        Bienvenido: <span class="font-semibold">{{ useProfile.fullName }}</span>
      </div>
      <Bell />
      <Avatar />
    </div>
  </header>
</template>
