<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ref, watch } from 'vue';

const searchQuery = ref('');

const props = defineProps({
   onSearch: { type: Function, required: true },
});

let t = 0;

const onSubmit = () => {
   clearTimeout(t);
   if (searchQuery.value?.trim().length >= 0) props.onSearch(searchQuery.value.trim());
};

const debouncedSearch = (query) => {
   clearTimeout(t);
   t = setTimeout(() => {
      props.onSearch(query);
   }, 2000);
};

watch(searchQuery, (newQuery) => {
   debouncedSearch(newQuery);
});
</script>

<template>
   <form @submit.prevent="onSubmit" class="mt-10 relative">
      <input
         v-model="searchQuery"
         class="w-full bg-white border border-gray-300 p-2 pr-20 rounded-md"
         type="text"
         name="search"
         placeholder="Поиск по блогу"
      />
      <button
         type="submit"
         class="absolute right-0 top-0 bg-blue-500 hover:bg-blue-700 border border-blue-500 rounded-md py-2 px-5 cursor-pointer text-white"
      >
         <FontAwesomeIcon :icon="faMagnifyingGlass" />
      </button>
   </form>
</template>
