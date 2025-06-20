<script setup>
const props = defineProps({
  marginTop: {
    type: String,
    required: false,
  },
  textStyle: {
    type: String,
  },
  size: {
    type: String,
  },
});
</script>

<template>
  <div class="flex items-center justify-center" :class="marginTop">
    <img :class="size" src="@/assets/logo.png" alt="logo, machine-learning" />
    <span class="font-semibold" :class="textStyle">Machine Learning</span>
  </div>
</template>
