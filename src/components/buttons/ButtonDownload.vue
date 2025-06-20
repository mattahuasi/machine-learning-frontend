<script setup>
import { createPdf } from "@/utils/pdf";

function download() {
  createPdf();
}
</script>

<template>
  <button
    @click="download"
    class="flex justify-center items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 overflow-hidden truncate"
    type="button"
  >
    Descargar
    <v-icon name="hi-solid-document-download" class="ml-2" />
  </button>
</template>
