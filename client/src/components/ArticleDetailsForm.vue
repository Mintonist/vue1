<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const props = defineProps({
   article: { type: Object, reqired: true },
});

const emit = defineEmits(['onUpdateArticale', 'onReturn']);

// нужно создать копию данных статьи, чтобы редактировать её а не исходные данные в хранилище
const editedArticle = ref({ ...props.article });

const onSubmit = () => {
   emit('onUpdateArticale', editedArticle.value);
};
</script>

<template>
   <form @submit.prevent="onSubmit" class="bg-white rounded-md shadow-md p-8 mb-8">
      <div class="flex justify-between items-center mb-4">
         <h1 class="text-3xl">Редактировать статью</h1>
         <div class="flex gap-4 text-xl">
            <button type="submit" class="cursor-pointer hover:text-blue-400" aria-label="Сохранить статью">
               <FontAwesomeIcon :icon="faFloppyDisk" />
            </button>
            <button
               @click="emit('onReturn')"
               class="cursor-pointer hover:text-red-400"
               type="button"
               aria-label="Вернуться"
            >
               <FontAwesomeIcon :icon="faArrowRotateLeft" />
            </button>
         </div>
      </div>
      <input
         v-model="editedArticle.title"
         class="w-full border rounded-md p-2 mb-4 border-gray-300"
         placeholder="Заголовок статьи"
      />
      <input
         v-model="editedArticle.imageUrl"
         class="w-full border rounded-md p-2 mb-4 border-gray-300"
         placeholder="URL картинки"
      />
      <textarea
         v-model="editedArticle.content"
         class="w-full border rounded-md p-2 border-gray-300 whitespace-pre-wrap"
         rows="10"
         placeholder="Контент"
      ></textarea>
   </form>
</template>

<style scoped></style>
