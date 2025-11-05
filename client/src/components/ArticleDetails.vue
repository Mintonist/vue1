<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/utils/dateFormater';
import { useUserStore } from '@/stores/user';

defineProps({
   article: { type: Object, reqired: true },
});

const emit = defineEmits(['onEditArticle', 'onRemoveArticale']);

const userStore = useUserStore();
</script>

<template>
   <div class="bg-white rounded-md shadow-md p-8 mb-8">
      <div class="mb-4">
         <img class="w-full h-64 object-cover rounded-md" :src="article.imageUrl" alt="" />
      </div>
      <p class="text-gray-600">
         <FontAwesomeIcon :icon="faCalendar" />
         &nbsp;
         <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
      </p>
      <div class="flex justify-between items-center mb-4">
         <h1 class="text-3xl">{{ article.title }}</h1>
         <div v-if="userStore.isAdmin" class="flex gap-4 text-xl">
            <button
               @click="emit('onEditArticle')"
               class="cursor-pointer hover:text-blue-400"
               type="button"
               aria-label="Редактировать статью"
            >
               <FontAwesomeIcon :icon="faPenToSquare" />
            </button>
            <button
               @click="emit('onRemoveArticale')"
               class="cursor-pointer hover:text-red-400"
               type="button"
               aria-label="Удалить статью"
            >
               <FontAwesomeIcon :icon="faTrash" />
            </button>
         </div>
      </div>
      <div class="whitespace-pre-wrap">{{ article.content }}</div>
   </div>
</template>

<style scoped></style>
