<script setup>
const activeClass = 'underline hover:text-blue-500 cursor-pointer';
const disableClass = 'text-gray-300 cursor-default';

const props = defineProps({
   currentPage: { type: Number, required: true },
   totalPage: { type: Number, required: true },
   onPageChanged: { type: Function, required: true },
});

const goToPage = (page) => {
   props.onPageChanged(page);
};
</script>

<template>
   <ul class="flex justify-center items-center gap-4 py-8">
      <li>
         <button
            @click="goToPage(1)"
            :disabled="currentPage === 1"
            :class="currentPage === 1 ? disableClass : activeClass"
         >
            В начало
         </button>
      </li>
      <li v-if="currentPage > 1">...</li>
      <li v-if="currentPage > 1">
         <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            :class="currentPage === 1 ? disableClass : activeClass"
         >
            {{ currentPage - 1 }}
         </button>
      </li>

      <li>
         <button class="border rounded-md px-2">{{ currentPage }}</button>
      </li>

      <li v-if="currentPage < totalPage">
         <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPage"
            :class="currentPage === totalPage ? disableClass : activeClass"
         >
            {{ currentPage + 1 }}
         </button>
      </li>
      <li v-if="currentPage < totalPage">...</li>
      <li>
         <button
            @click="goToPage(totalPage)"
            :disabled="currentPage === totalPage"
            :class="currentPage === totalPage ? disableClass : activeClass"
         >
            В конец
         </button>
      </li>
   </ul>
</template>
