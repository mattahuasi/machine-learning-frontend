<script setup>
import { ref } from "vue";
import { VueFinalModal } from "vue-final-modal";

const show = ref(false);
const props = defineProps({
  title: {
    type: String,
    default: "Modal",
  },
});
const emit = defineEmits(["confirm", "close"]);
</script>

<template>
  <VueFinalModal
    v-model="show"
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white border  rounded-lg space-y-2 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
  >
    <div class="px-6 py-4 text-left modal-content">
      <div class="flex items-center justify-between pb-3">
        <h3 class="text-2xl font-bold">{{ title }}</h3>
        <div class="z-50 cursor-pointer modal-close" @click="emit('close')">
          <v-icon name="hi-solid-x" />
        </div>
      </div>
      <slot />
      <div class="flex justify-end pt-2">
        <button
          class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
          @click="emit('close')"
          data-modal-hide="defaultModal"
          type="button"
        >
          Cancelar
        </button>
        <button
          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
          @click="emit('confirm')"
          data-modal-hide="defaultModal"
          type="button"
        >
          Confirmar
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>
