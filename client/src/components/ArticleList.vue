<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons';
import { useArticlesStore } from '@/stores/articles';
import { onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDate } from '@/utils/dateFormater';

const articlesStore = useArticlesStore();
//const { articles } = articlesStore;

onBeforeMount(async () => {
   await articlesStore.fetchArticles();
   console.log(articlesStore.articles);
});
</script>

<template>
   <section class="my-8">
      <h2 class="sr-only">Последние статьи</h2>
      <p v-if="articlesStore.articles.length == 0" class="text-center">Нет постов</p>
      <ul v-else class="grid grid-cols-3 gap-8">
         <li v-for="item in articlesStore.articles" :key="item.id" class="flex">
            <article class="flex w-full bg-white rounded-md shadow hover:shadow-xl p-4">
               <RouterLink :to="'/post/' + item.id" class="flex w-full flex-col">
                  <div class="mb-4">
                     <img :src="item.imageUrl" class="w-full h-48 object-cover" alt="" />
                  </div>
                  <h3 class="text-xl mb-2">{{ item.title }}</h3>
                  <div class="mt-auto flex align-middle justify-between">
                     <p>
                        <time :datetime="item.publishedAt">
                           <FontAwesomeIcon :icon="faCalendar" />
                           {{ formatDate(item.publishedAt) }}
                        </time>
                     </p>
                     <p>
                        <FontAwesomeIcon :icon="faComment" />
                        {{ item.comments?.length }}
                        <span class="sr-only">количество комментариев</span>
                     </p>
                  </div>
               </RouterLink>
            </article>
         </li>
      </ul>
   </section>
</template>
