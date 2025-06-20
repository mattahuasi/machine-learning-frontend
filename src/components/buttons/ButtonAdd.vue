<script setup>
const props = defineProps({
  to: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <router-link
    :to="to"
    class="flex justify-center items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 overflow-hidden truncate"
    type="button"
  >
    <v-icon name="hi-solid-plus-circle" class="mr-1" />
    <slot> </slot>
  </router-link>
</template>
