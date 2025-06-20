<script setup>
import Header from "@/components/headers/Header.vue";
import Sidebar from "@/components/sidebars/Sidebar.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto p-4">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
