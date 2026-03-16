<script setup lang="ts">
import { useRoute } from 'vue-router';
import ModalBase from './components/base/ModalBase.vue';
import LayoutFooter from './components/layouts/LayoutFooter.vue';
import LayoutHeader from './components/layouts/LayoutHeader.vue';
import { useUserStore } from './stores/user';
import { computed } from 'vue';
import NotAuth from './views/NotAuth.vue';

const route = useRoute();
const userStore = useUserStore();

const canAccess = computed(() => {
   if (route.meta?.requireAdmin) {
      return userStore.isAdmin;
   }

   return true;
});
</script>

<template>
   <div class="bg-gray-100 flex flex-col w-full min-h-screen">
      <header class="bg-white fixed top-0 left-0 right-0 z-10">
         <LayoutHeader></LayoutHeader>
      </header>
      <main class="flex-1 mt-26">
         <RouterView v-if="canAccess" />
         <NotAuth v-else />
      </main>
      <footer>
         <LayoutFooter></LayoutFooter>
      </footer>
      <ModalBase />
   </div>
</template>

<style scoped></style>
