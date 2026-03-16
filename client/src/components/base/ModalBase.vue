<script setup lang="ts">
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
</script>

<template>
   <div v-show="modalStore.isVisible" class="fixed left-0 right-0 top-0 bottom-0 z-100">
      <div class="fixed left-0 right-0 top-0 bottom-0 bg-black opacity-30"></div>
      <div class="relative max-w-sm mx-auto top-50 bg-white rounded-md p-8">
         <p class="text-center my-5">{{ modalStore.message }}</p>
         <div class="flex justify-end gap-4">
            <button
               @click="modalStore.confirm()"
               class="cursor-pointer py-2 px-3 bg-blue-400 rounded-md hover:bg-blue-500"
            >
               OK
            </button>
            <button
               @click="modalStore.close()"
               class="cursor-pointer py-2 px-3 bg-gray-400 rounded-md hover:bg-gray-500"
            >
               Отмена
            </button>
         </div>
      </div>
   </div>
</template>
