import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', () => {
   const articles = ref([]);
   const currentPage = ref(1);
   const totalPage = ref(1);
   const searchQuery = ref('');

   const fetchArticles = async (args) => {
      try {
         const { page, search } = args || {};
         if (page) {
            currentPage.value = page;
         }

         // если изменился запрос - запоминаем его и сбрасываем текущую страницу
         if (search) {
            searchQuery.value = search;
            currentPage.value = 1;
         }

         const response = await fetch(`/api/posts?search=${searchQuery.value}&limit=3&page=${currentPage.value}`);
         if (!response.ok) {
            throw new Error('Articles response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         articles.value = data.data.posts;
         totalPage.value = data.data.lastPage;
      } catch (e) {
         console.log(e);
      }
   };

   return { articles, currentPage, totalPage, fetchArticles };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot));
}
