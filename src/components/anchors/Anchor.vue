<script setup>
const props = defineProps({
  to: {
    type: String,
    default: "/",
  },
  icon: {
    type: String,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <router-link :to="to" v-slot="{ href, navigate, isActive }">
    <a
      :href="href"
      class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
      :class="[
        isActive
          ? 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
          : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
      ]"
    >
      <v-icon :name="icon" class="w-5 h-5" />
      <span class="flex-1 ml-3 whitespace-nowrap">{{ name }}</span>
    </a>
  </router-link>
</template>
