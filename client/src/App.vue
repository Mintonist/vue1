<script setup>
import LayoutFooter from './components/layouts/LayoutFooter.vue';
import LayoutHeader from './components/layouts/LayoutHeader.vue';
</script>

<template>
   <div class="bg-gray-100 flex flex-col w-full min-h-screen">
      <header class="bg-white fixed top-0 left-0 right-0 z-10">
         <LayoutHeader></LayoutHeader>
      </header>
      <main class="flex-1 mt-26">
         <router-view />
      </main>
      <footer>
         <LayoutFooter></LayoutFooter>
      </footer>
   </div>
</template>

<style scoped></style>
