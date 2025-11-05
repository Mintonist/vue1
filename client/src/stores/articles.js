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

         const response = await fetch(`/api/post?search=${searchQuery.value}&limit=9&page=${currentPage.value}`);
         if (!response.ok) {
            throw new Error('Articles response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) {
            articles.value = data.data.posts;
            totalPage.value = data.data.lastPage;
         }

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   const addArticle = async (item) => {
      try {
         const response = await fetch(`/api/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
         });
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) {
            articles.value.push(data.data);
         } else {
            throw new Error('Article response error: ' + data);
         }

         return 0;
      } catch (e) {
         console.log(e);
         throw e;
      }
   };

   return { articles, currentPage, totalPage, fetchArticles, addArticle };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot));
}
