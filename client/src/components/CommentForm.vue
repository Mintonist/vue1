<script setup>
import { useArticleStore } from '@/stores/article';
import { ref } from 'vue';

const articleStore = useArticleStore();
const comment = ref('');
const errorMsg = ref('');

const onSubmit = async () => {
   try {
      await articleStore.addComment(comment.value);
      comment.value = '';
   } catch (err) {
      console.log('error', err);
      errorMsg.value = err.message;
   }
};
</script>

<template>
   <form @submit.prevent="onSubmit" class="bg-white rounded-md shadow-md p-4 mb-4">
      <label class="block text-gray-800" for="newComment">Ваш комментарий</label>
      <textarea v-model="comment" class="border border-gray-300 w-full rounded-md p-2 mb-4" id="newComment"></textarea>
      <div class="flex justify-between">
         <p v-if="errorMsg?.length > 0" class="text-red-600">{{ errorMsg }}</p>
         <button
            class="cursor-pointer ml-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-md"
            type="submit"
         >
            Отправить
         </button>
      </div>
   </form>
</template>

<style scoped></style>
