<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@/utils/dateFormater';
import { useUserStore } from '@/stores/user';
import { useArticleStore } from '@/stores/article';
import { useModalStore } from '@/stores/modal';

defineProps({
   data: { type: Array, reqired: true },
});

const userStore = useUserStore();
const articleStore = useArticleStore();
const modalStore = useModalStore();

const onDeleteComment = (id) => {
   if (id)
      modalStore.open('Удаить комменатрий?', () => {
         articleStore.removeComment(id);
      });
};
</script>

<template>
   <ul>
      <li v-for="item in data" :key="item.id" class="bg-white rounded-md shadow-md p-4 mb-4">
         <div class="flex justify-between mb-4">
            <p class="font-bold">
               <FontAwesomeIcon :icon="faUser" />
               &nbsp; {{ item.author }}
            </p>
            <button
               v-if="userStore.isAdmin | userStore.isModerator"
               @click="
                  () => {
                     onDeleteComment(item.id);
                  }
               "
               class="cursor-pointer text-red-500 hover:text-red-700"
               type="button"
               aria-label="Удалить кломментарий"
            >
               <FontAwesomeIcon :icon="faTrash" />
               Удалить
            </button>
         </div>
         <p class="text-gray-500 text-sm mb-2">
            <time :datetime="item.publishedAt">{{ formatDate(item.publishedAt) }}</time>
         </p>
         <div class="whitespace-pre-wrap mb-4">{{ item.content }}</div>
      </li>
   </ul>
</template>

<style scoped></style>
